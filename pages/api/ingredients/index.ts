// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Ingredient } from "@prisma/client";
import prisma from "db/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = Ingredient[] | string[];

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  // names
  if ("ids" in req.query) {
    res.json(await getAllIngredientIds());
    res.json(await getAllIngredientIds());
  }

  // ingredients
  else {
    res.json(await getAllIngredients());
  }
};

export const getAllIngredients = async () => {
  const ingredients = await prisma.ingredient.findMany();
  return ingredients;
};

export const getAllIngredientIds = async () => {
  const names = await prisma.ingredient.findMany({
    select: { id: true },
  });
  return names.map((name) => name.id);
};
