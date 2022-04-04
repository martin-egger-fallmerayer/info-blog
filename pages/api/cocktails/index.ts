// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongo from "db/mongo";
import { FindCursor } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  // [GET] array of all ids
  if ("ids" in req.query) {
    res.json(await getAllCocktailsIds());
  }

  // [GET] list of items with matching term (case insensitive)
  else if ("search" in req.query) {
    const { search } = req.query;
    res.json(await searchCocktailsById(String(search)));
  }

  // [GET] all cocktails
  else {
    res.json(await getAllCocktails());
  }
};

// Returns all cocktails
export async function getAllCocktails() {
  const cocktails = mongo.cocktails.find({});
  return await cocktails.toArray();
}

// Search cocktails by id
export async function searchCocktailsById(term: string) {
  const searchCocktails = mongo.cocktails.find({
    _id: { $regex: term, $options: "i" },
  });
  return await searchCocktails.toArray();
}

// Returns ids of all cocktails
export async function getAllCocktailsIds() {
  const names: FindCursor = mongo.cocktails.find(
    {},
    { projection: { _id: 1 } }
  );
  const namesArray = await names.toArray();
  return namesArray.map((name) => name._id);
}
