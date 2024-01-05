import React, { useCallback, useState } from "react";
import Avatar from "./avatar";
import MenuItem from "./MenuItem";
import { MdOpenInNew } from "react-icons/md";
import Button from "../Button/Button";

interface CurrentUser {
  id: string;
  email: string;
}
interface UserMenuProps {
  currentUser?: CurrentUser | null;
}
const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  const handleRedirect = () => {
    window.location.assign("/login");
  };

  const Logout = () => {
    localStorage.removeItem("user");
    handleRedirect();
  };

  return (
    <div className="relative">
      {currentUser ? (
        <div>
          <div className="flex flex-row items-center gap-5">
            <div className="hidden md:block text-sm font-semibold rounded-full  transition  cursor-pointer">
              {currentUser?.email}
            </div>
            <div
              onClick={toggleOpen}
              className="p-4 md:py-1 md:px-2 flex  flex-rowitems-center  gap-1 cursor-pointer  hover:shadow-md  transition "
            >
              <div className="flex rounded-full  border-black  border-[3px]">
                <Avatar />
              </div>
            </div>
          </div>
          {isOpen && (
            <div className="z-10 absolute  rounded-[5px] shadow-md w-[60vw]  md:w-3/4   bg-[#242424]  overflow-hidden   right-0   top-12   text-sm">
              <div className="flex flex-col cursor-pointer ">
                <MenuItem
                  label="Account"
                  onClick={() => window.location.assign("/")}
                  icon={MdOpenInNew}
                />

                <MenuItem
                  label="Profile"
                  onClick={() => window.location.assign("/")}
                  icon={MdOpenInNew}
                />
                <MenuItem label="Logout" onClick={Logout} icon={MdOpenInNew} />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center min-w-[300px]">
          <div className="w-full mr-3">
            <Button label="Signup" onClick={Logout} small />
          </div>
          <div className="w-full">
            <Button label="Login" outline onClick={Logout} small />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
