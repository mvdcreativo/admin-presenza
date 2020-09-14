export interface Feature {
    id?: number;
    name: string;
    slug: string;
    feature_id?: any;
    type?: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: any;
    icon?: any;
    feature?: Feature;
    features?: Feature[];
}
