import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";

function Ordersummarypage() {
  const navigate = useNavigate();
  const { cartItems, totalPrice } = useCart();

  return (
    <div>
      <h3>Order Summary</h3>

      {cartItems.map(item => (
        <p key={item.id}>
          {item.name} x {item.quantity}
        </p>
      ))}

      <h4>Total: ₹{totalPrice}</h4>

      <button onClick={() => navigate("/checkout/payment")}>
        Proceed to Payment
      </button>
    </div>
  );
}

export default Ordersummarypage;