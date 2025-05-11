// App.js
import { HashRouter as Router, Routes, Route } from "react-router-dom";
 import { AppProvider } from "./AppContext";
import Dashboard from "./pages/Dashboard";
import ProductIdeas from "./pages/ProductIdeas";
import InProcess from "./pages/InProcess";
import AmazonListing from "./pages/AmazonListing";
import AmazonStatus from "./pages/AmazonStatus";

function App() {
  return (
     <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/product-ideas" element={<ProductIdeas />} />
          <Route path="/in-process" element={<InProcess />} />
          <Route path="/amazon-listing" element={<AmazonListing />} />
          <Route path="/amazon-status" element={<AmazonStatus />} />
        </Routes>
      </Router>
     </AppProvider>
  );
}

export default App;