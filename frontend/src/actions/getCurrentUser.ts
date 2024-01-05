import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const useUser = () => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")!)
  );

  const handleRedirect = () => {
    window.location.assign("/login");
  };

  const Logout = () => {
    localStorage.removeItem("user");
    handleRedirect();
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("user")!);
    if (token) {
      const decodedToken = jwtDecode(token.user.token);

      if (decodedToken?.exp! * 1000 < new Date().getTime()) Logout();
    }
  }, [currentUser]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")!);

    if (storedUser && storedUser.user && storedUser.user.token) {
      const decodedToken = jwtDecode(storedUser.user.token);

      setCurrentUser({ ...decodedToken });
    }
  }, []);

  return { currentUser, handleRedirect, Logout };
};
