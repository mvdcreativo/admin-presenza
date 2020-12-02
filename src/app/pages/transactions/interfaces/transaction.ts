import { User } from "../../users/interfaces/user";
import { Product } from "../../products/interfaces/product";

export interface Transaction {
    id : number;
    user_owner_id : number;
    user_customer_id : number;
    property_id : number;
    transaction_type_id : number;
    value : number;
    currency_id : number;
    date_ini?: string;
    date_end?: string;
    property: Product;
    user_owner: User;
    user_customer: User;

}
