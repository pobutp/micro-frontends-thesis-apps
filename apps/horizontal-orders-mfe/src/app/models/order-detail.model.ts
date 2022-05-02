import { IOrderItem } from '@micro-frontends-thesis-apps/shared';

export interface IOrderDetail {
  ordernumber: string;
  status: string;
  description: string;
  street: string;
  date: Date;
  city: number;
  state: string;
  zipcode: string;
  country: number;
  total: number;
  orderitems: IOrderItem[];
}
