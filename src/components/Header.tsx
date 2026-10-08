'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { MARKETS, MarketCode } from '@/data/mockData';
import { useCart } from '@/store/useCart';
import { ShoppingCart } from 'lucide-react';

export default function Header({ market }: { market: MarketCode }) {
  const router = useRouter();
  const pathname = usePathname();
  const cartItems = useCart((state) => state.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleMarketChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMarket = e.target.value;
    const newPath = pathname.replace(`/${market}`, `/${newMarket}`);
    router.push(newPath);
  };

  return (
    <header className="border-b sticky top-0 bg-white z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href={`/${market}`} className="text-2xl font-bold text-blue-600">
          Branda<span className="text-gray-800">V2</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <select 
            value={market} 
            onChange={handleMarketChange}
            className="border-gray-300 rounded-md text-sm py-1 pl-2 pr-6 focus:ring-blue-500 focus:border-blue-500"
          >
            {Object.entries(MARKETS).map(([code, config]) => (
              <option key={code} value={code}>
                {config.name} ({config.currency})
              </option>
            ))}
          </select>

          <Link href={`/${market}/cart`} className="relative flex items-center text-gray-700 hover:text-blue-600">
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
