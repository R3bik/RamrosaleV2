import React from "react";
// import { AiOutlineGift } from "react-icons/ai";
// import { BiMessageSquareDetail } from "react-icons/bi";
import { FiShoppingBag } from "react-icons/fi";
// import { MdOutlineLocalOffer } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logo } from "../../routes/Routes";
import { BsHandbag } from "react-icons/bs";
import { HiOutlineUserGroup, HiUsers } from "react-icons/hi";

const AdminHeader = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="w-full h-[80px] bg-primary-black text-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link to="/">
          <div className="flex justify-between items-center">
            <img src={logo} alt="logo" height={40} width={40} />
            <h3 className="text-2xl font-bold">
              Ramro<span className="text-[#76ABAE]">Sale</span>
            </h3>
          </div>
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Link to="/admin-orders" className="800px:block hidden">
            <FiShoppingBag
              color="white"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/admin-sellers" className="800px:block hidden">
            <HiUsers color="white" size={30} className="mx-5 cursor-pointer" />
          </Link>
          <Link to="/admin-products" className="800px:block hidden">
            <BsHandbag
              color="white"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          {/* <Link to="/dashboard-orders" className="800px:block hidden">
            <FiPackage
              color="white"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link> */}
          <Link to="/admin-users" className="800px:block hidden">
            <HiOutlineUserGroup
              color="white"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <img
            src={`${user?.avatar?.url}`}
            alt=""
            className="w-[50px] h-[50px] rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
