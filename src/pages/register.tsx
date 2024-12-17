import Button from "@/components/FRONTEND/Button";
import InputField from "@/components/FRONTEND/Input";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { UserContext } from "./_app";
import { showToastError, showToastSuccess } from "@/utils/toastFunctions";

const Register: React.FC = () => {
  const [role, setRole] = useState<"buyer" | "farmer">("buyer");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [farmName, setFarmName] = useState("");
  const [farmerContact, setFarmerContact] = useState("");
  const [farmAddress, setFarmAddress] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [user, getUser]: any = useContext(UserContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          firstname,
          lastname,
          confirmPassword,
          farmName,
          role,
          farmerContact,
          farmAddress,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        showToastSuccess("Account created successfully!");
        Cookies.set("token", data.token, { expires: 365 });
        getUser();
        router.push("/account");
      } else {
        showToastError(data.message);
      }
    } catch (err) {
      if (err instanceof Error) {
        showToastError(err.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-28 px-5 bg-gray-100">
      <div className="bg-white py-8 px-4 md:px-8 rounded-lg shadow-md w-full max-w-lg">
        <div>
          <h2 className="text-2xl font-bold text-center font-montserrat text-black">
            Register
          </h2>
          <h4 className="text-lg font-medium mb-6 text-opacity-60 text-center font-montserrat text-black">
            Create an Account
          </h4>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-2 lg:flex-row  gap-3 w-full">
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
                id="lastname"
                name="lastname"
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
              <h4 className="py-1">Are you a buyer or farmer?</h4>
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
          {role === "farmer" && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 font-montserrat">
                Farmer Contact / Your Phone Number *
              </label>
              <InputField
                id="phone"
                name="phone"
                type="text"
                autoComplete="phone"
                isRequired={true}
                value={farmerContact}
                onChange={(e) => setFarmerContact(e.target.value)}
              />
            </div>
          )}
          {role === "farmer" && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 font-montserrat">
                Farm Address / Your Address *
              </label>
              <InputField
                id="address"
                name="address"
                type="text"
                autoComplete="address"
                isRequired={true}
                value={farmAddress}
                onChange={(e) => setFarmAddress(e.target.value)}
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 font-montserrat">
              Password*
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
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 font-montserrat">
              Confirm Password*
            </label>
            <InputField
              id={"confirmPassword"}
              name={"confirmPassword"}
              type={"confirmPassword"}
              autoComplete="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {error && (
            <div className="flex items-center font-poppins text-sm py-2 text-red-500 gap-1">
              <InfoOutlinedIcon fontSize="inherit" />
              <p>{error}</p>
            </div>
          )}
          <Button
            buttonType="submit"
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
