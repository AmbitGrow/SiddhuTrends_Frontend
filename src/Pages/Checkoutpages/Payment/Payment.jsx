import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";

function Paymentpage() {
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const handlePayment = () => {
    clearCart();
    navigate("/confirmation");
  };

  return (
    <div>
      <h3>Select Payment Method</h3>

      <button onClick={handlePayment}>
        Pay Now
      </button>
    </div>
  );
}

export default Paymentpage;