'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function SortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sort = searchParams.get('sort') || 'popularity';

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sp = new URLSearchParams(searchParams.toString());
    sp.set('sort', e.target.value);
    router.push(`${pathname}?${sp.toString()}`);
  };

  return (
    <select 
      className="text-sm border-gray-300 rounded-md py-1 pl-2 pr-8 focus:ring-blue-500 focus:border-blue-500"
      value={sort}
      onChange={handleChange}
    >
      <option value="popularity">Popularity</option>
      <option value="price_asc">Price: Low to High</option>
      <option value="price_desc">Price: High to Low</option>
    </select>
  );
}
