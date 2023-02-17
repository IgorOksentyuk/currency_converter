export interface CurrencyResp {
  base: string;
  date: string | Date;
  motd: {
    msg: string;
    url: string;
  };
  rates: {
    [index: string]: number;
  };
  success: boolean;
}
