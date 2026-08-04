import Footer from "./Components/Layout/Footer/Footer.jsx";
import Header from "./Components/Layout/Header/Header.jsx";
import AppRoutes from "./Routes/AppRoutes.jsx";
import { useAuth } from "./context/AuthContext";

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="app-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <div className="loading-spinner">Authenticating...</div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Header/>
      <AppRoutes />
      <Footer/>
    </div>
  );
}

export default App;