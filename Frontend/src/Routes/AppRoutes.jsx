import { Routes, Route } from "react-router-dom";

import Homepage from "../Pages/Homepage/Homepage";
import ProductListpage from "../Pages/ProductListpage/ProductListpage";
import ProductDetail from "../Pages/Productpage/Productpage";
import Cart from "../Pages/Cartpage/Cartpage";
import CheckoutPage from "../Pages/Checkoutpages/Checkoutpage";
import NotFound from "../Pages/Notfound/Notfound";
import Addresspage from "../Pages/Checkoutpages/Address/Addresspage";
import Ordersummarypage from "../Pages/Checkoutpages/Ordersummary/Ordersummarypage";
import Confirmationpage from "../Pages/Checkoutpages/Confirmation/Confirmationpage";
import Paymentpage from "../Pages/Checkoutpages/Payment/Payment";
import Wishlist from "../Pages/Wishlist/Wishlist";
import Login from "../Pages/Login/Login";
import Profilepage from "../Pages/MyProfile/Profilepage";
import Orderpage from "../Pages/MyOrder/Orderpage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />

      <Route path="/products" element={<ProductDetail />} />
      <Route path="/products/:id" element={<ProductListpage />} />

      <Route path="/cart" element={<Cart />} />

      <Route path="/checkout" element={<CheckoutPage />}>
        <Route path="address" element={<Addresspage />} />
        <Route path="summary" element={<Ordersummarypage />} />
        <Route path="payment" element={<Paymentpage />} />
      </Route>

      <Route path="/confirmation" element={<Confirmationpage />} />

      <Route path="*" element={<NotFound />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profilepage />} />
      <Route path="/orders" element={<Orderpage />} />
    </Routes>
  );
}

export default AppRoutes;
