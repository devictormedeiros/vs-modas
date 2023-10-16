import { useParams } from "react-router-dom";
import SecListProducts from "../../components/Products/SecListProducts";

const CategoryPage = () => {
    const { category } = useParams<{category: string}>(); // Captura o id da URL
    console.log(category);
  return (
    <SecListProducts title="category" categorySlug={category}/>
  );
}

export default CategoryPage;