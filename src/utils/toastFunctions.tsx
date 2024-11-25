import { toast } from "react-toastify";

export const showToastSuccess = (toastMsg: string) => {
  toast.success(toastMsg);
};

export const showToastError = (toastMsg: string) => {
  toast.error(toastMsg);
};
