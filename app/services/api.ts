const API_URL = "http://localhost:3000";

export const getProducts = async () => {
  const res = await fetch(`${API_URL}/Products`);
  console.log(res);
  return res.json();
};

export const addProduct = async (product: { name: string; price: number; description: string; attributes: string[] }) => {
  await fetch(`${API_URL}/Products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
};


export const updateProduct = async (product: { id: number; name: string; price: number; description: string; attributes: string[] }) => {
  await fetch(`${API_URL}/Products/${product.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
};

export const getFeedbacks = async (productId: number) => {
  const res = await fetch(`${API_URL}/feedback/product/${productId}`);
  console.log(res);
  return res.json();
};

export const addFeedback = async (feedback: { content: string; sentiment: string; productId: number }) => {
  await fetch(`${API_URL}/feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(feedback),
  });
};

export const getStatistics = async (productId: number) => {
  const res = await fetch(`${API_URL}/statistics/product/${productId}`);
  return res.json();
};

export const trainModel = async (model: string): Promise<string[]> => {
  const res = await fetch(`${API_URL}/ml/train`);
  return res.json().then((data) => data.logs);
};

export const predictComment = async (text: string, model: string): Promise<string> => {
  const res = await fetch(`${API_URL}/ml/predict?text=${encodeURIComponent(text)}`);
  return res.json().then((data) => data.result);
};



