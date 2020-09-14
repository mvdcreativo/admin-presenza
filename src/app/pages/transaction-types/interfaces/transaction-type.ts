
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

interface Currency {
    id:number;
    name: string;
    symbol: string;
    status: string;
    value: number;
}