import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchRevenue, fetchLatestInvoices, fetchCardData } from '../lib/data';
import { useEffect, useState } from 'react';
import { Revenue } from '../lib/definitions';

export default async function Page() {
  // API che recupera tutto lo storico delle revenue
  const revenueTot = await fetchRevenue();
  // API che recupera le ultime 5 fatture
  const latestInvoices = await fetchLatestInvoices();
  // API che recupera i valori delle fatture e dei customers
  const dataCard = await fetchCardData();
  const totalPaidInvoices = dataCard.totalPaidInvoices;

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        {/* <Card title="Pending" value={totalPendingInvoices} type="pending" /> */}
        {/* <Card title="Total Invoices" value={numberOfInvoices} type="invoices" /> */}
        {/* <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        /> */}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={revenueTot} />
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
}
