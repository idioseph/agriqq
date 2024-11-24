import Button from "@/components/FRONTEND/Button";
import InputField from "@/components/FRONTEND/Input";
import Link from "next/link";
import React, { useState } from "react";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="min-h-screen flex items-center justify-center py-28 bg-gray-100 px-5">
      <div className="bg-white  p-8 rounded-lg shadow-md w-full max-w-md">
        <div>
          <h2 className="text-2xl font-bold text-center font-montserrat text-black">
            Login
          </h2>
          <h4 className="text-lg font-medium mb-6 text-opacity-60 text-center font-montserrat text-black">
            Login to an Existing Account
          </h4>
        </div>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-montserrat">
              Email
            </label>
            <InputField
              id={"email"}
              name={"email"}
              type={"email"}
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-montserrat">
              Password
            </label>
            <InputField
              id={"password"}
              name={"password"}
              type={"password"}
              autoComplete="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            text={"Login"}
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
