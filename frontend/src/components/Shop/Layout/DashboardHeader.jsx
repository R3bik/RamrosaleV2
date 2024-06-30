import React from "react";
import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";

const DashboardHeader = () => {
  const { seller } = useSelector((state) => state.seller);
  return (
    <div className="font-Roboto">
      <div className="bg-primary-black text-white h-[80px] flex items-center justify-between px-4">
        <div className="ml-11 mb-2 flex items-center">
          <Link to="/">
            <h3 className="text-2xl font-bold">
              Ramro<span className="text-[#76ABAE]">Sale</span>
            </h3>
          </Link>
        </div>
        <div className="flex items-center">
          <div className="flex items-center mr-4">
            <Link to="/dashboard/cupouns" className="800px:block hidden">
              <AiOutlineGift
                color="white"
                size={30}
                className="mx-5 cursor-pointer"
              />
            </Link>
            <Link to="/dashboard-events" className="800px:block hidden">
              <MdOutlineLocalOffer
                color="white"
                size={30}
                className="mx-5 cursor-pointer"
              />
            </Link>
            <Link to="/dashboard-products" className="800px:block hidden">
              <FiShoppingBag
                color="white"
                size={30}
                className="mx-5 cursor-pointer"
              />
            </Link>
            <Link to="/dashboard-orders" className="800px:block hidden">
              <FiPackage
                color="white"
                size={30}
                className="mx-5 cursor-pointer"
              />
            </Link>
            <Link to="/dashboard-messages" className="800px:block hidden">
              <BiMessageSquareDetail
                color="white"
                size={30}
                className="mx-5 cursor-pointer"
              />
            </Link>
            <Link to={`/shop/${seller._id}`}>
              <img
                src={`${seller.avatar?.url}`}
                alt=""
                className="w-[50px] h-[50px] rounded-full object-cover"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
