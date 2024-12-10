import PropTypes from "prop-types";

const CartModal = ({ closeModal, cart, setCart }) => {
  const handleRemoveProduct = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (index, newQuantity) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = newQuantity;
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleBackgroundClick = (e) => {
    // Check if the click is on the background (the area outside the popup details)
    if (e.target.classList.contains("popup-container")) {
      closeModal();
    }
  };

  return (
    <div className="popup-container" onClick={handleBackgroundClick}>
      <div className="popup-details">
        {cart.length > 0 ? (
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                <p>{item.product.title}</p>
                <img
                  src={item.product.images}
                  style={{ height: "5rem", width: "5rem"}}            
                />
                <p>${(parseFloat(item.product.price) * item.quantity).toFixed(2)}</p>
                {/* dropdown menu */}
                <select 
                  className="quantity-dropdown"
                  value={item.quantity}
                  onChange={(e) => 
                    handleQuantityChange(index, parseInt(e.target.value, 10))
                  }
                >
                  {[...Array(10).keys()].map((n) => (
                    <option key={n + 1} value={n + 1}>
                      {n + 1}
                    </option>
                  ))}
                </select>
                <button onClick={() => handleRemoveProduct(index)}>
                  Remove Product
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty.</p>
        )}
        {/* close cart button */}
        <div className="close-button">
          <button onClick={closeModal}>Close Cart</button>
        </div>       
      </div>
    </div>
  );
};

CartModal.propTypes = {
  closeModal: PropTypes.func.isRequired, // closeModal should be a function
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      product: PropTypes.shape({
        title: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      }).isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  setCart: PropTypes.func.isRequired,
};

export default CartModal;
