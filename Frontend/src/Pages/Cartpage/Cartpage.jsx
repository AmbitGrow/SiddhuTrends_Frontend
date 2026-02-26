import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function Cart() {
  const { cartItems, removeFromCart, totalPrice } = useCart();
  const navigate = useNavigate();

  return (
    <div>
      <h2>Your Cart</h2>

      {cartItems.map(item => (
        <div key={item.id}>
          <p>{item.name}</p>
          <p>₹{item.price}</p>
          <p>Qty: {item.quantity}</p>
          <button onClick={() => removeFromCart(item.id)}>
            Remove
          </button>
        </div>
      ))}

      <h3>Total: ₹{totalPrice}</h3>

      {cartItems.length > 0 && (
        <button onClick={() => navigate("/checkout/address")}>
          Proceed to Checkout
        </button>
      )}
    </div>
  );
}

export default Cart;