interface User {
    id?: string;
    email: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
    resetPassToken?: string;
    resetPassExpires?: number;
}
export default User;