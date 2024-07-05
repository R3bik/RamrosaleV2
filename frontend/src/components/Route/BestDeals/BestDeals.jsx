import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";

const BestDeals = () => {
  const [data, setData] = useState([]);
  const allProducts = useSelector((state) => state.products.allProducts);

  useEffect(() => {
    if (allProducts) {
      const sortedData = [...allProducts].sort((a, b) => {
        const discountA =
          ((a.originalPrice - a.discountPrice) / a.originalPrice) * 100;
        const discountB =
          ((b.originalPrice - b.discountPrice) / b.originalPrice) * 100;
        return discountB - discountA;
      });
      setData(sortedData.slice(0, 5));
    }
  }, [allProducts]);

  return (
    <div className={styles.section}>
      <div className={styles.heading}>
        <h1>Best Deals</h1>
      </div>
      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
        {data.length > 0 ? (
          data.map((product, index) => (
            <ProductCard data={product} key={index} />
          ))
        ) : (
          <p>No best deals available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default BestDeals;
