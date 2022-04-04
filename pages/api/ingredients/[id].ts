// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Ingredient } from "@prisma/client";
import prisma from "db/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = Ingredient | null;

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;
  res.json(await getIngredientById(String(id)));
};

export const getIngredientById = async (id: string) => {
  const ingredient = await prisma.ingredient.findFirst({
    where: { id: { equals: String(id), mode: "insensitive" } },
  });
  return ingredient
};
