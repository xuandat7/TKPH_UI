import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateProduct } from "~/services/api";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  attributes?: string[];
}

interface ProductItemProps {
  product: Product;
  onProductUpdated: () => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onProductUpdated }) => {
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState({ ...product, attributes: product.attributes ?? [] });

  const handleUpdateProduct = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    await updateProduct(editedProduct);
    setIsEditModalOpen(false);
    onProductUpdated();
  };

  const handleDeleteProduct = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await fetch(`http://localhost:3000/Products/${product.id}`, {
        method: "DELETE"
      });
      onProductUpdated();
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow">
      <h3 className="text-lg font-bold">{product.name}</h3>
      <p>{product.description}</p>
      <p className="mt-2">Price: ${product.price}</p>
      <div className="mt-4 flex gap-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          View Details
        </button>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          onClick={() => setIsEditModalOpen(true)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={handleDeleteProduct}
        >
          Delete
        </button>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Edit Product</h3>
            <form onSubmit={handleUpdateProduct}>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Product Name"
                  className="w-full border p-2 rounded"
                  value={editedProduct.name}
                  onChange={(e) => setEditedProduct({...editedProduct, name: e.target.value})}
                />
                <input
                  type="number"
                  placeholder="Price"
                  className="w-full border p-2 rounded"
                  value={editedProduct.price}
                  onChange={(e) => setEditedProduct({...editedProduct, price: Number(e.target.value)})}
                />
                <textarea
                  placeholder="Description"
                  className="w-full border p-2 rounded"
                  value={editedProduct.description}
                  onChange={(e) => setEditedProduct({...editedProduct, description: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Attributes (comma-separated)"
                  className="w-full border p-2 rounded"
                  value={editedProduct.attributes?.join(',')}
                  onChange={(e) => setEditedProduct({...editedProduct, attributes: e.target.value.split(',')})}
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


export default ProductItem;
