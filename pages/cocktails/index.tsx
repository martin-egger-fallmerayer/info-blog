import type { NextPage } from "next";



import styles from "@styles/pages/Cocktails.module.scss";
import Header from "components/Header";
import SmallResultCard from "components/cards/SmallResultCard";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { getAllCocktails, searchCocktailsById } from "@pages/api/cocktails";
import Sidebar from "components/Sidebar";

type Props = {
  cocktails: any[];
};

type Context = {
  query: { search: string };
};

const Cocktails: NextPage<Props> = ({ cocktails }) => {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (key: string) => {
    if (key === "Enter") {
      router.replace("/cocktails?search=" + searchTerm);
      router.reload();
    }
  };

  return (
    <div className={styles.root}>
      <Sidebar/>

      <main>
        <Header />

        <div className={styles.mainContent}>
          <div className={styles.resultContainer}>
            <div className={styles.topLine}>
              <p>{cocktails.length} results</p>
              <div className={styles.filterInput}>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => handleSearch(e.key)}
                />
              </div>
            </div>
            <div className={styles.resultCardContainer}>
              {cocktails.map((cocktail) => (
                <Link
                  href={"/cocktails/" + cocktail._id.toLowerCase()}
                  key={cocktail._id}
                >
                  <a>
                    <SmallResultCard label={cocktail._id} img={cocktail.img} />
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

export async function getServerSideProps(context: Context) {
  const { search } = context.query;
  const cocktails =
    search === undefined
      ? await getAllCocktails()
      : await searchCocktailsById(search);

  return {
    props: {
      cocktails,
    },
  };
}

export default Cocktails;
