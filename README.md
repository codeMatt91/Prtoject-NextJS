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

# RENDERING DINAMICO

- Con il rendering dinamico, il contenuto viene visualizzato sul server per ciascun utente al momento della richiesta (quando l'utente visita la pagina). Ci sono un paio di vantaggi del rendering dinamico:

  - Dati in tempo reale : il rendering dinamico consente alla tua applicazione di visualizzare dati in tempo reale o aggiornati frequentemente. Questo è l'ideale per le applicazioni in cui i dati cambiano spesso.
  - Contenuti specifici dell'utente : è più semplice fornire contenuti personalizzati, come dashboard o profili utente, e aggiornare i dati in base all'interazione dell'utente.
  - Richiedi informazioni sull'ora : il rendering dinamico consente di accedere a informazioni che possono essere conosciute solo al momento della richiesta, come i cookie o i parametri di ricerca dell'URL.

- Per impostazione predefinita, @vercel/postgresnon imposta la propria semantica di memorizzazione nella cache. Ciò consente al framework di impostare il proprio comportamento statico e dinamico.
  Puoi utilizzare un'API Next.js richiamata unstable_noStoreall'interno dei Componenti server o funzioni di recupero dei dati per disattivare il rendering statico.
  dobbiamo quindi importarla --> import { unstable_noStore as noStore } from 'next/cache'; ed usarla poi nei componenti --> noStore();
