export interface IDvd {
  id: string;
  name: string;
  duration: string;
}

export interface IDvdCreate {
  name: string;
  duration: string;
  quantity: number;
  price: number;
  authEmail: string;
}

export interface IDvdBuy {
  quantity: number;
  dvdId: string;
  authEmail: string;
}

export interface IDvdPay {
  authEmail: string;
}

export default IDvdPay;
