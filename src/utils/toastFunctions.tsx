import { toast } from "react-toastify";
import { 
  CheckCircle, 
  Warning, 
  Error, 
  Info,
  Close 
} from "@mui/icons-material";

const toastConfig = {
  position: "top-right" as const,
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
};

const CloseButton = () => (
  <Close sx={{ color: '#666666' }} className="!w-5 !h-5 cursor-pointer" />
);

export const showToastSuccess = (message: string) => {
  toast(
    <div className="flex items-center gap-2">
      <CheckCircle sx={{ color: '#16a34a' }} className="!w-6 !h-6" />
      <span className="text-gray-700 font-medium">{message}</span>
    </div>,
    {
      ...toastConfig,
      type: "default",
      className: "!bg-white !rounded-lg !shadow-md border border-green-100",
      progressStyle: { 
        background: '#22c55e'
      },
      closeButton: CloseButton,
    }
  );
};

export const showToastError = (message: string) => {
  toast(
    <div className="flex items-center gap-2">
      <Error sx={{ color: '#dc2626' }} className="!w-6 !h-6" />
      <span className="text-gray-700 font-medium">{message}</span>
    </div>,
    {
      ...toastConfig,
      type: "default",
      className: "!bg-white !rounded-lg !shadow-md border border-red-100",
      progressStyle: { 
        background: '#ef4444'
      },
      closeButton: CloseButton,
    }
  );
};

export const showToastWarning = (message: string) => {
  toast(
    <div className="flex items-center gap-2">
      <Warning sx={{ color: '#eab308' }} className="!w-6 !h-6" />
      <span className="text-gray-700 font-medium">{message}</span>
    </div>,
    {
      ...toastConfig,
      type: "default",
      className: "!bg-white !rounded-lg !shadow-md border border-yellow-100",
      progressStyle: { 
        background: '#facc15'
      },
      closeButton: CloseButton,
    }
  );
};

export const showToastInfo = (message: string) => {
  toast(
    <div className="flex items-center gap-2">
      <Info sx={{ color: '#2563eb' }} className="!w-6 !h-6" />
      <span className="text-gray-700 font-medium">{message}</span>
    </div>,
    {
      ...toastConfig,
      type: "default",
      className: "!bg-white !rounded-lg !shadow-md border border-blue-100",
      progressStyle: { 
        background: '#3b82f6'
      },
      closeButton: CloseButton,
    }
  );
};
