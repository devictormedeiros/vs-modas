import Card from "../Card";
import React, { useEffect, useState } from "react";
import "./style.scss";

interface IProps {
  title: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  stock: number;
}


const ItemListContainer = ({ title }: IProps) => {

  // criando uma const listProducts iniciando ela com valor de array vazio
  const [listProducts, setListProducts] = useState<Product[]>([]);

  // criando uma const products com valor de array de objetos simulando que veio de uma api
  const products: Product[] = [
    { 
      id: 1, 
      name: "Camiseta Estampada",
      value: 10.90,
      category: "Camisetas",
      image: 'img/camiseta-estampada.webp',
      stock: 5,
    },
    { 
      id: 2, 
      name: "Vestido Rosa",
      value: 59.90,
      category: "Vestidos",
      image: 'img/vestido-rosa.jpg',
      stock: 4,
    },
    { 
      id: 3, 
      name: "Salto alto preto",
      value: 32.90,
      category: "Sapatos",
      image: 'img/salto-preto.webp',
      stock: 3,
     },
     { 
      id: 4, 
      name: "Shorts Verão",
      value: 24.90,
      category: "Shorts",
      image: 'img/short.jpg',
      stock: 1,
     },
  ];

  // funcão chamada no displayProducts que é assincrona e retorna uma promessa que no resolve dela, traz uma lista de produtos.
  const fetchProducts = (): Promise<Product[]> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(products);
      }, 2000);
    });
  };


  // chamada no useEffect e ela é assincrona e roda uma promisse fetchProducts, ela tem await que é pra esperar ela ser resolvida para poder usar o setListProducts
  const displayProducts = async () => {
    try {
      const fetchedProducts = await fetchProducts();
      setListProducts(fetchedProducts);
    } catch (error) {
      console.error("Erro ao buscar os produtos:", error);
    }
  };

  // O useEffect com uma dependência vazia, é uma maneira comum de fazer uma chamada a uma função de forma semelhante à chamada direta de displayProducts().
  useEffect(() => {
    displayProducts();
  }, []);

  return (
    <section  >
      <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="text-center mb-4 text-uppercase section-title">{title}</h2>
            </div>
          </div>
        <div className="list-products">
            {listProducts.map((product) => (
              <Card key={product.id} product={product}/>
            ))}
        </div>
      </div>
    </section>
  );
};

export default ItemListContainer;
