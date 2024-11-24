import Button from "@/components/FRONTEND/Button";
import InputField from "@/components/FRONTEND/Input";
import Link from "next/link";
import React, { useState } from "react";

const Register: React.FC = () => {
  const [role, setRole] = useState<"buyer" | "farmer" | null>(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [farmName, setFarmName] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center py-28 px-5 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <div>
          <h2 className="text-2xl font-bold text-center font-montserrat text-black">
            Register
          </h2>
          <h4 className="text-lg font-medium mb-6 text-opacity-60 text-center font-montserrat text-black">
            Create an Account
          </h4>
        </div>
        <form>
          <div className="flex flex-col mb-2 lg:flex-row lg:mb-0 gap-3 w-full">
            <div className=" w-full">
              <label
                htmlFor="store_name"
                className="block text-sm font-medium text-gray-700 font-montserrat"
              >
                Firstname*
              </label>
              <InputField
                id="firstname"
                name="firstname"
                type="text"
                autoComplete="first_name"
                isRequired={true}
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="categories"
                className="block text-sm font-medium text-gray-700 font-montserrat"
              >
                Lastname*
              </label>
              <InputField
                id="last_name"
                name="last_name"
                type="text"
                autoComplete="family_name"
                isRequired={true}
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 font-montserrat">
              Email*
            </label>
            <InputField
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              isRequired={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 font-montserrat">
              Role*
            </label>
            <div className="flex gap-2 w-full">
              <h4
                onClick={(e) => setRole("farmer")}
                className={`w-full ${
                  role === "farmer" &&
                  "outline outline-1 outline-offset-0 outline-darkGreen"
                } p-2 bg-gray-100 border-gray-300 rounded-md text-darkGreen font-poppins text-center border cursor-pointer text-sm hover:border-darkGreen`}
              >
                Farmer
              </h4>
              <h4
                onClick={(e) => setRole("buyer")}
                className={`w-full ${
                  role === "buyer" &&
                  "outline outline-1 outline-offset-0 outline-darkGreen"
                } p-2 bg-gray-100 border-gray-300 rounded-md text-darkGreen font-poppins text-center border cursor-pointer text-sm hover:border-darkGreen`}
              >
                Buyer
              </h4>
            </div>
          </div>
          {role === "farmer" && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 font-montserrat">
                Farm Name *
              </label>
              <InputField
                id="farm_name"
                name="farm_name"
                type="text"
                autoComplete="farm_name"
                isRequired={true}
                value={farmName}
                onChange={(e) => setFarmName(e.target.value)}
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 font-montserrat">
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
            type="fill"
            className="w-full hover:bg-transparent active:bg-transparent"
            text="Create Account"
          />
        </form>
        <div className="flex items-center justify-center gap-1 my-4">
          <p className="text-sm text-center text-black font-light font-poppins text-opacity-60">
            {`Already have an account?`}
          </p>
          <Link
            href="/login"
            className="text-darkGreen text-center font-poppins hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
