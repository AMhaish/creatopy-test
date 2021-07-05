import { User } from "./user";

export interface ItemQueryResult {
    items: Item[];
}

interface Item {
    id?: string;
    title: string;
    createdAt?: string;
    updatedAt?: string;
    user?: User;
}

export default Item;