export interface State {
    id?: number;
    name: string;
    code?: string;
    country_id: number;
    created_at?: any;
    updated_at?: any;
    country: any;
    
}
export interface City {
    id?: number;
    name: string;
    code?: string;
    province_id: number;
    // province: Province;
    created_at?: any;
    updated_at?: any;
    province: any;

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
export interface Neighborhood {
    id?: number;
    name: string;
    code?: string;
    municipality_id: number;
    created_at?: any;
    updated_at?: any;
    municipality: Municipality;

}
