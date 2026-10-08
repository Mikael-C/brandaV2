import { MARKETS, MarketCode } from '@/data/mockData';
import Header from '@/components/Header';
import { redirect } from 'next/navigation';

export function generateStaticParams() {
  return Object.keys(MARKETS).map((market) => ({
    market,
  }));
}

export default function MarketLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { market: string };
}) {
  const market = params.market as MarketCode;
  
  if (!MARKETS[market]) {
    redirect('/ng');
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header market={market} />
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-white border-t py-8 mt-12 text-center text-gray-500">
        © 2024 Branda V2 Ecosystem. All rights reserved.
      </footer>
    </div>
  );
}
