import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";

const Hero = () => {
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
      style={{
        backgroundImage:
          "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
      }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}
        >
          Transforming shopping
          <br /> into an experience
        </h1>
        <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
          Welcome to RamroSale, where we believe in transforming shopping into
          an experience. Dive into a<br /> world where every click brings you
          closer to discovering unique products curated just for you. Our
          <br /> platform combines convenience with curated collections,
          ensuring that your shopping journey is not
          <br /> just effortless but memorable. Whether you're searching for
          fashion must-haves, home essentials,
          <br /> or tech innovations, RamroSale is your gateway to a seamless
          online shopping experience. Start
          <br /> exploring today and let us redefine how you shop.
        </p>
        <Link to="/products" className="inline-block">
          <div className={`${styles.button} mt-5`}>
            <span className="text-[#fff] font-[Poppins] text-[18px]">
              Shop Now
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
