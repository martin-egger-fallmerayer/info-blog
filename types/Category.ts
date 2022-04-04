import { Ingredient } from "./Ingredient";

export type Category = {
  name: string;
  namePlural: string;
  subcategories: Subcategory[];
  ingredients: Ingredient[];
};

export type Subcategory = {
  name: string;
  categoryName: string;
  ingredients: Ingredient[];
};
