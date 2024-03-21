import React, { useState } from 'react';

const CouponGenerator = () => {
  const [numCharacters, setNumCharacters] = useState(8); // Default number of characters
  const [textPattern, setTextPattern] = useState('');
  const [generatedCoupon, setGeneratedCoupon] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Event handler for changing the number of characters
  const handleNumCharactersChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 8) {
      setNumCharacters(value);
      setErrorMessage('');
    } else {
      setErrorMessage('Number of characters must be greater than 8.');
    }
  };

  // Event handler for changing the text pattern
  const handleTextPatternChange = (e) => {
    setTextPattern(e.target.value);
  };

  // Function to generate a random coupon based on the specified number of characters and text pattern
  const generateCoupon = () => {
    // Generate a random string of alphanumeric characters of the specified length
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let coupon = '';
    for (let i = 0; i < numCharacters; i++) {
      coupon += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    // Insert the text pattern at a random position in the coupon
    if (textPattern) {
      const randomPosition = Math.floor(Math.random() * coupon.length);
      coupon = coupon.slice(0, randomPosition) + textPattern + coupon.slice(randomPosition);
    }
    // Set the generated coupon
    setGeneratedCoupon(coupon);
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-4">
      <h2 className="text-3xl font-bold mb-4">Coupon Generator</h2>
      <div className="mb-4">
        <label htmlFor="numCharacters" className="block font-medium text-gray-700 mb-2">Number of Characters:</label>
        <input
  type="number"
  id="numCharacters"
  value={numCharacters}
  onChange={handleNumCharactersChange}
  min={9} // Set the minimum value to 9
  className="border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
/>

        {errorMessage && (
          <p className="text-red-500 mt-2">{errorMessage}</p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="textPattern" className="block font-medium text-gray-700 mb-2">Text Pattern:</label>
        <input
          type="text"
          id="textPattern"
          value={textPattern}
          onChange={handleTextPatternChange}
          placeholder="Enter text pattern (optional)"
          className="border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <button onClick={generateCoupon} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Generate Coupon</button>
      {generatedCoupon && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Generated Coupon:</h3>
          <p className="text-gray-700">{generatedCoupon}</p>
        </div>
      )}
    </div>
  );
};

export default CouponGenerator;
