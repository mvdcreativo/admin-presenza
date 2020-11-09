import { Product } from "src/app/pages/products/interfaces/product";
import { Currency } from 'src/app/pages/currencies/interfaces/currency';
import { User } from 'src/app/pages/users/interfaces/user';

export interface Expense {
    id: number;
    name: string;
    description?: any;
    created_at: Date;
    updated_at: Date;
    deleted_at?: any;
    
}

export interface ExpensesPropertiesUsers {
    id:number;
    user_id: number;
    expense_id: number;
    created_at?: any;
    property_id?: number;
    updated_at?: any;
    currency_id: number;
    value: number;
    expense?: Expense;
    property?: Product;
    currency?: Currency;
    user?: User;
}