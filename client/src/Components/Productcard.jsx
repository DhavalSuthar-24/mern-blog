const ProductCard = ({ product,addToCart }) => {
   const handleAddToCart=()=>{
    addToCart(product)
   }
    return (
      <div className="max-w-xs mx-auto">
        <div className="mt-4 relative overflow-hidden bg-white rounded-lg shadow-lg" style={{ width: "250px", height: "350px" }}>
          <div className="aspect-w-3 aspect-h-4">
            <img src={product.image} alt="Product Image" className="object-contain w-full h-full" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-gray-700 font-medium">₹ {product.price}</p>
            <button onClick={handleAddToCart} className="mt-2 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">Add to Cart</button>
          </div>
        </div>
      </div>
    );
  }
  
  export default ProductCard;
  