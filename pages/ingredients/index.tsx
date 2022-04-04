import type { NextPage } from "next";


import styles from "@styles/pages/Ingredients.module.scss";
import Header from "components/Header";
import { Ingredient } from "@prisma/client";
import SmallResultCard from "components/cards/SmallResultCard";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "components/Sidebar";
import { getAllIngredients } from "@pages/api/ingredients";

type Props = {
  ingredients: Array<Ingredient>;
};

const Ingredients: NextPage<Props> = ({ ingredients }) => {
  const router = useRouter();

  const [filterTerm, setFilterTerm] = useState<string>(
    String(router.query.filter) || ""
  );

  const filter = () => {
    return ingredients.filter((ingredient) => {
      return ingredient.name.toLowerCase().includes(filterTerm);
    });
  };

  return (
    <div className={styles.root}>
      <Sidebar/>

      <main>
        <Header />

        <div className={styles.mainContent}>
          <div className={styles.resultContainer}>
            <div className={styles.topLine}>
              <p>[n] results</p>
              <div className={styles.filterInput}>
                <input
                  type="text"
                  placeholder="Filter by name..."
                  value={filterTerm}
                  onChange={(e) => setFilterTerm(e.target.value.toLowerCase())}
                />
              </div>
            </div>
            <div className={styles.resultCardContainer}>
              {filter().map((ingredient) => (
                <Link
                  href={"/ingredients/" + ingredient.id}
                  key={ingredient.name}
                >
                  <a>
                    <SmallResultCard
                      label={ingredient.name}
                      img={ingredient.img}
                    />
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export const getStaticProps = async () => {
  const ingredients = await getAllIngredients()
  return {
    props: {
      ingredients,
    },
  };
}

export default Ingredients;
