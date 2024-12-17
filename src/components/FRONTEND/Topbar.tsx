import { NextPage } from "next";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "./Button";
import { UserContext } from "@/pages/_app";
import PermIdentityRoundedIcon from "@mui/icons-material/PermIdentityRounded";
import { useLogout } from "@/hooks/useLogout";
import FavoriteIcon from '@mui/icons-material/FavoriteOutlined';
import { useLikedProducts } from '@/context/LikedProducts';

interface Props {}

const MainMenu: any = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Products",
    url: "/products",
  },
];

const Topbar: NextPage<Props> = ({}) => {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [user] = useContext(UserContext);
  const logout = useLogout();
  const { likedItems } = useLikedProducts();

  useEffect(() => {
    const handleScroll = () => {
      // Get the current scroll position
      const scrollPosition = window.scrollY + 96;
      // Check if the scroll position has passed 100vh
      const threshold = window.innerHeight; // 100vh
      setScrolled(scrollPosition > threshold);
    };

    // Attach the event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed bg-white flex flex-wrap justify-between items-center z-50 bg-ligh md:px-36 px-10 sm:px-16 py-5 min-h-24 ${
        scrolled ? "bg-opacity-100" : "bg-opacity-100"
      } backdrop-blur-md w-full`}
    >
      <Link href={"/"} className="flex gap-2 items-center">
        {/* <Image
          src={"logo.svg"}
          className="fill-white"
          height={50}
          width={50}
          alt="Agriqq"
        /> */}
        <h4
          className={`text-3xl ${
            scrolled || pathname !== "/" ? "text-darkGreen" : "text-darkGreen"
          } font-autowide font-black`}
        >
          AGRIQQ
        </h4>
      </Link>
      {/* navbar toggler */}
      <button
        id="show-button"
        className="order-2 flex lg:hidden cursor-pointer items-center lg:order-1"
        onClick={() => setNavOpen(!navOpen)}
      >
        {navOpen ? (
          <svg className="h-6 fill-black" viewBox="0 0 20 20">
            <title>Menu Open</title>
            <polygon
              points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
              transform="rotate(45 10 10)"
            />
          </svg>
        ) : (
          <svg className="h-6 fill-black" viewBox="0 0 20 20">
            <title>Menu Close</title>
            <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z" />
          </svg>
        )}
      </button>
      {user && (
        <Link className="lg:hidden" href={"/account"} rel="">
          <PermIdentityRoundedIcon className="text-black cursor-pointer" />
        </Link>
      )}

      {/* Menu */}
      <div
        className={`order-3 lg:order-1 w-full lg:max-h-min transition-all duration-500 overflow-hidden lg:w-auto ${
          navOpen ? "max-h-[1000px]" : "max-h-0"
        }`}
      >
        <ul className="text-center flex flex-col gap-3 mt-3 py-2 lg:flex-row">
          {MainMenu.map((menu: any, i: any) => (
            <div key={`menu-${i}`}>
              {menu.hasChildren ? (
                <li className="group relative">
                  <span className="nav-link inline-flex items-center">
                    {menu.name}
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </span>
                  <ul className=" lg:hidden group-hover:block invisible absolute block opacity-0 lg:group-hover:visible lg:group-hover:opacity-100">
                    {menu.children.map((child: any, i: any) => (
                      <li className="" key={`children-${i}`}>
                        <Link href={child.url} className=" font-poppins block">
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li className="nav-item flex justify-center">
                  <Link
                    href={menu.url}
                    onClick={() => setNavOpen(false)}
                    className={` font-poppins text-black link-underline link-underline-black max-w-max block lg:mx-3 mx-0 ${
                      pathname === menu.url ? "text-black" : ""
                    }`}
                  >
                    {menu.name}
                  </Link>
                </li>
              )}
            </div>
          ))}
          {!user && (
            <li className="lg:hidden block">
              <Link
                className="btn btn-primary z-0 py-[14px]"
                href={"/login"}
                rel=""
              >
                <Button
                  type="fill"
                  className="text-white font-poppins font-medium"
                  text="Get Started"
                />
              </Link>
            </li>
          )}

          {user && (
            <div
              className="btn btn-primary z-0 lg:hidden block py-[14px] ml-4"
              onClick={logout}
            >
              <Button
                type="fill"
                className="text-white font-poppins font-medium"
                text="Logout"
              />
            </div>
          )}

          {/* Mobile Basket Link */}
          <li className="lg:hidden flex justify-center">
            <Link 
              href="/basket" 
              className="relative flex items-center gap-2 text-darkGreen"
              onClick={() => setNavOpen(false)}
            >
              <FavoriteIcon />
              <span>Liked Items</span>
              {likedItems.length > 0 && (
                <span className="bg-darkGreen text-white text-xs px-2 py-0.5 rounded-full">
                  {likedItems.length}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </div>
      <div className="order-1 ml-auto hidden min-w-[200px] items-center justify-center lg:order-2 lg:ml-0 lg:flex gap-4">
        {/* Basket Link */}
        <Link href="/basket" className="relative group">
          <div className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
            <FavoriteIcon className="text-darkGreen" />
            {likedItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-darkGreen text-white text-xs w-5 h-5 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                {likedItems.length}
              </span>
            )}
          </div>
        </Link>

        {user ? (
          <Link
            className="btn btn-primary z-0 py-[14px]"
            href={"/account"}
            rel=""
          >
            <PermIdentityRoundedIcon className="text-black cursor-pointer" />
          </Link>
        ) : (
          <Link
            className="btn btn-primary z-0 py-[14px]"
            href={"/login"}
            rel=""
          >
            <Button
              type="fill"
              className="text-white font-poppins font-medium"
              text="Get Started"
            />
          </Link>
        )}
        {user && (
          <div className="btn btn-primary z-0 py-[14px] ml-4" onClick={logout}>
            <Button
              type="fill"
              className="text-white font-poppins font-medium"
              text="Logout"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
