import type { NextPage } from "next";
import Item from "@components/item";
import Layout from "@components/layout";
import ItemList from "@components/item-list";

const Sold: NextPage = () => {

  return (
    <Layout title="Items Sold" canGoBack>
      <div className="flex flex-col space-y-5 pb-10  divide-y">
        <ItemList kind="sales" />
      </div>
    </Layout>
  );
};

export default Sold;