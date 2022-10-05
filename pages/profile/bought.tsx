import type { NextPage } from "next";
import Item from "@components/item";
import Layout from "@components/layout";
import ItemList from "@components/item-list";

const Bought: NextPage = () => {
  return (
    <Layout title="Purchase History" canGoBack>
      <div className="flex flex-col space-y-5 pb-10  divide-y">
        <ItemList kind="purchases" />
      </div>
    </Layout>
  );
};

export default Bought;