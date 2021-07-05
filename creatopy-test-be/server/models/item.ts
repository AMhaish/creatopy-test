import User from "./user";

interface Item {
    id: string;
    title: string;
    userId?: string;
    createdAt?: Date;
    updatedAt?: Date;
    user?: User;
}
export default Item;