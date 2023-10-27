import { createContext, useContext, useEffect, useState } from "react";
import { ProductInCart } from "../components/Products/ProductTypes";


// Definindo a interface de contexto para o carrinho
interface ICart {
  addItem: (product: ProductInCart) => string;
  listCart: ProductInCart[];
  valorTotal: number;
  qtyProduct?: number | undefined;
  removeItem: (itemId: number) => void;
  clearCart: () => void;
  isInCart: (id: number) => boolean;
  clearError: () => void; 
}

// Criando o contexto com valores padrões
export const CartContext = createContext<ICart>({
  addItem: () => "",
  listCart: [],
  valorTotal: 0,
  qtyProduct: 0,
  removeItem: () => {},
  clearCart: () => {},
  isInCart: () => false,
  clearError: () => {}
});

// Definindo a interface para as propriedades do provedor de contexto
interface ICartProvider {
  children: React.ReactNode;
}

const CartProvider = ({ children }: ICartProvider) => {
  // Estados para armazenar os produtos no carrinho e o valor total do carrinho
  const [listCart, setListCart] = useState<ProductInCart[]>([]);
  const [valorTotal, setValorTotal] = useState<number>(0);
  const [qtyProduct, setQtyTotal] = useState<number>(0);

  // Função para calcular o valor total dos produtos no carrinho
  const CalcValorTotal = (listCart: ProductInCart[]) => {
    return listCart.reduce((sumTotal, productItem) => {
      return sumTotal + productItem.price * productItem.qtyCart;
    }, 0);
  };

  // Função para adicionar item ao carrinho
  const addItem = (product: ProductInCart): string => {
    const existingProductIndex = listCart.findIndex((p) => p.id === product.id);
    const updatedList = [...listCart];
  
    // Verifica se o produto já existe no carrinho
    if (existingProductIndex !== -1) {
      // Verifica se a quantidade desejada excede o estoque disponível
      if (updatedList[existingProductIndex].qtyCart + product.qtyCart > product.stock_quantity) {
        setError("Não há estoque suficiente para adicionar essa quantidade ao carrinho.");
        return "Não há estoque suficiente para adicionar essa quantidade ao carrinho.";
      } else {
        // Adiciona a quantidade desejada ao produto existente no carrinho
        updatedList[existingProductIndex].qtyCart += product.qtyCart;
        setListCart(updatedList);
        return "success";
      }
    } else {
      // Para novos produtos, verifica se a quantidade desejada excede o estoque
      if (product.qtyCart > product.stock_quantity) {
        setError("Não há estoque suficiente para adicionar essa quantidade ao carrinho.");
        return "Não há estoque suficiente para adicionar essa quantidade ao carrinho.";
      } else {
        // Adiciona o novo produto ao carrinho
        setListCart((prevList) => [...prevList, product]);
        return "success";
      }
    }
  };

  // Função para remover item do carrinho
  const removeItem = (itemId: number) => {
    const updatedList = listCart.filter((product) => product.id !== itemId);
    setListCart(updatedList);
  };

  // Função para limpar o carrinho
  const clearCart = () => {
    setListCart([]);
  };

  // Função para verificar se um item específico está no carrinho
  const isInCart = (id: number) => {
    return listCart.some((product) => product.id === id);
  };

  // Estado para armazenar possíveis erros
  const [error, setError] = useState<string | null>(null);

  // Método para limpar o erro
  const clearError = () => setError(null);

  // Efeito para recalcular o valor total do carrinho sempre que a lista de produtos for atualizada
  useEffect(() => {
    const total = CalcValorTotal(listCart);
    setValorTotal(total);
    // Calcula a quantidade total de produtos no carrinho
    const totalQty = listCart.reduce((sum, product) => sum + product.qtyCart, 0);
    setQtyTotal(totalQty);
  }, [listCart]);

  // Renderizando o provedor de contexto para ser usado nos componentes filhos
  return (
    <CartContext.Provider
      value={{
        addItem,
        removeItem,
        clearCart,
        isInCart,
        listCart,
        valorTotal,
        clearError,
        qtyProduct

      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar o contexto do carrinho de maneira mais fácil
const useCart = () => useContext(CartContext);

export { CartProvider, useCart };