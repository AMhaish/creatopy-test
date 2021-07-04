export interface ItemQueryResult {
    items: Item[];
}

interface Item {
    id?: string;
    title: string;
    createdAt?: string;
    updatedAt?: string;
}

export default Item;