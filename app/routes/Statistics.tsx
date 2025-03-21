import React, { useEffect, useState } from "react";
import { getStatistics } from "~/services/api";

const Statistics: React.FC<{ productId: number }> = ({ productId }) => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    getStatistics(productId).then(setStats);
  }, [productId]);

  if (!stats) return <p>Loading statistics...</p>;

  return (
    <div className="mt-4 p-4 border rounded-lg">
      <h2 className="text-xl font-bold">Thống kê</h2>
      <p>Tổng phản hồi: {stats.totalFeedbacks}</p>
      <p className="text-green-500">Tích cực: {stats.positiveFeedbacks}</p>
      <p className="text-red-500">Tiêu cực: {stats.negativeFeedbacks}</p>
    </div>
  );
};

export default Statistics;
