import type { NextPage } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Layout from "@components/layout";
import FloatingButton from "@components/floatingBtn";
import Item from "@components/item";
import useUser from "@libs/client/useUser";
import useSWR, { SWRConfig } from "swr";
import { Item as DBItem } from "@prisma/client";
import client from "@libs/server/client";

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
    <Layout title="Home" hasTabBar={true} seoTitle="Home">
      {/* List of items */}
      <div className="flex flex-col space-y-5">
        {data?.items?.map((item) => (
           <Item
            id={item.id}
            key={item.id}
            title={item.name}
            price={item.price}
            comments={1}
            hearts={item._count?.favs || 0}
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

const Page: NextPage<{items: itemWithCount[]}> = ({items}) => {
  return (
    <SWRConfig value={{
      fallback: {
        "/api/items": {
          ok: true,
          items
        }
      }
    }}>
      <Home />
    </SWRConfig>
  );
}

export async function getServerSideProps() {
  const items = await client.item.findMany({});
  return {
    props: {
      items: JSON.parse(JSON.stringify(items)),
    },
  };
}

export default Page;
