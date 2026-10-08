import { MOCK_PRODUCTS, MarketCode } from '@/data/mockData';
import ProductCard from '@/components/ProductCard';
import SortSelect from '@/components/SortSelect';
import Sidebar from '@/components/Sidebar';
import Link from 'next/link';

export default function ListingPage({
  params,
  searchParams,
}: {
  params: { market: string };
  searchParams: { category?: string; sort?: string; urgency?: string; q?: string };
}) {
  const market = params.market as MarketCode;
  const category = searchParams.category || 'All';
  const sort = searchParams.sort || 'popularity';
  const urgency = searchParams.urgency || 'All';
  const query = (searchParams.q || '').toLowerCase();

  let filteredProducts = MOCK_PRODUCTS.filter((p) => {
    if (category !== 'All' && p.category !== category) return false;
    if (urgency !== 'All' && p.urgency !== urgency) return false;
    if (query && !p.name.toLowerCase().includes(query)) return false;
    return true;
  });

  filteredProducts.sort((a, b) => {
    if (sort === 'price_asc') {
      const pA = a.discount ? a.startingPrice * (1 - a.discount / 100) : a.startingPrice;
      const pB = b.discount ? b.startingPrice * (1 - b.discount / 100) : b.startingPrice;
      return pA - pB;
    }
    if (sort === 'price_desc') {
      const pA = a.discount ? a.startingPrice * (1 - a.discount / 100) : a.startingPrice;
      const pB = b.discount ? b.startingPrice * (1 - b.discount / 100) : b.startingPrice;
      return pB - pA;
    }
    // Default popularity
    return b.popularity - a.popularity;
  });

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar Filters */}
      <Sidebar 
        market={market}
        category={category}
        sort={sort}
        urgency={urgency}
        query={query}
        searchParams={searchParams as Record<string, string>}
      />

      {/* Main Content */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Services</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <div className="relative">
              <SortSelect />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} market={market} />
          ))}
          {filteredProducts.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              No services found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
