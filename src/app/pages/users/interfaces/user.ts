export interface User {
    id: number;
    name: string;
    email: string;
    last_name: string;
    email_verified_at?: any;
    account?: Account;
    created_at: Date;
    updated_at: Date;
}
export interface Account {
    id: number;
    user_id: number;
    dni?: any;
    phone?: any;
    movil?: any;
    address?: any;
    address2?: any;
    company?: any;
    cuit?: any;
    image?: any;
    role?: string;
    type_doc_iden?:string;
    created_at?: Date;
    updated_at?: Date;
}
