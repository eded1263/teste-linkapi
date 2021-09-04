import mongoose from "mongoose";

const consolidadoSchema = new mongoose.Schema({
  data: "string",
  cliente: {
    nome: "string",
    celular: "string",
    email: "string",
  },
  itens: {
    item: {
      codigo: "number",
      qtde: "number",
      vlr_unit: "number",
    },
  },
});

const ConsolidadoModel = mongoose.model("Consolidado", consolidadoSchema);

export { ConsolidadoModel };
