'use client';

import { useCart } from '@/store/useCart';
import { MarketCode, getPrice } from '@/data/mockData';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage({ params }: { params: { market: string } }) {
  const market = params.market as MarketCode;
  const { items, removeItem, updateQuantity } = useCart();

  const subtotal = items.reduce((acc, item) => {
    const price = item.discount 
      ? item.startingPrice * (1 - item.discount / 100) 
      : item.startingPrice;
    return acc + price * item.quantity;
  }, 0);

  const tax = subtotal * 0.05; // 5% mock tax
  const total = subtotal + tax;

  if (items.length === 0) {
    return (
      <div className="text-center py-24">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-gray-500 mb-8">Looks like you haven't added any services yet.</p>
        <Link 
          href={`/${market}`}
          className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700"
        >
          Browse Services
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={item.cartId} className="flex gap-4 p-4 border rounded-xl bg-white">
              <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{item.name}</h3>
                    <div className="text-sm text-gray-500 mt-1">
                      {Object.entries(item.selectedOptions).map(([k, v]) => (
                        <span key={k} className="mr-3">
                          {k}: {v}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button 
                    onClick={() => removeItem(item.cartId)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Remove
                  </button>
                </div>
                
                <div className="flex justify-between items-end mt-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center border rounded bg-gray-50 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="font-medium w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center border rounded bg-gray-50 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <div className="font-bold">
                    {getPrice(
                      (item.discount ? item.startingPrice * (1 - item.discount / 100) : item.startingPrice) * item.quantity,
                      market
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="md:col-span-1">
          <div className="bg-gray-50 rounded-xl p-6 border sticky top-24">
            <h2 className="font-bold text-lg mb-6">Order Summary</h2>
            
            <div className="space-y-4 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{getPrice(subtotal, market)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Tax (5%)</span>
                <span className="font-medium">{getPrice(tax, market)}</span>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-200 mb-8">
              <div className="flex justify-between items-center">
                <span className="font-bold">Total</span>
                <span className="text-xl font-bold">{getPrice(total, market)}</span>
              </div>
            </div>
            
            <Link 
              href={`/${market}/checkout`}
              className="block w-full text-center bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
