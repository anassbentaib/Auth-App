import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RiVerifiedBadgeLine } from "react-icons/ri";
import Button from "../Button/Button";

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState(false);
  const { id, token } = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `http://localhost:8080/auth/${id}/verify/${token}`;
        await axios.get(url);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [id, token]);

  return (
    <div className="relative w-full mx-auto  bg-[#242424] to-[#000] min-h-[100vh] ">
      <div className="">
        <div className="pt-20 text-center w-full mx-auto   max-w-[900px] lg:max-w-[730px] min-h-[80vh] md:max-w-[500px] sm:max-w-[100%] px-10">
          {validUrl ? (
            <div>
              <div className="flex justify-center ">
                <RiVerifiedBadgeLine fontSize="120px" color="green" />
              </div>
              <div>
                <p className="text-white text-[19px] mt-3 text-center">
                  Email verified successfully, Please Login...
                </p>
                <div className=" text-center w-full mx-auto   max-w-[900px] lg:max-w-[730px] min-h-[80vh] md:max-w-[500px] sm:max-w-[100%] px-10">
                  <div className="mt-3">
                    <Button
                      outline
                      label="Login"
                      small
                      onClick={() => window.location.assign("/login")}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-30">
              <p className="text-white text-[19px] mt-3 text-center">
                Not Verified, Please try again ...
              </p>
              <div className=" text-center w-full mx-auto   max-w-[900px] lg:max-w-[730px] min-h-[80vh] md:max-w-[500px] sm:max-w-[100%] px-10">
                <div className="mt-3">
                  <Button
                    outline
                    label="Login"
                    small
                    onClick={() => window.location.assign("/login")}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerify;
