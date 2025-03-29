import { useState, useEffect } from "react";
import {
  trainModel,
  predictComment,
  getFeedbacks,
  getProducts,
} from "../services/api";
import { Loader2, RefreshCcw } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ModelTrainer() {
  const [model, setModel] = useState("phobert");
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [feedbackList, setFeedbackList] = useState<string[]>([]);
  const [productId, setProductId] = useState<number | null>(null);
  const [products, setProducts] = useState<{ id: number; name: string }[]>([]);

  // Lấy danh sách sản phẩm
  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  // Gán sản phẩm đầu tiên sau khi load
  useEffect(() => {
    if (products.length > 0 && productId === null) {
      setProductId(products[0].id);
    }
  }, [products]);

  // Lấy feedback theo sản phẩm
  useEffect(() => {
    if (productId !== null) {
      getFeedbacks(productId).then((data) => {
        const contents = (data || [])
          .map((f: any) => f?.comment)
          .filter((c: any) => typeof c === "string");
        setFeedbackList(contents);
        console.log("Feedbacks:", contents);
      });
    }
  }, [productId]);

  // Lấy feedback ngẫu nhiên khi danh sách feedback thay đổi
  useEffect(() => {
    if (feedbackList.length > 0) {
      const random =
        feedbackList[Math.floor(Math.random() * feedbackList.length)];
      setText(random);
    } else {
      setText("");
    }
  }, [feedbackList]);

  const handleTrain = async () => {
    setLogs([]);
    setChartData([]);
    setLoading(true);
    const logResult = await trainModel(model);
    setLogs(logResult);
    setLoading(false);

    const parsed = logResult
      .filter((line) => line.trim().match(/^\s*\d/))
      .map((line) => {
        const [label, precision, recall, f1] = line.trim().split(/\s+/);
        return {
          label,
          precision: parseFloat(precision),
          recall: parseFloat(recall),
          f1: parseFloat(f1),
        };
      });
    setChartData(parsed);
  };

  const handlePredict = async () => {
    const res = await predictComment(text, model);
    setResult(res);
  };

  const randomizeFeedback = () => {
    if (feedbackList.length > 0) {
      const random =
        feedbackList[Math.floor(Math.random() * feedbackList.length)];
      setText(random);
    }
  };

  // ✅ Tô màu kết quả dự đoán theo nhãn
  const getResultColor = (label: string) => {
    switch (label) {
      case "0":
        return "text-red-600 font-semibold";
      case "1":
        return "text-yellow-600 font-semibold";
      case "2":
        return "text-green-600 font-semibold";
      default:
        return "text-gray-700";
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Huấn luyện mô hình
        </h2>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-64">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Chọn mô hình
            </label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="text-black block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="phobert">PhoBERT</option>
              {/* <option value="other">Khác</option> */}
            </select>
          </div>

          <div className="w-full sm:w-64">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Chọn sản phẩm
            </label>
            <select
              value={productId ?? ""}
              onChange={(e) => setProductId(Number(e.target.value))}
              className="text-black block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleTrain}
              disabled={loading}
              className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                  Đang huấn luyện...
                </>
              ) : (
                "Huấn luyện mô hình"
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">
            Chọn feedback của sản phẩm hoặc nhập nội dung mới
          </label>
          <button
            onClick={randomizeFeedback}
            className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
          >
            <RefreshCcw className="h-4 w-4" /> Ngẫu nhiên feedback
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {feedbackList.map((fb, idx) =>
            typeof fb === "string" ? (
              <button
                key={idx}
                onClick={() => setText(fb)}
                className="text-black px-3 py-1 text-sm bg-gray-100 border border-gray-300 rounded hover:bg-gray-200"
              >
                {fb.slice(0, 40)}...
              </button>
            ) : null
          )}
        </div>

        <textarea
          rows={4}
          placeholder="Ví dụ: Sản phẩm rất tuyệt vời!"
          className="text-black block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 resize-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="flex items-center gap-4">
          <button
            onClick={handlePredict}
            disabled={!text.trim()}
            className="inline-flex justify-center px-6 py-2.5 border border-transparent rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Dự đoán
          </button>

          {result && (
            <div
              className={`text-sm bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 ${getResultColor(
                result
              )}`}
            >
              <span className="font-medium text-gray-700">Kết quả:</span>{" "}
              <span>{result}</span>
              <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                <div>
                  <span className="inline-block w-3 h-3 rounded-full bg-red-600 mr-1"></span>
                  0: Tiêu cực
                </div>
                <div>
                  <span className="inline-block w-3 h-3 rounded-full bg-yellow-500 mr-1"></span>
                  1: Bình thường
                </div>
                <div>
                  <span className="inline-block w-3 h-3 rounded-full bg-green-600 mr-1"></span>
                  2: Tích cực
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {chartData.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-900 mb-2">
            Đánh giá mô hình (Precision, Recall, F1)
          </h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} layout="vertical">
              <XAxis type="number" domain={[0, 1]} />
              <YAxis type="category" dataKey="label" width={30} />
              <Tooltip />
              <Bar dataKey="precision" fill="#3b82f6" name="Precision" />
              <Bar dataKey="recall" fill="#10b981" name="Recall" />
              <Bar dataKey="f1" fill="#f59e0b" name="F1-score" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {logs.length > 0 && (
        <div className="rounded-lg bg-gray-50 p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">
            Log chi tiết:
          </h4>
          <pre className="whitespace-pre-wrap text-sm text-gray-600 font-mono">
            {logs.join("\n")}
          </pre>
        </div>
      )}
    </div>
  );
}
