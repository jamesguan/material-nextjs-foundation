export const amountReducer =  (accumulator, elem) => accumulator + elem.qty;
export const totalPriceReducer =  (accumulator, elem) => (accumulator + (elem.price * elem.qty));
  