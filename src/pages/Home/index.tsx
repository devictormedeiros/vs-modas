import SecListProducts from "../../components/Products/SecListProducts";
import {useState } from "react";

const Home = () => {

  return (
    <main className="py-5 main-home">
      <SecListProducts title="Lançamentos" />
    </main>
  );
};

export default Home;
