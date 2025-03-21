import React from "react";
import ProductList from "./ProductList";

const Home: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Danh sách sản phẩm</h1>
      <ProductList />
    </div>
  );
};

export default Home;
