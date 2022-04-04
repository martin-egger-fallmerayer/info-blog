// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "db/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

}

export const getAllCategories = async () => {
  return await prisma.category.findMany({
    include: { Subcategory: true },
  });
};

export const getAllCategoriesWithIngredients = async () => {
  return await prisma.category.findMany({
    include: {
      Subcategory: {
        include: { Ingredient: true },
      },
    },
  });
};
