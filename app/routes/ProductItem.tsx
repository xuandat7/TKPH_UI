import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateProduct } from "~/services/api";
import { Eye, Pencil, Trash2, X } from "lucide-react";

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
    <div className="group relative bg-white rounded-2xl shadow-md overflow-hidden">
      {/* Product Card Header */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/product/${product.id}`)}
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          >
            <Eye className="w-4 h-4 text-black" />
          </button>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          >
            <Pencil className="w-4 h-4 text-black" />
          </button>
          <button
            onClick={handleDeleteProduct}
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </div>

      {/* Product Card Content */}
      <div className="p-2 ">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-black mb-2">{product.name}</h3>
          <p className="text-black text-sm line-clamp-2">{product.description}</p>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-black">${product.price}</span>
          <span className="text-sm text-black">USD</span>
        </div>

        {product.attributes && product.attributes.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {product.attributes.map((attr, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-gray-100 text-black text-xs rounded-full"
              >
                {attr}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-black">Edit Product</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-black" />
              </button>
            </div>

            <form onSubmit={handleUpdateProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Product Name
                </label>
                <input 
                  type="text"
                  value={editedProduct.name}
                  onChange={(e) => setEditedProduct({...editedProduct, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black">$</span>
                  <input
                    type="number"
                    value={editedProduct.price}
                    onChange={(e) => setEditedProduct({...editedProduct, price: Number(e.target.value)})}
                    className="text-black w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editedProduct.description}
                  onChange={(e) => setEditedProduct({...editedProduct, description: e.target.value})}
                  className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Attributes
                </label>
                <input
                  type="text"
                  placeholder="Separate with commas"
                  value={editedProduct.attributes?.join(', ')}
                  onChange={(e) => setEditedProduct({...editedProduct, attributes: e.target.value.split(',').map(attr => attr.trim())})}
                  className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-black hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Changes
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