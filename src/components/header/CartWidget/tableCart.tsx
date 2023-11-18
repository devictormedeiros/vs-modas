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
    <>
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
          {listCart.map(
            (product) => (
              console.log(product),
              (
                <tr key={product.id}>
                  <td>
                    <div className="d-flex gap-3 align-items-center">
                      <figure>
                        <img src={product.images[0].src} alt="" />
                      </figure>
                      {product.name}
                    </div>
                  </td>
                  <td>{product.qtyCart}</td>
                  <td>R${product.price}</td>
                  <td>
                    {/* Botão para remover o produto atual do carrinho */}
                    <button
                      className="btn-clean-cart"
                      onClick={() => handleRemoveItem(product.id)}
                    >
                      x
                    </button>
                  </td>
                </tr>
              )
            )
          )}
        </tbody>
      </table>
      <table className="tale-cart-total">
        <thead>
          <tr>
            <th colSpan={2}>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>R${valorTotal}</td>
            <td>
              {/* Botão para remover todos os itens do carrinho */}
              <button className="btn" onClick={handleClear}>Limpar carrinho</button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default TableCart;
