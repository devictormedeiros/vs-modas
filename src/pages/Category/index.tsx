import { useParams } from "react-router-dom";
import SecListProducts from "../../components/Products/SecListProducts";
import { get } from "../../services/api.service";
import { useEffect, useState } from "react";

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>(); // Captura o id da URL
  // Função para obter o ID da categoria usando o slug
  const [categoryName, setCategoryName] = useState<string>("");
  useEffect(() => {
    async function getCategoryIDBySlug(slug : string | undefined) {
      const response = await get(`products/categories?slug=${slug}`);
      if (response.data && response.data.length > 0) {
        setCategoryName(response.data[0].name);
      }
      return null;
    }
    getCategoryIDBySlug(category);
  }, [category]);
  return (
    <SecListProducts
      title={category ? categoryName : ""}
      categorySlug={category}
    />
  );
};

export default CategoryPage;
