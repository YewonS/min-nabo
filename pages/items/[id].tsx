import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartFull } from "@fortawesome/free-solid-svg-icons";
import Layout from "@components/layout";
import Button from "@components/button";
import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";
import { Item, User } from "@prisma/client";
import useValidation from "@libs/client/useValidation";
import { joinClassNames } from "@libs/client/utils";
import Image from "next/image";
import client from "@libs/server/client";

interface ItemWithUser extends Item {
  user: User;
}

interface ItemDetailResponse { 
  success: boolean;
  item: ItemWithUser;
  relatedItems: Item[];
  isLiked: boolean;
}

const ItemDetail: NextPage<ItemDetailResponse> = ({ item, relatedItems, isLiked }) => {
  const router = useRouter();
  const { data, mutate } = useSWR<ItemDetailResponse>(router.query.id ? `/api/items/${router.query.id}` : null);
  const [ toggleFav ] = useValidation(`/api/items/${router.query.id}/fav`);
  const onFavClick = () => {
    if (!data) return;
    mutate((prev) => prev && {...prev, isLiked: !prev.isLiked }, false);
    toggleFav({});
  }

  return (
    <Layout canGoBack seoTitle="Product Detail">
      <div className="px-4 py-4">
        <div className="mb-8">
          {/* Image */}
          {item?.imageURL ? 
          // TODO: change all the images with next/image
          <div className="relative h-96">
            <Image
              src={`https://imagedelivery.net/Qb7PA1G1cVeln13aN4KZiQ/${item?.imageURL}/public`}
              className="bg-slate-300 object-cover"
              layout="fill"
            /> 
          </div>
            : <div className="h-96 bg-slate-300" />
          }

          {/* Profile */}
          <div className="flex cursor-pointer py-3 border-t border-b items-center space-x-3">
            { item?.user?.avatar ? 
              <img
                src={`https://imagedelivery.net/Qb7PA1G1cVeln13aN4KZiQ/${item?.user?.avatar}/avatar`}
                className="w-12 h-12 rounded-full bg-slate-300"
              />
              : <div className="w-12 h-12 rounded-full bg-slate-300" />
            }
            <div>
              <p className="text-sm font-medium text-gray-600">{item?.user?.name}</p>
              <Link href={`/users/profiles/${item?.user?.id}`}>
                <a className="text-sm font-medium text-gray-400">View profile &rarr;</a>
              </Link>
            </div>
          </div>
          {/* Product detail */}
          <div className="mt-8">
            <h1 className="text-3xl font-bold text-gray-900">{item?.name}</h1>
            <span className="text-2xl block mt-3 text-gray-900">${item?.price}</span>
            <p className="text-base my-6 text-gray-700">
              {item?.description}
            </p>
            <div className="flex items-center justify-between space-x-2">
              <Button large text="Talk to seller" />
              <button 
                onClick={onFavClick}
                className={
                  joinClassNames("p-3 rounded-md flex items-center justify-center", isLiked ? "text-red-500 hover:bg-gray-200" : "text-gray-500 hover:bg-gray-200")
                }
              >
                <svg
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <FontAwesomeIcon icon={isLiked ? faHeartFull : faHeart } />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Similar Items */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Similar items</h2>
          <div className="grid grid-cols-2 gap-4">
            {relatedItems?.map((item) => (
              <Link href={`/items/${item?.id}`} key={item?.id}>
                <a key={item?.id}>
                  <div className="h-56 w-full bg-slate-300 mt-6 mb-4"/>
                  <h3 className="text-md text-gray-700 -mb-1">{item?.name}</h3>
                  <span className="text-sm font-medium text-gray-900">${item?.price}</span>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticPaths : GetStaticPaths = () => { 
  return {
    paths: [],
    fallback: "blocking",
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  if(!context.params?.id) return { props: {} };
  const cleanID = +context.params.id;
  const item = await client.item.findUnique({
    where: {
        id: cleanID,
    },
    include: {
        user: {
            select: {
                id: true,
                name: true,
                avatar: true,
            }
        },
    }
  })
  const terms = item?.name.split(" ").map((word)=>({ 
      name: {
          contains: word,
      }
  }));
  const relatedItems = await client.item.findMany({
      where: {
          OR: terms,
          AND: {
              id: {
                  not: item?.id,
              }
          }
      }
  })
  const isLiked = false;
  return {
    props: { 
      item: JSON.parse(JSON.stringify(item)),
      relatedItems: JSON.parse(JSON.stringify(relatedItems)),
      isLiked,
    }
  } 
}

export default ItemDetail;