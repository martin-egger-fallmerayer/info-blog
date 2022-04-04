import { RecipeIngredient } from "./RecipeIngredient";

export type Cocktail = {
  _id: string;
  tags: Array<string>;
  ingredients: Array<RecipeIngredient>;
  instructions: string;
  garnish: string;
  info: string;
  type: string;
  img: string;
};
