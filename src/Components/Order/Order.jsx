
import React from 'react';
import { useLocation ,Link} from 'react-router-dom';


export default function OrderConfirmation() {
  const location = useLocation();
  const { products } = location.state || { products: [] }; // Ensure products is an empty array if undefined

  // Default order details
  const orderNumber = "ORD-2024-28901";
  const orderDate = "January 31, 2024";
  const estimatedDelivery = "February 7, 2024";
  const trackingNumber = "1Z999AA1234567890";

  // Calculate subtotal, shipping, and total based on products
  const subtotal = products?.reduce((total, item) => {
    // Ensure price is defined and is a number
    const itemPrice = typeof item.priceD === 'number' ? item.priceD : 0; // Use the numeric value directly
    return total + itemPrice;
  }, 0).toFixed(2) || "0.00";

  const shipping = "₹9.99"; // Fixed shipping cost
  const total = (parseFloat(subtotal) + parseFloat(shipping.replace('₹', ''))).toFixed(2);

  // Shipping address (default or could be passed as props)
  const shippingAddress = {
    name: "John Doe",
    street: "123 Main St",
    city: "San Francisco",
    state: "CA",
    zip: "94105",
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <svg className="w-16 h-16 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Order Placed!</h1>
          <p className="mt-2 text-gray-600">
            Thank you for your order. We'll send you shipping confirmation when your order ships.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="p-6">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-semibold text-lg">Order #{orderNumber}</h2>
                  <p className="text-sm text-gray-500">Placed on {orderDate}</p>
                </div>
                <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">Track Order</button>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 bg-orange-50 p-3 rounded-lg">
                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16V6a1 1 0 00-1-1H4a1 a a a "
                  />
                </svg>
                <span>Estimated delivery: {estimatedDelivery}</span>
              </div>

              <hr className="border-t border-gray-200" />

              {/* Order Items */}
              <div className="space-y-4">
                {products?.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <img
                      src={item.imageD || "/placeholder.svg"}
                      alt={item.nameD}
                      className="h-20 w-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.nameD}</h3>
                      <p className="text-sm text-gray-500">Quantity: {item.selectedQuantityD}</p>
                      <p className="text-sm font-medium">₹{item.priceD.toFixed(2)}</p> {/* Display price with currency */}
                    </div>
                  </div>
                ))}
              </div>

              <hr className="border-t border-gray-200" />

              {/* Price Summary */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span>{shipping}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping and Tracking Info */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Shipping Address */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6">
              <h2 className="font-semibold">Shipping Address</h2>
              <div className="text-sm text-gray-600 space-y-1">
                <p>{shippingAddress.name}</p>
                <p>{shippingAddress.street}</p>
                <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}</p>
              </div>
            </div>
          </div>

          {/* Tracking Info */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6">
              <h2 className="font-semibold">Tracking Information</h2>
              <div className="text-sm text-gray-600 space-y-2">
                <p>Tracking Number:</p>
                <p className="font-mono bg-gray-100 p-2 rounded">{trackingNumber}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Shopping Button */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block min-w-[200px] px-[15px] py-[10px] border border-gray-[300] rounded-md hover:bg-gray-[50] text-sm font-medium"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
