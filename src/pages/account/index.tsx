import { useLogout } from "@/hooks/useLogout";
import { NextPage } from "next";
import Image from "next/image";
import { useContext, useState } from "react";
import { UserContext } from "../_app";

interface Props {}

const Index: NextPage<Props> = ({}) => {
  const [isBioUpdating, setIsBioUpdating] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [user, getUser] = useContext(UserContext);
  const Logout = useLogout();
  console.log(user);

  const handleIsUpdatingProfileChange = () => {};
  return (
    <div className="p-[98px] sm:p-[14px] md:p-[25px] gap-[70px] sm:gap-0 md:gap-0 flex">
      {/* <div className="sm:hidden md:hidden">
        <AccountNavigation />
      </div> */}
      <div className=" p-[20px] flex flex-col gap-[40px] h-[1096px] rounded-[4px] w-full shadow-[0px_1px_13px_0px_#0000000D] ">
        <h4 className="font-montserrat text-[24px] font-[600] text-center">
          My Profile
        </h4>
        <div className="flex flex-col items-center gap-[40px] ">
          <Image
            height={100}
            width={100}
            alt=""
            src={"/images/dummyProfile.svg"}
            className="rounded-full"
          />
          <h4 onClick={Logout}>Logout</h4>
          <h4>{JSON.stringify(user)}</h4>
          {/* <div className=" p-[0px_120px_0px_120px] w-full flex justify-center sm:p-0 md:p-0 ">
            {isBioUpdating ? (
              <div className="relative w-[590px] sm:w-full md:w-[330px] lg:w-[330px] ">
                <textarea
                  className="w-full outline-none border border-[#eeeeee] rounded-[4px] p-[12px] h-[106px] text-[14px] font-montserrat font-[500] "
                  value={profile?.bio || ""}
                  onChange={handleBioChange}
                />
                <h4
                  onClick={handleBioSave}
                  className="absolute bottom-3 text-[14px] font-montserrat font-[500] text-orange cursor-pointer right-3"
                >
                  Save
                </h4>
              </div>
            ) : (
              <h4 className="text-[14px] flex gap-1 font-montserrat font-[500] ">
                {profile?.bio ? (
                  profile.bio
                ) : (
                  <h4 className=" ">
                    Please update your bio so your details about you can be
                    displayed
                  </h4>
                )}
                <div
                  className="text-[#3A94F6] cursor-pointer "
                  onClick={() => setIsBioUpdating(true)}
                >
                  here
                </div>
              </h4>
            )}
          </div> */}
          {/* <form
            className="flex flex-col gap-[24px] "
            action={handleIsUpdatingProfileChange}
          >
            <div className="flex gap-[50px] sm:flex-col md:flex-col lg:flex-col ">
              <div className="flex flex-col gap-[8px] ">
                <label
                  className=" text-black text-[16px] font-[400] font-poppins "
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  disabled={!isEditingProfile}
                  className={` ${
                    !isEditingProfile
                      ? "text-opacity-50 bg-[#f5f5f5] opacity-50 "
                      : "bg-white border border-[#eeeeee] text-black"
                  } outline-none w-[330px] sm:w-full md:w-full rounded-[4px] text-[16px] font-poppins font-[400] py-[13px] px-[16px] `}
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={profile?.user.first_name}
                  onChange={handleFirstnameChange}
                />
              </div>
              <div className="flex flex-col gap-[8px] ">
                <label
                  className=" text-black text-[16px] font-[400] font-poppins "
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  disabled={!isEditingProfile}
                  className={` ${
                    !isEditingProfile
                      ? "text-opacity-50 bg-[#f5f5f5] opacity-50 "
                      : "bg-white border border-[#eeeeee] text-black"
                  } outline-none w-[330px] sm:w-full md:w-full rounded-[4px] text-[16px] font-poppins font-[400] py-[13px] px-[16px] `}
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={profile?.user.last_name}
                  onChange={handleLastnameChange}
                />
              </div>
            </div>
            <div className="flex gap-[50px] sm:flex-col md:flex-col lg:flex-col ">
              <div className="flex flex-col gap-[8px] ">
                <label
                  className=" text-black text-[16px] font-[400] font-poppins "
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  disabled={!isEditingProfile}
                  className={` ${
                    !isEditingProfile
                      ? "text-opacity-50 bg-[#f5f5f5] opacity-50 "
                      : "bg-white border border-[#eeeeee] text-black"
                  } outline-none w-[330px] sm:w-full md:w-full rounded-[4px] text-[16px] font-poppins font-[400] py-[13px] px-[16px] `}
                  type="email"
                  id="email"
                  name="email"
                  value={profile?.user.email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="flex flex-col gap-[8px] ">
                <label
                  className=" text-black text-[16px] font-[400] font-poppins "
                  htmlFor="phoneNumber"
                >
                  Phone Number
                </label>
                <input
                  disabled={!isEditingProfile}
                  className={` ${
                    !isEditingProfile
                      ? "text-opacity-50 bg-[#f5f5f5] opacity-50 "
                      : "bg-white border border-[#eeeeee] text-black"
                  } outline-none w-[330px] sm:w-full md:w-full rounded-[4px] text-[16px] font-poppins font-[400] py-[13px] px-[16px] `}
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={profile?.phone_number}
                  onChange={handlePhoneNumberChange}
                />
              </div>
            </div>
            <div className="flex flex-col gap-[8px] ">
              <label
                className=" text-black text-[16px] font-[400] font-poppins "
                htmlFor="address"
              >
                Address
              </label>
              <input
                disabled={!isEditingProfile}
                className={` ${
                  !isEditingProfile
                    ? "text-opacity-50 bg-[#f5f5f5] opacity-50 "
                    : "bg-white border border-[#eeeeee] text-black"
                } outline-none w-[330px] sm:w-full md:w-full rounded-[4px] text-[16px] font-poppins font-[400] py-[13px] px-[16px] `}
                type="text"
                id="address"
                name="address"
                value={profile?.address_location}
                onChange={handleAddressChange}
              />
            </div>
            <div className="flex justify-end">
              {isEditingProfile ? (
                <div className="flex sm:flex-col sm:w-full gap-2">
                  <button
                    type="button"
                    onClick={handleIsUpdatingProfileChange}
                    className="p-[16px_48px_16px_48px] text-black font-poppins sm:w-full font-[500] text-[16px] rounded-[4px]"
                  >
                    Cancel
                  </button>
                  <button
                    className="p-[16px_48px_16px_48px] text-[#FAFAFA] font-poppins sm:w-full font-[500] text-[16px] rounded-[4px] bg-orange"
                    onClick={handleSubmit}
                  >
                    {isProfileUpadating ? (
                      <LoadingDataSpinner spinnerHeight="h-5" color="#ffffff" />
                    ) : (
                      "Update"
                    )}
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleIsUpdatingProfileChange}
                  type="button"
                  className="p-[16px_48px_16px_48px] text-[#FAFAFA] font-poppins font-[500] text-[16px] rounded-[4px] bg-orange"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </form> */}
        </div>
      </div>
    </div>
  );
};

export default Index;
