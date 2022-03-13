import { RecipeIngredient } from "./RecipeIngredient"

export type Cocktail = {
    name: string,
    tags: Array<string>,
    ingredients: Array<RecipeIngredient>,
    instructions: string,
    garnish: string,
    info: string
    type: string,
    img: string
    }