import { toast } from "react-toastify";

export function notifyUser(type: string, message: string): void {
    switch (type) {
        case "e":
            toast.error(message, {
                position: "bottom-right",
                autoClose: false,
                hideProgressBar: true,
                className: "toast-style toast-error",
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
            });
            break;
        case "s":
            toast.success(message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                className: "toast-style toast-success",
                bodyClassName: "",
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
            });
            break;
        case "w":
            toast.warn(message, {
                position: "bottom-right",
                autoClose: false,
                hideProgressBar: true,
                className: "toast-style toast-warning",
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
            });
            break;
        default:
            console.log("e", "An unexpected error occurred, try again.");
            break;
    }
}
