import UserMenu from "../Menu/UserMenu";

import { logo } from "../../assets";
import { Image, Link } from "@chakra-ui/react";
import React from "react";
interface CurrentUser {
  id: string;
  email: string;
}
interface NavbarProps {
  currentUser?: CurrentUser | null;
}
const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className="flex items-center w-full h-[80px] jusity-center text-white">
      <div className="flex items-center justify-between w-full ">
        <div className="ml-5">
          <Link href="/">
            <Image src={logo} w="70px" h="70px" />
          </Link>
        </div>

        <div
          className={` items-center hidden sm:hidden md:hidden xl:flex 2xl:flex`}
        >
          <UserMenu currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
