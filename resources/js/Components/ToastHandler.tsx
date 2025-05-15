// resources/js/Components/ToastHandler.tsx
import { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


type FlashMessage = {
  message?: {
    success?: string;
    error?: string;
  };
};

const ToastHandler = () => {
  
  const flash = (usePage().props as unknown as { flash?: FlashMessage }).flash;
  useEffect(() => {
    // const flash = props.flash;

    if (flash?.message?.success) {
      toast.success(flash?.message.success, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        pauseOnFocusLoss: false,
        theme: "colored",
      });
    }

    if (flash?.message?.error) {
      toast.error(flash?.message.error, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        pauseOnFocusLoss: false,
        theme: "colored",
      });
    }
  }, [flash]);

  return <ToastContainer />;
};

export default ToastHandler;
