'use client';

import { useState } from 'react';
import Link from 'next/link';

interface SidebarProps {
  market: string;
  category: string;
  sort: string;
  urgency: string;
  query: string;
  searchParams: Record<string, string>;
}

export default function Sidebar({ market, category, sort, urgency, query, searchParams }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const categories = ['All', 'Digital', 'Gifts', 'Create', 'Studio', 'Prints'];
  const urgencies = ['All', 'Standard', 'Rush'];

  const buildUrl = (key: string, value: string) => {
    const sp = new URLSearchParams(searchParams);
    sp.set(key, value);
    if (value === 'All') sp.delete(key);
    return `/${market}?${sp.toString()}`;
  };

  return (
    <aside className="w-full md:w-64 flex-shrink-0">
      {/* Mobile Hamburger Toggle */}
      <div className="md:hidden flex items-center justify-between mb-4">
        <span className="font-bold text-lg">Filters</span>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 border rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Toggle Filters"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Filter Content */}
      <div className={`space-y-8 ${isOpen ? 'block' : 'hidden'} md:block`}>
        <div>
          <h2 className="font-bold text-lg mb-4">Search</h2>
          <form action={`/${market}`} method="GET">
            {category !== 'All' && <input type="hidden" name="category" value={category} />}
            {sort !== 'popularity' && <input type="hidden" name="sort" value={sort} />}
            {urgency !== 'All' && <input type="hidden" name="urgency" value={urgency} />}
            <input 
              type="text" 
              name="q" 
              defaultValue={query} 
              placeholder="Search services..." 
              className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="hidden">Search</button>
          </form>
        </div>

        <div>
          <h2 className="font-bold text-lg mb-4">Categories</h2>
          <ul className="space-y-2">
            {categories.map((c) => (
              <li key={c}>
                <Link 
                  href={buildUrl('category', c)}
                  className={`text-sm ${category === c ? 'text-blue-600 font-bold' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-bold text-lg mb-4">Urgency</h2>
          <ul className="space-y-2">
            {urgencies.map((u) => (
              <li key={u}>
                <Link 
                  href={buildUrl('urgency', u)}
                  className={`text-sm ${urgency === u ? 'text-blue-600 font-bold' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  {u}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
