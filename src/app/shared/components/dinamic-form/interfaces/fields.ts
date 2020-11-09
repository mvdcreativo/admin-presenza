export interface Fields {
    titleForm?: string; 
    nameControl:string;
    type:string;
    label: string;
    value?:any;
    options?:OptionSelect[];
    validators?:any[];
}

export interface OptionSelect {
    name:string;
    value: any
}

