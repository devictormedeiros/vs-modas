interface OrderResponse {
    status: string;
    id: number;
    payment_method_title: string;
    line_items: Array<{
      id: number;
      name: string;
      quantity: number;
      image: {src:string} // Assumindo que existe uma URL de imagem
    }>;
    total: string;
    // ... outros campos que você espera na resposta ...
  }

    export default OrderResponse;