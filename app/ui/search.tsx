'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

/*
  ${pathname}è il percorso corrente, nel tuo caso, "/dashboard/invoices".
  Mentre l'utente digita nella barra di ricerca, params.toString()traduce questo input in un formato compatibile con gli URL.
  replace(${pathname}?${params.toString()})aggiorna l'URL con i dati di ricerca dell'utente. Ad esempio, /dashboard/invoices?query=leese l'utente cerca "Lee".
  L'URL viene aggiornato senza ricaricare la pagina, grazie alla navigazione lato client di Next.js 
 */

export default function Search({ placeholder }: { placeholder: string }) {
  // Funzione Nextjs per recuperare i parametri url
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
