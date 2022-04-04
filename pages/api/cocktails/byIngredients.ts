// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Ingredient } from "@prisma/client"
import mongo from "db/mongo";
import { FindCursor } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Guard
  if (req.method !== "POST") res.status(504).send("Method not allowed");

  console.dir(req.body);

  res.json(await getCocktailsByIngredients(req.body));
}

export const getCocktailsByIngredients = async (ingredients: string[]) => {
  const cocktails: FindCursor = mongo.cocktails.find({});
  const cocktailsArray = await cocktails.toArray();

  const myCocktails = cocktailsArray.filter(cocktail => {
    return cocktail.ingredients.every((ingredient:any) => {
      return ingredients.includes(ingredient.name)
    })
  })
  return myCocktails
};

