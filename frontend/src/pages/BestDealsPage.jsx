import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import styles from "../styles/styles";
import ChatComponent from "../components/chatbot/ChatComponent";

const BestDealsPage = () => {
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (allProducts) {
      const sortedData = [...allProducts].sort((a, b) => {
        const discountA =
          ((a.originalPrice - a.discountPrice) / a.originalPrice) * 100;
        const discountB =
          ((b.originalPrice - b.discountPrice) / b.originalPrice) * 100;
        return discountB - discountA;
      });
      setData(sortedData);
    }
  }, [allProducts]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="relative">
          <Header activeHeading={4} />
          <br />
          <br />
          <div className={`${styles.section}`}>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
              {data.length > 0 ? (
                data.map((product, index) => (
                  <ProductCard data={product} key={index} />
                ))
              ) : (
                <h1 className="text-center w-full pb-[100px] text-[20px]">
                  No best deals found!
                </h1>
              )}
            </div>
          </div>
          <Footer />
          <div className="absolute bottom-0 right-0">
            <ChatComponent />
          </div>
        </div>
      )}
    </>
  );
};

export default BestDealsPage;
