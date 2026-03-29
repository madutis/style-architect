export interface Product {
  id: string;
  name: string;
  brand: string;
  brand_country: string;
  category: string;
  subcategory: string;
  price_eur: number;
  styles: string[];
  materials: string[];
  design_feel: string[];
  colors: string[];
  room_types: string[];
  description: string;
  image_url: string;
}
