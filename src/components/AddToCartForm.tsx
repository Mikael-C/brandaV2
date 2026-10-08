'use client';

import { useState } from 'react';
import { Product, MarketCode, getPrice } from '@/data/mockData';
import { useCart } from '@/store/useCart';
import { useRouter } from 'next/navigation';

export default function AddToCartForm({
  product,
  market,
}: {
  product: Product;
  market: MarketCode;
}) {
  const router = useRouter();
  const addItem = useCart((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    product.options.forEach((opt) => {
      initial[opt.name] = opt.choices[0];
    });
    return initial;
  });

  const handleOptionChange = (name: string, value: string) => {
    setSelectedOptions((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddToCart = () => {
    addItem({
      ...product,
      cartId: `${product.id}-${Date.now()}`,
      quantity,
      selectedOptions,
    });
    alert('Added to cart!');
  };

  const handleOrderNow = () => {
    handleAddToCart();
    router.push(`/${market}/cart`);
  };

  const price = product.discount 
    ? product.startingPrice * (1 - product.discount / 100) 
    : product.startingPrice;
  const total = price * quantity;

  return (
    <div className="space-y-6">
      {/* Options */}
      {product.options.map((opt) => (
        <div key={opt.name}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {opt.name}
          </label>
          <select
            value={selectedOptions[opt.name]}
            onChange={(e) => handleOptionChange(opt.name, e.target.value)}
            className="w-full border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
          >
            {opt.choices.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      ))}

      {/* Quantity */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quantity
        </label>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-1 border rounded bg-gray-50 hover:bg-gray-100"
          >
            -
          </button>
          <span className="font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="px-3 py-1 border rounded bg-gray-50 hover:bg-gray-100"
          >
            +
          </button>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <span className="font-medium text-gray-900">Total:</span>
          <span className="text-2xl font-bold">{getPrice(total, market)}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handleAddToCart}
            className="w-full py-3 px-4 border border-blue-600 text-blue-600 rounded-md font-medium hover:bg-blue-50 transition-colors"
          >
            Add to Cart
          </button>
          <button
            onClick={handleOrderNow}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
}
