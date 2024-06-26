import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import styles from "../../styles/styles";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart"; // Keeping original import

const Wishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };

  const addToCartHandler = (data) => {
    const newData = { ...data, qty: 1 };
    dispatch(addTocart(newData)); // Dispatching addTocart action with newData
    dispatch(removeFromWishlist(data));
    //setOpenWishlist(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-[80%] 800px:w-[25%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
        <div>
          <div className="flex w-full justify-end pt-5 pr-5">
            <RxCross1
              size={25}
              className="cursor-pointer text-black"
              onClick={() => setOpenWishlist(false)}
            />
          </div>
          <div className={`${styles.normalFlex} p-4 text-black`}>
            <AiOutlineHeart size={25} className="text-red-500" />
            <h5 className="pl-2 text-[20px] font-[500]">
              {wishlist && wishlist.length} items
            </h5>
          </div>
          <br />
          <div className="w-full border-t">
            {wishlist && wishlist.length === 0 ? (
              <div className="p-4">
                <h5>Wishlist Items is empty!</h5>
              </div>
            ) : (
              wishlist.map((item, index) => (
                <CartSingle
                  key={index}
                  data={item}
                  removeFromWishlistHandler={() =>
                    removeFromWishlistHandler(item)
                  }
                  addToCartHandler={() => addToCartHandler(item)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const CartSingle = ({ data, removeFromWishlistHandler, addToCartHandler }) => {
  const [value] = useState(1);
  const totalPrice = data.discountPrice * value;

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center relative">
        <RxCross1
          className="cursor-pointer text-black absolute left-2"
          size={20}
          onClick={() => removeFromWishlistHandler(data)}
        />
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDkk7MusHktX1NeXzr6J75RdLeJ8VUonNhR4CSh9y-Bw&s"
          alt=""
          className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
        />
        <div className="pl-[5px]">
          <h1 className="text-black">{data.name}</h1>
          <h4 className="font-[600] pt-3 text-[17px] text-[#d02222] font-Roboto">
            US${totalPrice.toFixed(2)} {/* Formatting price */}
          </h4>
        </div>
        <div>
          <BsCartPlus
            size={20}
            className="cursor-pointer text-black"
            title="Add to cart"
            onClick={() => addToCartHandler(data)}
          />
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
