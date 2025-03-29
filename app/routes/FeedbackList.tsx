import React, { useEffect, useState } from "react";
import { getFeedbacks } from "~/services/api";
import { ThumbsUp, ThumbsDown, Loader2 } from "lucide-react";

const FeedbackList: React.FC<{ productId: number }> = ({ productId }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeedbacks(productId).then((data) => {
      setFeedbacks(data);
      setLoading(false);
    });
  }, [productId]);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 h-64 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Customer Feedbacks</h2>
      
      <div className="space-y-4">
        {feedbacks.map((feedback) => (
          <div 
            key={feedback.id} 
            className="p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${
                feedback.sentiment === "positive" ? "bg-green-100" : "bg-red-100"
              }`}>
                {feedback.sentiment === "positive" ? (
                  <ThumbsUp className="w-5 h-5 text-green-600" />
                ) : (
                  <ThumbsDown className="w-5 h-5 text-red-600" />
                )}
              </div>
              
              <div className="flex-1">
                <p className="text-gray-800">{feedback.comment}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className={`text-sm font-medium ${
                    feedback.sentiment === "positive" ? "text-green-600" : "text-red-600"
                  }`}>
                    {feedback.sentiment}
                  </span>
                  <span className="text-sm text-gray-500">
                    • {new Date(feedback.timestamp).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackList;