import { toast } from "react-toastify";
import { CheckCircle, Warning, Error, Info } from "@mui/icons-material";

const toastConfig = {
  position: "top-right" as const,
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

// Common toast container styles
const iconClasses = "w-6 h-6";

export const showToastSuccess = (message: string) => {
  toast(
    <div className="flex items-center gap-2">
      <CheckCircle className={`${iconClasses} text-green-600`} />
      <span className="text-gray-700 font-medium">{message}</span>
    </div>,
    {
      ...toastConfig,
      type: "default",
      className: "!bg-white !rounded-lg !shadow-md border border-green-100",
      progressClassName: "!bg-green-500",
    }
  );
};

export const showToastError = (message: string) => {
  toast(
    <div className="flex items-center gap-2">
      <Error className={`${iconClasses} text-red-600`} />
      <span className="text-gray-700 font-medium">{message}</span>
    </div>,
    {
      ...toastConfig,
      type: "default",
      className: "!bg-white !rounded-lg !shadow-md border border-red-100",
      progressClassName: "!bg-red-500",
    }
  );
};

export const showToastWarning = (message: string) => {
  toast(
    <div className="flex items-center gap-2">
      <Warning className={`${iconClasses} text-yellow-500`} />
      <span className="text-gray-700 font-medium">{message}</span>
    </div>,
    {
      ...toastConfig,
      type: "default",
      className: "!bg-white !rounded-lg !shadow-md border border-yellow-100",
      progressClassName: "!bg-yellow-400",
    }
  );
};

export const showToastInfo = (message: string) => {
  toast(
    <div className="flex items-center gap-2">
      <Info className={`${iconClasses} text-blue-600`} />
      <span className="text-gray-700 font-medium">{message}</span>
    </div>,
    {
      ...toastConfig,
      type: "default",
      className: "!bg-white !rounded-lg !shadow-md border border-blue-100",
      progressClassName: "!bg-blue-500",
    }
  );
};
