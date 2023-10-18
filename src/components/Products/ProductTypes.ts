export interface ProductTypes {
  id: number | string;
  name: string;
  price: number | string;
  images: {src:string}[];
  stock_status: boolean | string;
  stock_quantity: number;
  short_description?: string;
  categories: { name: string }[];
}
