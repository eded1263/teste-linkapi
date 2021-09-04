import axios from "axios";
import json2xml from "json2xml";

class BlingService {
  baseUrl = "https://bling.com.br/Api/v2";
  apiKey = process.env.BLING_KEY;

  saveOrder(order) {
    const url = `${this.baseUrl}/pedido/json`;
    const orderXml = json2xml(JSON.parse(order));
    return axios
      .post(url, null, {
        params: {
          apikey: this.apiKey,
          xml: orderXml,
        },
      })
      .catch((e) => {
        console.log(e.response.data.retorno);
      });
  }
}

export const blingService = new BlingService();
