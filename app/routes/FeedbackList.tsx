import React, { useEffect, useState } from "react";
import { getFeedbacks } from "~/services/api";

const FeedbackList: React.FC<{ productId: number }> = ({ productId }) => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    getFeedbacks(productId).then(setFeedbacks);
  }, [productId]);

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold">Phản hồi</h2>
      {feedbacks.map((feedback) => (
        <div key={feedback.id} className="border p-2 my-2 rounded">
          <p>{feedback.comment}</p>
          <span className={feedback.sentiment === "positive" ? "text-green-500" : "text-red-500"}>
            {feedback.sentiment}
          </span>
        </div>
      ))}
    </div>
  );
};

export default FeedbackList;
