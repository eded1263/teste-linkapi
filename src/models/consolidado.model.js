import mongoose from "mongoose";

const consolidadoSchema = new mongoose.Schema({
  data: "string",
  total_vendas: "number",
});

const ConsolidadoModel = mongoose.model("Consolidado", consolidadoSchema);

export { ConsolidadoModel };
