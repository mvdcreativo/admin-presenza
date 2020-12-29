export interface Fields {
    titleForm?: string; 
    nameControl:string;
    type:string;
    label: string;
    value?:any;
    options?:OptionSelect[];
    validators?:any[];
    class?:string;
}

export interface OptionSelect {
    name:string;
    value: any
}

