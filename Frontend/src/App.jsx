
import Footer from "./Components/Layout/Footer/Footer";
import Header from "./Components/Layout/Header/Header";
import AppRoutes from "./Routes/AppRoutes.jsx";

function App() {
  return (
    <div className="app-container">
      <Header/>
      <AppRoutes />
      <Footer/>
    </div>
  );
}

export default App;