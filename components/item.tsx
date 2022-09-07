import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faHeart as faHeartRegular, faCommentDots } from "@fortawesome/free-regular-svg-icons";

interface ItemProps {
  title: string;
  id: number;
  price: number;
  comments?: number;
  hearts: number;
  image: string;
}

export default function Item({
  title,
  price,
  comments = 0,
  hearts,
  image,
  id,
}: ItemProps) {
  return (
    <Link href={`/items/${id}`}>
      <a className="flex px-4 pt-5 cursor-pointer justify-between">
        <div className="flex space-x-4">
          {/* Product Image */}
          { image !== "image-url" ? 
            <div className="w-20 h-20 relative rounded-md">
              <Image
                src={`https://imagedelivery.net/Qb7PA1G1cVeln13aN4KZiQ/${image}/public`}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div> 
            : <div className="w-20 h-20 bg-gray-400 rounded-md" /> 
          }
          {/* Product Info */}
          <div className="pt-2 flex flex-col">
            <h3 className="text-sm font-medium text-gray-900">{title}</h3>
            <span className="font-medium mt-1 text-gray-900">${price}</span>
          </div>
        </div>
        {/* Like and Comments */}
        <div className="flex space-x-2 items-end justify-end">
          <div className="flex space-x-0.5 items-center text-sm  text-gray-600">
            <FontAwesomeIcon icon={faHeartRegular} className="w-4 h-4" />
            <span>{hearts}</span>
          </div>
          {comments ? 
            <div className="flex space-x-0.5 items-center text-sm  text-gray-600">
              <FontAwesomeIcon icon={faCommentDots} className="w-4 h-4" />
              <span>{comments}</span>
            </div> 
          : null}
        </div>
      </a>
    </Link>
  );
}