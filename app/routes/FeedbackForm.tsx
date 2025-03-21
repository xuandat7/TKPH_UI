import React, { useState } from "react";
import { addFeedback } from "~/services/api";

const FeedbackForm: React.FC<{ productId: number }> = ({ productId }) => {
  const [content, setContent] = useState("");
  const [sentiment, setSentiment] = useState("positive");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addFeedback({ content, sentiment, productId });
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        className="w-full p-2 border rounded"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Nhập phản hồi..."
        required
      />
      <select className="w-full mt-2 p-2 border rounded" value={sentiment} onChange={(e) => setSentiment(e.target.value)}>
        <option value="positive">Tích cực</option>
        <option value="negative">Tiêu cực</option>
      </select>
      <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded" type="submit">
        Gửi phản hồi
      </button>
    </form>
  );
};

export default FeedbackForm;
