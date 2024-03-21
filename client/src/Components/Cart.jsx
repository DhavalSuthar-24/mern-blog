import React from 'react';

const Cart = ({ cartItems, updateQuantity, removeFromCart }) => {
  // Calculate total amount
  const totalAmount = cartItems.reduce((total, item) => {
    return total + (item.price * (item.quantity || 0));
  }, 0);

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-3xl font-bold mb-4">Shopping Cart</h2>
      {cartItems.length === 0 && (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      )}
      {cartItems.map((item) => (
        <div key={item._id} className="flex items-center border-b py-4">
          <img src={item.image} alt={item.title} className="w-20 h-20 object-cover mr-4" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-gray-600">Price: ₹{item.price}</p>
            <div className="flex items-center mt-2">
              <button
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full mr-2 hover:bg-gray-300 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => updateQuantity(item._id, Math.max(1, (item.quantity || 1) - 1))}
              >
                -
              </button>
              <span className="px-3 py-1 border">{item.quantity || 0}</span>
              <button
                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full ml-2 hover:bg-gray-300 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => updateQuantity(item._id, (item.quantity || 0) + 1)}
              >
                +
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded-full ml-auto hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={() => removeFromCart(item._id)} // Call removeFromCart function
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
      {/* Display total amount */}
      <div className="mt-4 text-green-400 font-semibold text-xl flex justify-between">
        <div>
          <span className='text-black'>Total: </span> ₹{totalAmount.toFixed(2)}
        </div>
        <button className='bg-blue-500 p-2 border  rounded-full hover:bg-blue-600 text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'>
          Check-out
        </button>
      </div>
    </div>
  );
};

export default Cart;
