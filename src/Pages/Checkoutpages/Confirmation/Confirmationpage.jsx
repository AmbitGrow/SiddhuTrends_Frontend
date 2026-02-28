import { useNavigate } from "react-router-dom";

function Confirmationpage() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Order Confirmed 🎉</h2>
      <button onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
}

export default Confirmationpage;