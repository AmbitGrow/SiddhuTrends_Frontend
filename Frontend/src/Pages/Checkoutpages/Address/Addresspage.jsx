import { useNavigate } from "react-router-dom";

function Addresspage() {
  const navigate = useNavigate();

  return (
    <div>
      <h3>Enter Address</h3>
      <input placeholder="Full Address" />
      <br />
      <button onClick={() => navigate("/checkout/summary")}>
        Continue
      </button>
    </div>
  );
}

export default Addresspage;