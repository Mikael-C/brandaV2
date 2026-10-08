import Image from 'next/image';
import Link from 'next/link';
import { Product, MarketCode, getPrice } from '@/data/mockData';

export default function ProductCard({
  product,
  market,
}: {
  product: Product;
  market: MarketCode;
}) {
  const price = getPrice(product.startingPrice, market);
  const discountedPrice = product.discount
    ? getPrice(product.startingPrice * (1 - product.discount / 100), market)
    : null;

  return (
    <Link href={`/${market}/product/${product.id}`} className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      <div className="relative h-48 w-full bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {product.discount}% OFF
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="text-xs text-blue-600 font-semibold uppercase tracking-wider mb-1">
          {product.category}
        </div>
        <h3 className="font-bold text-gray-900 mb-2 truncate">{product.name}</h3>
        <div className="flex items-center gap-2">
          {discountedPrice ? (
            <>
              <span className="font-bold text-lg text-gray-900">{discountedPrice}</span>
              <span className="text-sm text-gray-400 line-through">{price}</span>
            </>
          ) : (
            <span className="font-bold text-lg text-gray-900">{price}</span>
          )}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
           <span className="text-sm text-gray-500">{product.turnaroundEstimate}</span>
           <span className="text-sm font-medium text-blue-600 group-hover:underline">View Details</span>
        </div>
      </div>
    </Link>
  );
}
