// Importando o hook do contexto do carrinho
import { useCart } from "../../../context/cartContext";

const TableCart = () => {
  // Usando o contexto do carrinho para obter o carrinho atual, o valor total e as funções de remoção
  const { listCart, valorTotal, removeItem, clearCart } = useCart();

  // Função para remover um item específico do carrinho
  const handleRemoveItem = (itemID: number) => {
    removeItem(itemID);
  };

  // Função para remover todos os itens do carrinho
  const handleClear = () => {
    clearCart();
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Produto</th>
          <th>Quantidade</th>
          <th>Preço</th>
          <th>Remover</th>
        </tr>
      </thead>
      <tbody>
        {/* Mapeando cada produto do carrinho para exibir na tabela */}
        {listCart.map((product) => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.qtyCart}</td>
            <td>R${product.price}</td>
            <td>
              {/* Botão para remover o produto atual do carrinho */}
              <button onClick={() => handleRemoveItem(product.id)}>
                Remover
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={2}>Total</td>
          <td>R${valorTotal}</td>
          <td>
            {/* Botão para remover todos os itens do carrinho */}
            <button onClick={handleClear}>Remover todos</button>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default TableCart;
