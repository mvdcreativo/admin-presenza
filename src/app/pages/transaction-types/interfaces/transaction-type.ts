import { Currency } from '../../currencies/interfaces/currency';

export interface TransactionType {
    id?:number;
    name:string;
    slug?:string;
    pivot?: Pivot
}

interface Pivot {
    currency: Currency;
    price: number;
    publication_id: number;
    transaction_type_id: number;

}

