import React, { useState } from "react";
import ProductList from "~/routes/ProductList";
import { trainModel, predictComment } from "../services/api";
import ModelTrainer from "~/components/ModelTrainer";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Danh sách sản phẩm
          </h1>
          <ProductList />
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <ModelTrainer />
        </div>
      </div>
    </div>
  );
};

export default Home;