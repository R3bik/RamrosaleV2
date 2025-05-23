import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import styles from "../styles/styles";
import Footer from "../components/Layout/Footer";
import ChatComponent from "../components/chatbot/ChatComponent";

const BestSellingPage = () => {
  const [data, setData] = useState([]);
  const { allProducts, isLoading } = useSelector((state) => state.products);

  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData?.sort(
      (a, b) => (b.ratings || 0) - (a.ratings || 0)
    );
    setData(sortedData);
  }, [allProducts]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="relative">
            <Header activeHeading={2} />
            <br />
            <br />
            <div className={`${styles.section}`}>
              <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
                {data &&
                  data.map((i, index) => <ProductCard data={i} key={index} />)}
              </div>
            </div>

            <Footer />
          </div>
          <div className="absolute bottom-0 right-0">
            <ChatComponent />
          </div>
        </div>
      )}
    </>
  );
};

export default BestSellingPage;
