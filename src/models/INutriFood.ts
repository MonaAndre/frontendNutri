export interface INutriFood {
    alt_measures: IAltMeasure[]; 
    brand_name: string | null; 
    brick_code: string | null; 
    class_code: string | null; 
    consumed_at: string | null; 
    food_name: string; 
    full_nutrients: IFullNutrient[];
    lat: number | null; 
    lng: number | null; 
    meal_type: number | null; 
    metadata: IMetadata; 
    nf_calories: number | null; 
    nf_cholesterol: number | null; 
    nf_dietary_fiber: number | null; 
    nf_p: number | null; 
    nf_potassium: number | null; 
    nf_protein: number | null; 
    nf_saturated_fat: number | null; 
    nf_sodium: number | null; 
    nf_sugars: number | null; 
    nf_total_carbohydrate: number | null; 
    nf_total_fat: number | null; 
    nix_brand_id: string | null; 
    nix_brand_name: string | null; 
    nix_item_id: string | null;
    nix_item_name: string | null;
    photo: IPhoto; 
    serving_qty: number; 
    serving_unit: string; 
    serving_weight_grams: number; 
    source: number | null; 
    sub_recipe: string | null; 
    tag_id: number | null;
    tags: ITag[]; 
    upc: string | null;
  }
  
  export interface IAltMeasure {
    serving_weight: number; 
    measure: string; 
    seq: number; 
    qty: number;
  }
  
  export interface IFullNutrient {
    attr_id: number;
    value: number;
  }
  
  export interface IMetadata {
    is_raw_food: boolean; 
  }
  
  export interface IPhoto {
    thumb: string;
    highres: string | null;
    is_user_uploaded: boolean; 
  }
  
  export interface ITag {
    item: string; 
    measure: string;
    quantity: string;
    food_group: number; 
    tag_id: number;
  }
  