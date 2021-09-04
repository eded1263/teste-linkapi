import { dateFormat } from "./dateFormat";

export const orderParser = (deals) =>
  deals.data.map((deal) => ({
    pedido: {
      data: dateFormat(deal.won_time),
      cliente: {
        nome: deal.person_id.name,
        celular: deal.person_id.phone
          ? deal.person_id.phone[0].value
          : undefined,
        email: deal.person_id.email ? deal.person_id.email[0].value : undefined,
      },
      itens: {
        item: {
          codigo: 10, // hardcoded for the test purposes
          qtde: 1,
          vlr_unit: deal.value,
        },
      },
    },
  }));
