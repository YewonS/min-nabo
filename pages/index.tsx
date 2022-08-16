import type { NextPage } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faHeart, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular, faCommentDots } from "@fortawesome/free-regular-svg-icons";
import Layout from "../components/layout";
import FloatingButton from "../components/floatingBtn";
import Item from "../components/item";

const Home: NextPage = () => {
  return (
    <Layout title="Home" hasTabBar={true}>
      {/* List of items */}
      <div className="flex flex-col space-y-5">
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
           <Item
           id={i}
           key={i}
           title="iPhone 14"
           price={99}
           comments={1}
           hearts={1}
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
