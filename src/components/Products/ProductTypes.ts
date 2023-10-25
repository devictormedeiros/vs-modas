export interface ProductTypes {
  id: number;
  name: string;
  price: number;
  images: {src:string}[];
  stock_status: boolean | string;
  stock_quantity: number;
  short_description?: string;
  categories: { name: string }[];
}

export interface ProductInCart extends ProductTypes {
  qtyCart: number;
}