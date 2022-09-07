import type { NextPage } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faHeart, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular, faCommentDots } from "@fortawesome/free-regular-svg-icons";
import Layout from "@components/layout";
import FloatingButton from "@components/floatingBtn";
import Item from "@components/item";
import useUser from "@libs/client/useUser";
import Head from "next/head";
import useSWR from "swr";
import { Item as DBItem } from "@prisma/client";

export interface itemWithCount extends DBItem {
  _count: {
    favs: number;
  };
}

interface itemsResponse {
  success: boolean;
  items: itemWithCount[]
}

const Home: NextPage = () => {
  const { user, isLoading } = useUser();
  const { data } = useSWR<itemsResponse>("/api/items");
  
  return (
    <Layout title="Home" hasTabBar={true}>
      <Head>
        <title>Home</title>
      </Head>
      {/* List of items */}
      <div className="flex flex-col space-y-5">
        {data?.items?.map((item) => (
           <Item
            id={item.id}
            key={item.id}
            title={item.name}
            price={item.price}
            comments={1}
            hearts={item._count.favs}
            image={item.imageURL}
          />
        ))}
        {/* Add button */}
        <FloatingButton href="/items/upload">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <FontAwesomeIcon icon={faPlus} />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
}

export default Home;
