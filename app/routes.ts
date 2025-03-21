import { type RouteConfig, index } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"), // Trang chính
  {
    path: "product/:id",
    file: "routes/ProductDetail.tsx", // Trang chi tiết sản phẩm
  },
] satisfies RouteConfig;
