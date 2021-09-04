import axios from "axios";
import json2xml from "json2xml";

class BlingConnection {
  baseUrl = "https://bling.com.br/Api/v2";
  apiKey = process.env.BLING_KEY;

  saveOrder(order) {
    const url = `${this.baseUrl}/pedido/json/${this.apiKey}`;
    const orderXml = json2xml(JSON.parse(order));
    return axios.post(url, null, {
      params: {
        apiKey: this.apiKey,
        xml: orderXml,
      },
    });
  }
}

export const blingConnection = new BlingConnection();
