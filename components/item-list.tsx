import useSWR from "swr";
import { itemWithCount } from "pages/index";
import Item from "./item";


interface Record {
  id: number;
  item: itemWithCount;
}

interface ItemListResponse {
  [key: string]: Record[];
}

interface ItemListProps {
    kind: "favorites" | "sales" | "purchases"
}

export default function ItemList({kind}: ItemListProps) {
    const {data} = useSWR<ItemListResponse>(`/api/users/me/${kind}`);
    return data ? 
        <> {
          data?.[kind]?.map((record) => (
            <Item
              id={record.item.id}
              key={record.id}
              title={record.item.name}
              price={record.item.price}
              hearts={record.item._count.favs}
              image={record.item.imageURL}
            />
          ))
        } </> : null;
}