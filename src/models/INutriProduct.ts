export interface INutritionixResponse {
    common: ICommonItem[];
    branded: IBrandedItem[];
  }
  
  export interface ICommonItem {
    serving_qty: number;
    tag_id: string;
    tag_name: string;
    photo: IPhoto;
    common_type: string | null;
    food_name?: string;
    serving_unit:string
  }
  
  export interface IBrandedItem {
    serving_qty: number;
    tag_id: string;
    tag_name: string;
    photo: IPhoto;
    brand_name: string;
    food_name: string;
    nf_calories: number;
    serving_unit: string;
    serving_weight_grams: number;
  }
  
  export interface IPhoto {
    thumb: string; 
  }
  