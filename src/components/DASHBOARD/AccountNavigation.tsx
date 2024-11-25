import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { UserContext } from "@/pages/_app";

interface Props {}

const AccountNavigation: NextPage<Props> = ({}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, getUser]: any = useContext(UserContext);

  useEffect(() => {
    if (!user || !user.role) {
      return;
    }
  }, [user]);

  const role = user ? user.role : null;

  const [accountNavigationItems, setAccountNavigationItems] = useState(
    role === "farmer"
      ? [
          {
            label: "My Profile",
            url: `/account/me`,
          },
          {
            label: "My Products",
            url: `/account`,
          },
        ]
      : [
          {
            label: "My Profile",
            url: `/account/me`,
          },
          {
            label: "Liked Products",
            url: "/account",
          },
        ]
  );
  return (
    <div className="flex flex-col py-[20px] gap-[16px] ">
      {accountNavigationItems.map((accountNavigationItem, index) => (
        <Link
          className={` ${
            pathname == accountNavigationItem.url
              ? "text-darkGreen"
              : "text-black opacity-50 font-light"
          } whitespace-nowrap hover:text-orange hover:opacity-90 font-[400] font-poppins text-[16px]`}
          href={accountNavigationItem.url}
          key={index}
        >
          {accountNavigationItem.label}
        </Link>
      ))}
    </div>
  );
};

export default AccountNavigation;
