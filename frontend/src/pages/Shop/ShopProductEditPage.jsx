import React from "react";
import EditProduct from "../../components/Shop/EditProduct";
import { useParams } from "react-router-dom";

const ShopProductEditPage = () => {
  const { id } = useParams();

  return (
    <div>
      <EditProduct id={id} />
    </div>
  );
};

export default ShopProductEditPage;
