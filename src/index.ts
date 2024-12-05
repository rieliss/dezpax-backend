import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { Product } from "./types";

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:3001",
  })
);

const productsFilePath = path.resolve(__dirname, "../products.json");
let products: Product[] = [];

try {
  const data = fs.readFileSync(productsFilePath, "utf-8");
  products = JSON.parse(data);
} catch (error) {
  console.error("Error reading or parsing products.json:", error);
}

// const products: Product[] = Array.from({ length: 20 }, (_, i) => ({
//   sku: `SKU${(i + 1).toString().padStart(3, "0")}`,
//   name: `Product ${i + 1}`,
//   image: `https://picsum.photos/400/400?random=${i + 1}`,
//   price: Number((Math.random() * (99.99 - 10) + 10).toFixed(2)),
//   details: `This is product ${
//     i + 1
//   } with detailed description. Features high-quality materials and modern design.`,
//   size: ["Small", "Medium", "Large"][Math.floor(Math.random() * 3)],
//   weight: Number((Math.random() * (2 - 0.1) + 0.1).toFixed(1)),
// }));

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
