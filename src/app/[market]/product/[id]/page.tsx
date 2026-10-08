import { MOCK_PRODUCTS, MarketCode, getPrice } from '@/data/mockData';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import AddToCartForm from '@/components/AddToCartForm';
import ProductCard from '@/components/ProductCard';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = MOCK_PRODUCTS.find((p) => p.id === params.id);
  if (!product) return { title: 'Product Not Found' };
  
  return {
    title: `${product.name} | Branda V2`,
    description: product.description,
    openGraph: {
      images: [product.image],
    },
  };
}

export function generateStaticParams() {
  return MOCK_PRODUCTS.map((p) => ({
    id: p.id,
  }));
}

export default function ProductDetailPage({
  params,
}: {
  params: { market: string; id: string };
}) {
  const market = params.market as MarketCode;
  const product = MOCK_PRODUCTS.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  const price = getPrice(product.startingPrice, market);
  const discountedPrice = product.discount
    ? getPrice(product.startingPrice * (1 - product.discount / 100), market)
    : null;

  return (
    <div className="max-w-6xl mx-auto space-y-16">
      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="mb-2 text-sm text-blue-600 font-bold uppercase tracking-wider">
            {product.category}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>
          
          <div className="flex items-end gap-3 mb-6">
            {discountedPrice ? (
              <>
                <span className="text-3xl font-bold text-gray-900">{discountedPrice}</span>
                <span className="text-lg text-gray-400 line-through mb-1">{price}</span>
                <span className="text-sm font-bold text-red-500 mb-1 ml-2">
                  {product.discount}% OFF
                </span>
              </>
            ) : (
              <span className="text-3xl font-bold text-gray-900">{price}</span>
            )}
          </div>

          <p className="text-gray-600 mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="bg-blue-50 text-blue-800 p-4 rounded-lg mb-8">
            <h3 className="font-bold mb-2">Turnaround Time</h3>
            <p className="text-sm">Estimated: {product.turnaroundEstimate}</p>
          </div>

          {/* Form */}
          <div className="flex-1">
            <AddToCartForm product={product} market={market} />
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100">
            <h3 className="font-bold text-lg mb-4">What's Included:</h3>
            <ul className="space-y-2">
              {product.included.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-gray-600">
                  <span className="text-green-500">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Related Services */}
      {relatedProducts.length > 0 && (
        <div className="pt-16 border-t border-gray-100">
          <h2 className="text-2xl font-bold mb-8">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} market={market} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
