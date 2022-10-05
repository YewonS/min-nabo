import type { NextPage } from "next";
import Item from "@components/item";
import Layout from "@components/layout";
import ItemList from "@components/item-list";

const Loved: NextPage = () => {
  return (
    <Layout title="My Favorites" canGoBack>
      <div className="flex flex-col space-y-5 pb-10 divide-y">
        <ItemList kind="favorites" />
      </div>
    </Layout>
  );
};

export default Loved;