import { Outlet, useLocation } from "react-router-dom";

function CheckoutPage() {
  const location = useLocation();

  return (
    <div>
      <h2>Checkout Process</h2>

      <div>
        <span className={location.pathname.includes("address") ? "active" : ""}>
          Address →
        </span>
        <span className={location.pathname.includes("summary") ? "active" : ""}>
          Summary →
        </span>
        <span className={location.pathname.includes("payment") ? "active" : ""}>
          Payment
        </span>
      </div>

      <Outlet />
    </div>
  );
}

export default CheckoutPage;