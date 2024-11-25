import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import LoadingDataSpinner from "@/components/LoadingSpinner";
import { UserContext } from "../_app";
import Cookies from "js-cookie";
import { ObjectId } from "mongoose";
import AccountNavigation from "@/components/DASHBOARD/AccountNavigation";

interface Props {}

interface UserProfileProp {
  firstname: string;
  lastname: string;
  email: string;
  role: "farmer" | "buyer";
  profileImage?: string;
  farmName?: string;
  farmerContact?: string;
  farmAddress?: string;
  joinedDate: Date;
  farmDescription?: string;
  _id: ObjectId;
}

const AccountDetail: NextPage<Props> = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, getUser] = useContext(UserContext);
  const token = Cookies.get("token");
  const [profile, setProfile] = useState<UserProfileProp | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isProfileUpdating, setIsProfileUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isBioUpdating, setIsBioUpdating] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/account/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      const data = await response.json();
      if (response.ok) {
        setProfile(data.user);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async () => {
    setIsProfileUpdating(true);
    try {
      const response = await fetch("/api/account/update", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
          firstname: profile?.firstname,
          lastname: profile?.lastname,
          profileImage: profile?.profileImage,
          farmerContact: profile?.farmerContact,
          farmAddress: profile?.farmAddress,
          farmDescription: profile?.farmDescription,
        }),
      });
      if (response.ok) {
        const data = response.json();
        console.log(response);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsProfileUpdating(false);
      setIsEditingProfile(false);
    }
  };

  const handleBioChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (!profile) return;

    setProfile({
      ...profile,
      farmDescription: event.target.value,
    });
  };

  const handleBioSave = (e: React.MouseEvent<HTMLHeadingElement>) => {
    setIsBioUpdating(false);
    updateProfile();
  };

  const handleIsUpdatingProfileChange = () => {
    setIsEditingProfile((_) => !_);
  };

  const handleFirstnameChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!profile) return;
    setProfile({
      ...profile,
      firstname: event.target.value,
    });
  };

  const handleLastnameChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!profile) return;

    setProfile({
      ...profile,
      lastname: event.target.value,
    });
  };

  const handleFarmContactNumberChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    if (!profile) return;

    setProfile({
      ...profile,
      farmerContact: event.target.value,
    });
  };

  const handleFarmAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!profile) return;

    setProfile({
      ...profile,
      farmAddress: event.target.value,
    });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    updateProfile();
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row gap-10 py-36 md:px-36 px-10 sm:px-16 bg-white">
      <div className="">
        <AccountNavigation />
      </div>
      <div className="p-5 flex flex-col gap-10 h-auto rounded-md w-full shadow-md">
        <h4 className="font-montserrat text-2xl text-black font-semibold text-center">
          My Profile
        </h4>
        <div className="flex flex-col items-center gap-10">
          <Image
            height={100}
            width={100}
            alt=""
            src={profile?.profileImage || "/images/dummyProfile.svg"}
            className="rounded-full"
          />
          {profile?.role == "farmer" && (
            <div className="p-0 w-full flex justify-center">
              {isBioUpdating ? (
                <div className="relative w-full max-w-lg">
                  <textarea
                    className="w-full outline-none border border-[#eeeeee] text-black rounded-[4px] p-[12px] h-[106px] text-[14px] font-montserrat font-[500]"
                    value={profile?.farmDescription || ""}
                    onChange={handleBioChange}
                  />
                  <h4
                    onClick={handleBioSave}
                    className="absolute bottom-3 text-[14px] font-montserrat font-[500] text-darkGreen cursor-pointer right-3"
                  >
                    Save
                  </h4>
                </div>
              ) : (
                <h4 className="text-[14px] text-black flex gap-1 font-montserrat font-[500]">
                  {profile?.farmDescription ? (
                    profile.farmDescription
                  ) : (
                    <span>
                      Please update your farm Description so your details can be
                      displayed to customers
                    </span>
                  )}
                  <div
                    className="text-[#3A94F6] cursor-pointer"
                    onClick={() => setIsBioUpdating(true)}
                  >
                    here
                  </div>
                </h4>
              )}
            </div>
          )}
          <form
            className="flex flex-col gap-6"
            action={handleIsUpdatingProfileChange}
          >
            <div className="flex flex-wrap gap-6">
              <div className="flex flex-col gap-2 w-full sm:w-auto">
                <label
                  className="text-black text-[16px] font-[400] font-poppins"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  disabled={!isEditingProfile}
                  className={`${
                    !isEditingProfile
                      ? "text-opacity-50 bg-[#f5f5f5] opacity-50"
                      : "bg-white border border-[#eeeeee] "
                  } outline-none w-full sm:w-auto rounded-[4px] text-black text-[16px] font-poppins font-[400] py-[13px] px-[16px]`}
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={profile?.firstname}
                  onChange={handleFirstnameChange}
                />
              </div>
              <div className="flex flex-col gap-2 w-full sm:w-auto">
                <label
                  className="text-black text-[16px] font-[400] font-poppins"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  disabled={!isEditingProfile}
                  className={`${
                    !isEditingProfile
                      ? "text-opacity-50 bg-[#f5f5f5] opacity-50"
                      : "bg-white border border-[#eeeeee] "
                  } outline-none w-full sm:w-auto rounded-[4px] text-black text-[16px] font-poppins font-[400] py-[13px] px-[16px]`}
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={profile?.lastname}
                  onChange={handleLastnameChange}
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="flex flex-col gap-2 w-full sm:w-auto">
                <label
                  className="text-black text-[16px] font-[400] font-poppins"
                  htmlFor="phoneNumber"
                >
                  Phone Number
                </label>
                <input
                  disabled={!isEditingProfile}
                  className={`${
                    !isEditingProfile
                      ? "text-opacity-50 bg-[#f5f5f5] opacity-50"
                      : "bg-white border border-[#eeeeee]"
                  } outline-none w-full sm:w-auto text-black rounded-[4px] text-[16px] font-poppins font-[400] py-[13px] px-[16px]`}
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={profile?.farmerContact}
                  onChange={handleFarmContactNumberChange}
                />
              </div>
            </div>
            {profile?.role === "farmer" && (
              <div className="flex flex-col gap-2 w-full">
                <label
                  className="text-black text-[16px] font-[400] font-poppins"
                  htmlFor="address"
                >
                  Address
                </label>
                <input
                  disabled={!isEditingProfile}
                  className={`${
                    !isEditingProfile
                      ? "text-opacity-50 bg-[#f5f5f5] opacity-50"
                      : "bg-white border border-[#eeeeee"
                  } outline-none w-full rounded-[4px] text-[16px] text-black font-poppins font-[400] py-[13px] px-[16px]`}
                  type="text"
                  id="address"
                  name="address"
                  value={profile?.farmAddress}
                  onChange={handleFarmAddressChange}
                />
              </div>
            )}
            <div className="flex justify-end">
              {isEditingProfile ? (
                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleIsUpdatingProfileChange}
                    className="p-[16px_48px_16px_48px] text-black font-poppins w-full sm:w-auto font-[500] text-[16px] rounded-[4px]"
                  >
                    Cancel
                  </button>
                  <button
                    className="p-[16px_48px_16px_48px] text-[#FAFAFA] font-poppins w-full sm:w-auto font-[500] text-[16px] rounded-[4px] bg-darkGreen"
                    onClick={handleSubmit}
                  >
                    {isProfileUpdating ? <LoadingDataSpinner /> : "Update"}
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleIsUpdatingProfileChange}
                  type="button"
                  className="p-[16px_48px_16px_48px] text-[#FAFAFA] font-poppins font-[500] text-[16px] rounded-[4px] bg-darkGreen"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountDetail;
