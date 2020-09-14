export interface ResponsePaginate {
    message?: string;
    data?: Paginate;
    success?: boolean;
}

export interface Response {
    message?: string;
    data?: any;
    success?: boolean;
}

export interface Paginate {
    current_page: number;
    data: any[];
    first_page_url: string;
    from?: any;
    last_page: number;
    last_page_url: string;
    next_page_url?: any;
    path: string;
    per_page: number;
    prev_page_url?: any;
    to?: any;
    total: number;
}