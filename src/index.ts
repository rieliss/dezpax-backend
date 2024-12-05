import express from "express";
import cors from "cors";
import { Product } from "./types";

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:3001",
  })
);

const products: Product[] = [
  {
    sku: "SKU001",
    name: "Product 1",
    image: "https://example.com/product1.jpg",
    price: 19.99,
    details: "This is product 1",
    size: "Medium",
    weight: 0.5,
  },
  {
    sku: "SKU002",
    name: "Product 2",
    image: "https://example.com/product2.jpg",
    price: 14.99,
    details: "This is product 2",
    size: "Medium",
    weight: 0.5,
  },
];

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:sku", (req, res) => {
  const product = products.find((p) => p.sku === req.params.sku);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
