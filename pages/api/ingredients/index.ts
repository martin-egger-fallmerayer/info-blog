// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Ingredient } from "@prisma/client";
import prisma from "db/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = Ingredient[] | string[];

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  // names
  if ("ids" in req.query) {
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

export const searchIngredientsById = async (search: string) => {
  const searchIngredients = await prisma.ingredient.findMany({
    where: {
      id: {
        contains: search.toLowerCase(),
      },
    },
  });

  return searchIngredients;
};
