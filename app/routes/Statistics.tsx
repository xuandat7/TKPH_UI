import React, { useEffect, useState } from "react";
import { getStatistics } from "~/services/api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Loader2 } from "lucide-react";

const Statistics: React.FC<{ productId: number }> = ({ productId }) => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    getStatistics(productId).then(setStats);
  }, [productId]);

  if (!stats) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 h-64 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  const chartData = [
    { name: 'Positive', value: stats.positiveFeedbacks, color: '#10B981' },
    { name: 'Negative', value: stats.negativeFeedbacks, color: '#EF4444' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Feedback Analysis</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="text-4xl font-bold text-gray-900">{stats.totalFeedbacks}</div>
          <div className="text-sm text-gray-600 mt-1">Total Feedbacks</div>
        </div>
        
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="text-4xl font-bold text-blue-600">
            {((stats.positiveFeedbacks / stats.totalFeedbacks) * 100).toFixed(1)}%
          </div>
          <div className="text-sm text-gray-600 mt-1">Satisfaction Rate</div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill={(entry) => entry.color} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Statistics;