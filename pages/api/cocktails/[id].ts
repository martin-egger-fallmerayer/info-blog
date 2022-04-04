// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongo from "db/mongo";
import { WithId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = WithId<Document> | null;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;
  res.json(await getCocktailById(String(id)))
}

export const getCocktailById = async (id: string) => {
  const cocktail: Data = await mongo.cocktails.findOne({
    _id: { $regex: new RegExp("^" + String(id).toLowerCase(), "i") },
  });
  return cocktail;
};
