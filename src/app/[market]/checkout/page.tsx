'use client';

import { useCart } from '@/store/useCart';
import { MarketCode, getPrice } from '@/data/mockData';
import { useState } from 'react';
import Link from 'next/link';

export default function CheckoutPage({ params }: { params: { market: string } }) {
  const market = params.market as MarketCode;
  const { items, clearCart } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);

  const subtotal = items.reduce((acc, item) => {
    const price = item.discount 
      ? item.startingPrice * (1 - item.discount / 100) 
      : item.startingPrice;
    return acc + price * item.quantity;
  }, 0);

  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock API call
    setTimeout(() => {
      clearCart();
      setIsSuccess(true);
    }, 1000);
  };

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto text-center py-24">
        <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
          ✓
        </div>
        <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
        <p className="text-gray-500 mb-8">Thank you for your order. We will send you an email confirmation shortly.</p>
        <Link 
          href={`/${market}`}
          className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-24">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link href={`/${market}`} className="text-blue-600 hover:underline">
          Go back to services
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-xl font-bold mb-6">Contact Information</h2>
          <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input required type="email" className="w-full border rounded-md px-3 py-2" placeholder="john@example.com" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input required type="text" className="w-full border rounded-md px-3 py-2" placeholder="John" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input required type="text" className="w-full border rounded-md px-3 py-2" placeholder="Doe" />
              </div>
            </div>
            
            <h2 className="text-xl font-bold mt-8 mb-6 pt-4 border-t">Payment (Mock)</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
              <input required type="text" className="w-full border rounded-md px-3 py-2" placeholder="0000 0000 0000 0000" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                <input required type="text" className="w-full border rounded-md px-3 py-2" placeholder="MM/YY" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                <input required type="text" className="w-full border rounded-md px-3 py-2" placeholder="123" />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition-colors mt-8"
            >
              Pay {getPrice(total, market)}
            </button>
          </form>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl border h-fit">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>
          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div key={item.cartId} className="flex justify-between items-start text-sm">
                <div>
                  <span className="font-medium">{item.name}</span>
                  <span className="text-gray-500 ml-2">x{item.quantity}</span>
                </div>
                <span className="font-medium">
                  {getPrice(
                    (item.discount ? item.startingPrice * (1 - item.discount / 100) : item.startingPrice) * item.quantity,
                    market
                  )}
                </span>
              </div>
            ))}
          </div>
          <div className="space-y-2 text-sm pt-4 border-t border-gray-200">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{getPrice(subtotal, market)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax (5%)</span>
              <span>{getPrice(tax, market)}</span>
            </div>
          </div>
          <div className="flex justify-between items-center font-bold text-lg pt-4 border-t border-gray-200 mt-4">
            <span>Total</span>
            <span>{getPrice(total, market)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
