import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
  data: "string",
  total_sales: "number",
});

const SalesModel = mongoose.model("Consolidado", saleSchema);

export { SalesModel };
