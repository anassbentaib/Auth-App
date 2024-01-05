import { useUser } from "../../actions/getCurrentUser";
import Navbar from "../Navbar/page";

const Home = () => {
  const { currentUser } = useUser();

  return (
    <div className="w-full relative mx-auto min-h-[100vh] h-[100vh] bg-black">
      <div className="">
        <Navbar currentUser={currentUser} />
      </div>
      {currentUser ? (
        <div className="flex items-center justify-center text-white mt-10 ">
          <div className="text-center">
            <h1 className="text-[25px]">Welcom {currentUser?.email}</h1>
            <p className="text-[17px]">This page is protected.</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center text-white mt-10 ">
          <div className="text-center">
            <h1 className="text-[25px]">This page is UnProtected.</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
