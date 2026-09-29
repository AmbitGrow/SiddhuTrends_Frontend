import { Outlet, useLocation } from "react-router-dom";
import StepProgress from "./StepProgress";
import "./Checkout.css";

function CheckoutPage() {
  const location = useLocation();

  const getStep = () => {
    if (location.pathname.includes("address")) return 1;
    if (location.pathname.includes("summary")) return 2;
    if (location.pathname.includes("payment")) return 3;
    if (location.pathname.includes("confirm")) return 4;
    return 1;
  };

  return (
    <div className="checkout-layout">
      <StepProgress step={getStep()} />
      <div className="checkout-content">
        <Outlet />
      </div>
    </div>
  );
}

export default CheckoutPage;