/** 
 * In questo file creeremo tutte le Action lato server che verrano poi chimate o da altri componenti Server o Client 
 * 
 * Puoi anche scrivere Azioni server direttamente all'interno dei Componenti server 
 * aggiungendo "use server" all'interno dell'azione. Ma per questo corso li terremo tutti organizzati in un file separato.
*/
'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { InvoiceForm } from './definitions';

// Usiamo la libreria Zod per convalidare i dati che ci arrivano dal form prima di inviarli al server, 
// per essere sicuri che siano del tipo corretto. Istanziamo la tipologia di ogetto da controllare 
const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['pending', 'paid']),
    date: z.string(),
});
   
const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });
 
export async function createInvoice(formData: FormData) {
    // La funzione get() serve a recuperare un valore da un oggetto passandogli la chiave per estrarlo. 
    //Si puo usare anche getAll() per prendere tutte le occorrenze di quella chiave
    const { customerId, amount, status } = CreateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    const amountInCents = amount * 100;
    /*.split('T'): Suddivide la stringa utilizzando il carattere 'T' come separatore. 
    Il formato ISO 8601 separa la data dall'orario con la lettera 'T', 
    quindi questa operazione di split restituisce un array con due elementi: la data e l'orario.*/
    const date = new Date().toISOString().split('T')[0];

    await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;

  /*Next.js ha una cache del router lato client che memorizza i segmenti di percorso nel browser dell'utente per un certo periodo. 
  Insieme al precaricamento, questa cache garantisce che gli utenti possano navigare rapidamente 
  tra i percorsi riducendo al contempo il numero di richieste effettuate al server.
  Poiché stai aggiornando i dati visualizzati nel percorso delle fatture, desideri svuotare questa cache e attivare una nuova richiesta al server. 
  Puoi farlo con la funzione revalidatePath di Next.js:*/
  revalidatePath('/dashboard/invoices');

  // Funzione per reindirizzare l'utente alla pagina indicata una volta inviato il modulo al server
  redirect('/dashboard/invoices');
}

export async function updateInvoice(id: string, formData: FormData){

    /*
    - Estrazione dei dati da formData.
    - Convalidare i tipi con Zod.
    - Conversione dell'importo in centesimi.
    - Passando le variabili alla tua query SQL.
    - Chiamata revalidatePath per svuotare la cache del client ed effettuare una nuova richiesta al server.
    - Chiamata redirect per reindirizzare l'utente alla pagina della fattura.
    */


  let updatedInvoice = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  })

  updatedInvoice.amount = updatedInvoice.amount * 100;

  await sql`UPDATE invoices
  SET customer_id = ${updatedInvoice.customerId}, status = ${updatedInvoice.status}, amount = ${updatedInvoice.amount}
  WHERE id = ${id}`;

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
}