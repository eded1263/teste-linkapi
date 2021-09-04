import axios from "axios";

class BlingConnection {
  baseUrl = "https://bling.com.br/Api/v2/";
  apiKey = process.env.BLING_KEY;
}

export const blingConnection = new BlingConnection();