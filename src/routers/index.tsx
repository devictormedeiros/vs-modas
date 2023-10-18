import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ProdutoPage from "../pages/Produto";
import Header from "../components/Header";
import CategoryPage from "../pages/Category";
import Footer from "../components/Footer";
import CartPage from "../pages/Cart";

const Routers = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products/:id" element={<ProdutoPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/cart/product/:productId/quantity/:quantity" element={<CartPage/>} />

        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
''
export default Routers;
