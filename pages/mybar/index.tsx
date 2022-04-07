import type { NextPage } from "next";

import styles from "@styles/pages/MyBar.module.scss";
import Header from "components/Header";
import { checkCookies } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Sidebar from "components/Sidebar";
import { getCocktailsByIngredients } from "@pages/api/cocktails/byIngredients";
import Link from "next/link";
import SmallResultCard from "components/cards/SmallResultCard";

type Props = {
  myCocktails: any[];
};

const MyBar: NextPage<Props> = ({ myCocktails }) => {
  const router = useRouter();

  useEffect(() => {
    if (!checkCookies("mybar-ingredients")) {
      router.push("/mybar/getstarted");
    }
  }, []);

  return (
    <div className={styles.root}>
      <Sidebar />

      <main>
        <Header />

        <div className={styles.mainContent}>
          <div className={styles.resultContainer}>
            <div className={styles.topLine}>
              <p>{myCocktails.length} results</p>
              <div className={styles.buttonContainer}>
                <input
                  className={styles.secondary}
                  type="button"
                  value="CLEAR"
                  onClick={() => router.push("/mybar/setup")}
                />
                <input
                  className={styles.primary}
                  type="button"
                  value="UPDATE"
                  onClick={() => router.push("/mybar/setup")}
                />
              </div>
            </div>

            <div className={styles.resultCardContainer}>
              {myCocktails.length === 0 && (
                <h1 className={styles.sorry}>
                  Sorry, we couldn&apos;t find any cocktails for you :(
                </h1>
              )}

              {myCocktails.length !== 0 &&
                myCocktails.map((cocktail) => (
                  <Link
                    href={"/cocktails/" + cocktail._id.toLowerCase()}
                    key={cocktail._id}
                  >
                    <a>
                      <SmallResultCard
                        label={cocktail._id}
                        img={cocktail.img}
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

export async function getServerSideProps(context: any) {
  const myIngredients =
    "mybar-ingredients" in context.req.cookies
      ? JSON.parse(context.req.cookies["mybar-ingredients"])
      : [];

  const myCocktails = await getCocktailsByIngredients(myIngredients);
  return {
    props: {
      myCocktails,
    },
  };
}

export default MyBar;
