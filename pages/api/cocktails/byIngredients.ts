// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Ingredient } from "types/Ingredient";
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

  const ingredients = req.body;
  console.dir(req.body);
  const cocktails: FindCursor = mongo.cocktails.find({});
  const cocktailsArray = await cocktails.toArray();
  const myCocktails = cocktailsArray.filter((cocktail) => {
    return cocktail.ingredients.every((ingredient: Ingredient) =>
      ingredients.includes(ingredient)
    );
  });
  console.dir(myCocktails);
  res.json(myCocktails);
}
