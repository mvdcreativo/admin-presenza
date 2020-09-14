import { Product } from "../../products/interfaces/product";
import { TransactionType } from "../../transaction-types/interfaces/transaction-type";


export interface Publication {
    id?:number;
    property_id?:number;
    status_id?:string;
    transaction_types?:TransactionType[];
    currency_id?:number;
    price?:string;
    property?: Product;
    currency?: any;
    created_at?: string;
    updated_at?:string;
}
