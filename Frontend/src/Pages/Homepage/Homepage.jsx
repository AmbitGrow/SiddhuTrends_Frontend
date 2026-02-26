import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to Siddhu Trends</h1>
      <button onClick={() => navigate("/products")}>
        Shop Now
      </button>
    </div>
  );
}

export default Homepage;