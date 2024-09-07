import { Link } from "react-router-dom";
import { FaGlobe } from "react-icons/fa6";
import HomeImg from "../assets/home.png";


export const Home = () => {
  return (
    <div className="mx-auto w-full max-w-7xl">
      <aside className="relative overflow-hidden rounded-lg sm:mx-16 mx-2 sm:py-16">
        <div className="relative z-10 max-w-screen-xl px-4  pb-20 pt-10 sm:py-24 mx-auto sm:px-6 lg:px-8">
          <div className="max-w-xl sm:mt-1 mt-80 space-y-8 text-center sm:text-right sm:ml-auto">
            <h2 className="text-3xl font-bold sm:text-4xl">
              User Management System
              <span className="hidden sm:block text-4xl">Digital Salt</span>
            </h2>

            <Link
              className="inline-flex text-white items-center px-6 py-3 font-medium bg-orange-700 rounded-lg hover:opacity-75"
              to="http://digitalsalt.in/"
            >
              <FaGlobe />
              &nbsp; Visit now
            </Link>
          </div>
        </div>

        <div className="absolute inset-0 w-full sm:my-20 sm:pt-1 pt-12 h-full ">
          <img className="w-1/2" src={HomeImg} alt="image1" />
        </div>
      </aside>
    </div>
  );
};
