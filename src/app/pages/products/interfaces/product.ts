import { Publication } from '../../publications/interfaces/publication';

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
    data: Product[];
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

export interface Product {
   
    id?: number;
    title?: string;
    code?: string;
    address?: string;
    description?: string;
    status_id?: number;
    property_type_id?: number;
    neighborhood_id?: number;
    latitude?: string;
    longitude?: string;
    user_owner_id?: number;
    images?: Image[];
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
    videos?: any[];
    features?: Feature[];
    property_type: PropertyTypes;
    neighborhood: Neighborhood;
    user_owner?: User;
    publication?: Publication;
}

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: any;
    created_at: Date;
    updated_at: Date;
}

export interface Image {
    id?: number;
    url: string;
    url_small: string;
    url_medium: string;
    title?: string;
    subtitle?: string;
    description?: string;

}

export interface Feature {
    id?: number;
    name: string;
    slug: string;
    feature_id?: number;
    type?: string;
    value?: string;
    created_at?: any;
    updated_at?: any;
    feature?: Feature;
    features?: Feature[];
    pivot?: {
        property_id: number;
        feature_id: number;
        value: any;
    }

}

export interface Neighborhood {
    id?: number;
    name: string;
    code?: string;
    municipality_id: number;
    created_at?: any;
    updated_at?: any;
    municipality: Municipality;

}
export interface Municipality {
    id?: number;
    name: string;
    code?: string;
    city_id: number;
    city: City;
    created_at?: any;
    updated_at?: any;

}

export interface City {
    id?: number;
    name: string;
    code?: string;
    province_id: number;
    province: Province;
    created_at?: any;
    updated_at?: any;

}
export interface Province {
    id?: number;
    name: string;
    code?: string;
    country_id: number;
    // country: Country;
    created_at?: any;
    updated_at?: any;

}

export interface PropertyTypes {
    id?: number;
    name: string;
    description?: string;
    status_id?: number;
}

export interface OptionSelect {
    value?: any;
    name?: string;
}