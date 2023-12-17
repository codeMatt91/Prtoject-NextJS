## Next.js App Router Course - Starter

Piccola descrizione dello scaffolding:

/app: contiene tutti i percorsi, i componenti e la logica per la tua applicazione, è da qui che lavorerai principalmente.

    /app/lib: contiene funzioni utilizzate nell'applicazione, come funzioni di utilità riutilizzabili e funzioni di recupero dati.

    /app/ui: contiene tutti i componenti dell'interfaccia utente per l'applicazione, ad esempio schede, tabelle e moduli. Per risparmiare tempo, abbiamo
    pre-progettato questi componenti per te.

    /app/ui/fonts: qui vengono hostati tutti i caratteri usati nell'applicazione in modo da prevenire il layout shift dato dal caricamento dei fonts dal server.

/public: contiene tutte le risorse statiche per l'applicazione, ad esempio le immagini.

/scripts: contiene uno script di seeding che utilizziamo per popolare il DB

# DB e seeding

- Nel file .env andiamo a specificare i dati per connetterci al DB(Postgres) in questo caso con deployment gestito da Vercel
- Installiamo la libreria vercel/postgres(npm i @vercel/postgres) che ci permettera di gestire il DB lanciando degli script
- configuriamo nel file package.json un comando di script per eseguire il seeding "seed": "node -r dotenv/config ./scripts/seed.js" -> npm run seed, possiamo rendere dinamico il file??? TODO
- Inizialmente per effettuare il seeding del DB usiamo uno script(seed.js) che contiene le istruzioni di insert nel Db e prende i dati da un file locale 'placeholder-data.js'
- Per recuperare i dati dal server possiamo usare dei componenti specifici di React e sfruttabili da Next.js chiamati React Server Components, questi presentano 3 vantaggi principali:
  - I componenti server supportano le PROMISE, fornendo una soluzione più semplice per attività asincrone come il recupero dei dati. È possibile utilizzare la sintassi async/await senza ricorrere alle librerie useEffect o useStateal per recuperare dei dati.
  - I componenti server vengono eseguiti sul server, quindi puoi mantenere costosi recuperi di dati e logica sul server e inviare il risultato solo al client.
  - Poiché i componenti server vengono eseguiti sul server, è possibile eseguire query direttamente sul database senza un livello API aggiuntivo.

# Fetch dei dati

- Per poter effettuare richieste multiple in parallelo verso il server possiamo usare la funzione "Promise.all". In questo modo non dobbiamo aspettare che la prima richiesta sia conclusa per iniziare la successiva ma cominceranno tutte in parallelo e man mano che arriveranno i dati potremmo renderizzare i componenti, migliorando cosi le prestazioni

<!-- ************* CONCETTI BASE ************ -->

# ROUTING NIDIFICATO

    Next.js utilizza il routing del file system in cui le cartelle vengono utilizzate per creare percorsi nidificati. Ciascuna cartella rappresenta un segmento di percorso mappato a un segmento URL.

    esempio ---> my-site.com/dashboard/invoice

    Puoi creare interfacce utente separate per ogni percorso utilizzando file layout.tsx e page.tsx.
    page.tsx è un file Next.js speciale che esporta un componente React ed è necessario affinché il percorso sia accessibile. Nella tua applicazione hai già un file di paging: /app/page.tsx- questa è la home page associata al percorso "/".


    Per ogni pagina creata si deve creare una cartella al cui interno avremo sempre il file page.tsx ed un file layot.tsx. Quest'ultimo sarà l'interfaccia utente dove dentro verranno montati i componenti che si trovano sotto la cartella. Per esempio vediamo che nella cartella dashboard abbiamo il nostro layout.tsx e la page.tsx che fanno da entripoint per il percorso localhost:3000/dashboard e poi ogni cartella rappresenta un path di navigazione :

        - /dashboard/customers
        - /dashboard/invoices

    Per il routing possiamo usare il comonente <NavLink/> di React associato al componente <Link>, ed insieme avremo una navigazione lato Client senza render della pagina. Per esempio vedere il componente nav-links.tsx

    - Suddivisione e precaricamento automatici del codice
        Per migliorare l'esperienza di navigazione, il codice Next.js divide automaticamente la tua applicazione in segmenti di percorso. Questo è diverso da una React SPA tradizionale, dove il browser carica tutto il codice dell'applicazione al caricamento iniziale.

        Suddividere il codice per percorsi significa che le pagine vengono isolate. Se una determinata pagina genera un errore, il resto dell'applicazione continuerà a funzionare.

        Inoltre, in produzione, ogni volta che i componenti <Link> appaiono nel viewport del browser, Next.js precarica automaticamente il codice per il percorso collegato in background. Nel momento in cui l'utente fa clic sul collegamento, il codice per la pagina di destinazione sarà già caricato in background, e questo è ciò che rende la transizione della pagina quasi istantanea!

- Si possono suddividere le Rotte in Gruppi logici, ossia cartelle dove raggruppare dei componenti senza pero stravolgere il routing e senza influenzare la Url. Questo è possibile scrivendo il nome della cartella in cui inseriamo i componenti tra parentesi tonde (overview).
  Quindi /dashboard/(overview)/page.tsx diventa --> /dashboard

- Next.js ti consente di creare segmenti di percorso dinamici quando non conosci il nome esatto del segmento e desideri creare percorsi sulla base dei dati. Potrebbero essere titoli di post di blog, pagine di prodotti, ecc. Puoi creare segmenti di percorso dinamici racchiudendo il nome di una cartella tra parentesi quadre. Ad esempio, [id], [post] o [slug].

# RENDERING DINAMICO

- Con il rendering dinamico, il contenuto viene visualizzato sul server per ciascun utente al momento della richiesta (quando l'utente visita la pagina). Ci sono un paio di vantaggi del rendering dinamico:

  - Dati in tempo reale : il rendering dinamico consente alla tua applicazione di visualizzare dati in tempo reale o aggiornati frequentemente. Questo è l'ideale per le applicazioni in cui i dati cambiano spesso.
  - Contenuti specifici dell'utente : è più semplice fornire contenuti personalizzati, come dashboard o profili utente, e aggiornare i dati in base all'interazione dell'utente.
  - Richiedi informazioni sull'ora : il rendering dinamico consente di accedere a informazioni che possono essere conosciute solo al momento della richiesta, come i cookie o i parametri di ricerca dell'URL.

- Per impostazione predefinita, @vercel/postgresnon imposta la propria semantica di memorizzazione nella cache. Ciò consente al framework di impostare il proprio comportamento statico e dinamico.
  Puoi utilizzare un'API Next.js richiamata unstable_noStoreall'interno dei Componenti server o funzioni di recupero dei dati per disattivare il rendering statico.
  dobbiamo quindi importarla --> import { unstable_noStore as noStore } from 'next/cache'; ed usarla poi nei componenti --> noStore();

# STREAMING

- Per un Rendering Dinamico piu profesionale possiamo usare la tecnica chiamata STREAMING. Lo streaming è una tecnica di trasferimento dati che consente di suddividere una pagina in "pezzi" più piccoli e di trasmetterli progressivamente dal server al client non appena sono pronti.Tramite lo streaming, puoi evitare che richieste di dati lente blocchino l'intera pagina. Ciò consente all'utente di vedere e interagire con parti della pagina senza attendere il caricamento di tutti i dati prima che qualsiasi interfaccia utente possa essere mostrata all'utente.

Esistono due modi per implementare lo streaming in Next.js:

- A livello di pagina, con il file loading.tsx, questo è uno speciale file Next.js costruito su Suspense, che ti consente di creare un'interfaccia utente di fallback da mostrare in sostituzione durante il caricamento del contenuto della pagina.
- Per componenti specifici, con <Suspense>. Questo ti consente di rinviare il rendering di parti della tua applicazione fino a quando non vengono soddisfatte alcune condizioni (ad esempio, i dati vengono caricati). Puoi avvolgere i tuoi componenti dinamici in Suspense. Quindi, passagli un componente di fallback da mostrare durante il caricamento del componente dinamico.
  <Suspense fallback={<RevenueChartSkeleton />}>
  <RevenueChart />
  </Suspense>

# RENDERING PARZIALE(sperimentale, non ancora pronta per la produzione)

- In Next.js 14 è presente un'anteprima di un nuovo modello di rendering chiamato Partial Prerendering . Il prerendering parziale è una funzionalità sperimentale che ti consente di eseguire il rendering di un percorso con una shell di caricamento statica, mantenendo dinamiche alcune parti. In altre parole, puoi isolare le parti dinamiche di un percorso.
  Quando un utente visita un percorso:

- Viene servita una shell di percorso statica , questo rende veloce il caricamento iniziale.
- La shell lascia spazi in cui il contenuto dinamico verrà caricato in modo asincrono.
- Gli spazi asincroni vengono caricati in parallelo, riducendo il tempo di caricamento complessivo della pagina.
  Questo è diverso da come si comporta oggi la tua applicazione, dove interi percorsi sono completamente statici o dinamici.
  Il fallback è incorporato nel file statico iniziale insieme ad altro contenuto statico. In fase di creazione (o durante la riconvalida), le parti statiche del percorso vengono prerenderizzate e il resto viene posticipato finché l'utente non richiede il percorso.

Vale la pena notare che avvolgere un componente in Suspense non rende dinamico il componente stesso (ricorda che eri abituato unstable_noStorea ottenere questo comportamento), ma piuttosto Suspense viene utilizzato come confine tra le parti statiche e dinamiche del tuo percorso.

Il bello del prerendering parziale è che non è necessario modificare il codice per utilizzarlo. Finché utilizzi Suspense per avvolgere le parti dinamiche del tuo percorso, Next.js saprà quali parti del tuo percorso sono statiche e quali sono dinamiche.

# Ricerca, filtro e Paginazione

- Per implementare un filtro di ricerca lato server utilizzeremo degli hook di Nextjs che usano la query string per passare i parametri di ricerca al server.
  - useSearchParams- è un'API Web che fornisce metodi di utilità per manipolare i parametri di query dell'URL, consente di accedere ai parametri dell'URL corrente. Ad esempio, i parametri di ricerca per questo URL /dashboard/invoices?page=1&query=pendingsarebbero simili a questi: {page: '1', query: 'pending'}.
  - usePathname- Consente di leggere il percorso dell'URL corrente. Ad esempio, per il percorso /dashboard/invoices, usePathnamerestituirebbe '/dashboard/invoices'.
  - useRouter- Abilita la navigazione tra i percorsi all'interno dei componenti client a livello di codice. Esistono diversi metodi che puoi utilizzare.
- Fasi di implementazione di questo filtro:

  1. Cattura l'input dell'utente.
  2. Aggiorna l'URL con i parametri di ricerca.
  3. Mantieni l'URL sincronizzato con il campo di input.
  4. Aggiorna la tabella per riflettere la query di ricerca.

- NOTA BENE ->
  Quando usare il useSearchParams() Hook rispetto searchParams?
  Potresti aver notato che hai utilizzato due modi diversi per estrarre i parametri di ricerca. L'utilizzo dell'uno o dell'altro dipende dal fatto che si stia lavorando sul client o sul server.

  <Search>è un componente client, quindi hai utilizzato l' useSearchParams()hook per accedere ai parametri dal client.
  <Table>è un componente server che recupera i propri dati, quindi puoi passare la searchParamsprop dalla pagina al componente.
  Come regola generale, se vuoi leggere i parametri dal client, usa l' useSearchParams()hook in modo da evitare di dover tornare al server.

# React Server Action

- Le React Server Action ti consentono di eseguire codice asincrono direttamente sul server. Eliminano la necessità di creare endpoint API per modificare i tuoi dati. Queste funzioni asincrone vengono eseguite sul server e possono essere richiamate dai componenti client o server.

  La sicurezza è una priorità assoluta per le applicazioni web, poiché possono essere vulnerabili a varie minacce. È qui che entrano in gioco le azioni server. Offrono una soluzione di sicurezza efficace, proteggendo da diversi tipi di attacchi, proteggendo i tuoi dati e garantendo l'accesso autorizzato. Le azioni del server raggiungono questo obiettivo attraverso tecniche come richieste POST, chiusure crittografate, controlli rigorosi dell'input, hashing dei messaggi di errore e restrizioni dell'host, che lavorano tutti insieme per migliorare significativamente la sicurezza della tua app.

  Un vantaggio derivante dal richiamo di un'azione server all'interno di un componente server è il miglioramento progressivo: i moduli funzionano anche se JavaScript è disabilitato sul client.

  Le azioni server sono inoltre profondamente integrate con la memorizzazione nella cache di Next.js. Quando un modulo viene inviato tramite un'azione server, non solo puoi utilizzare l'azione per modificare i dati, ma puoi anche riconvalidare la cache associata utilizzando API come revalidatePath e revalidateTag.

  // Invoke the action using the "action" attribute
  return <form action={create}>...</form>;

  <NOTA BENE> : in HTML, passeresti un URL all'attributo action del form. Questo URL sarà la destinazione a cui inviare i dati del modulo (solitamente un endpoint API).
  Tuttavia, in React, l' attributo action è considerato un oggetto speciale, il che significa che React si basa su di esso per consentire l'invocazione delle azioni.
  Dietro le quinte, le azioni server creano un endpoint POST API. Questo è il motivo per cui non è necessario creare manualmente gli endpoint API quando si utilizzano Azioni server.
