## Next.js App Router Course - Starter

Piccola descrizione dello scaffolding:

/app: contiene tutti i percorsi, i componenti e la logica per la tua applicazione, è da qui che lavorerai principalmente.

    /app/lib: contiene funzioni utilizzate nell'applicazione, come funzioni di utilità riutilizzabili e funzioni di recupero dati.

    /app/ui: contiene tutti i componenti dell'interfaccia utente per l'applicazione, ad esempio schede, tabelle e moduli. Per risparmiare tempo, abbiamo
    pre-progettato questi componenti per te.

    /app/ui/fonts: qui vengono hostati tutti i caratteri usati nell'applicazione in modo da prevenire il layout shift dato dal caricamento dei fonts dal server.

/public: contiene tutte le risorse statiche per l'applicazione, ad esempio le immagini.

/scripts: contiene uno script di seeding che utilizziamo per popolare il DB

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
#   P r t o j e c t - N e x t J S  
 