import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ProdutoPage from "../pages/Produto";
import Header from "../components/Header";
import CategoryPage from "../pages/Category";
import Footer from "../components/Footer";

const Routers = () => {
  return (
    <BrowserRouter>
      <Header logoCompany={logotipo} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products/:id" element={<ProdutoPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
''
export default Routers;
