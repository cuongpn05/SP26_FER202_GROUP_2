import React, { useState } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/Dashboard/HomePage";

function App() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartCount={cartCount} />
      <div className="flex-1">
        <HomePage />
      </div>
      <Footer />
    </div>
  );
}

export default App;