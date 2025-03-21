import React from "react";
import { useParams } from "react-router-dom";
import FeedbackList from "./FeedbackList";
import FeedbackForm from "./FeedbackForm";
import Statistics from "./Statistics";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id!, 10);

  if (!id || isNaN(productId)) {
    return <div>Không tìm thấy sản phẩm!</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Chi tiết sản phẩm #{productId}</h1>
      <Statistics productId={productId} />
      <FeedbackList productId={productId} />
      {/* <FeedbackForm productId={productId} /> */}
    </div>
  );
};

export default ProductDetail;
