import Button from "@/components/FRONTEND/Button";
import InputField from "@/components/FRONTEND/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { UserContext } from "./_app";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [user, getUser]: any = useContext(UserContext);
  const [errors, setErrors] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/auth", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        Cookies.set("token", data.token, { expires: 365 });
        getUser();
        router.push("/account");
      } else {
        setErrors(data.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrors(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrors("");
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrors("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-28 bg-gray-100 px-5">
      <div className="bg-white py-8 px-4 md:px-8 rounded-lg shadow-md w-full max-w-md">
        <div>
          <h2 className="text-2xl font-bold text-center font-montserrat text-black">
            Login
          </h2>
          <h4 className="text-lg font-medium mb-6 text-opacity-60 text-center font-montserrat text-black">
            Login to an Existing Account
          </h4>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-montserrat">
              Email*
            </label>
            <InputField
              id={"email"}
              name={"email"}
              type={"email"}
              autoComplete="email"
              value={email}
              required
              onChange={handleEmailChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-montserrat">
              Password*
            </label>
            <InputField
              id={"password"}
              name={"password"}
              type={"password"}
              autoComplete="password"
              value={password}
              required
              onChange={handlePasswordChange}
            />
          </div>
          {errors && (
            <div className="flex items-center font-poppins text-sm py-2 text-red-500 gap-1">
              <InfoOutlinedIcon fontSize="inherit" />
              <p>{errors}</p>
            </div>
          )}
          <Button
            buttonType="submit"
            text={"Login"}
            loading={loading}
            loadingVariant="secondary"
            className="w-full hover:bg-transparent"
            type="fill"
          />
        </form>
        <div className="flex items-center justify-center gap-1 my-4">
          <p className="text-sm text-center text-black font-light font-poppins text-opacity-60">
            {`Don't have an account?`}
          </p>
          <Link
            href="/register"
            className="text-darkGreen text-center font-poppins hover:underline"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
