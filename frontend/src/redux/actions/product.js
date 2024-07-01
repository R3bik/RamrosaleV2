import axios from "axios";
import { server } from "../../server";

// create product
export const createProduct =
  (
    name,
    description,
    category,
    tags,
    originalPrice,
    discountPrice,
    stock,
    shopId,
    images
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "productCreateRequest",
      });

      const { data } = await axios.post(
        `${server}/product/create-product`,
        name,
        description,
        category,
        tags,
        originalPrice,
        discountPrice,
        stock,
        shopId,
        images
      );
      dispatch({
        type: "productCreateSuccess",
        payload: data.product,
      });
    } catch (error) {
      dispatch({
        type: "productCreateFail",
        payload: error.response.data.message,
      });
    }
  };

export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsShopRequest",
    });

    const { data } = await axios.get(
      `${server}/product/get-all-products-shop/${id}`
    );

    dispatch({
      type: "getAllProductsShopSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsShopFailed",
      payload: error.response.data.message,
    });
  }
};

export const deleteProduct = (id, callback) => async (dispatch) => {
  try {
    dispatch({ type: "deleteProductRequest" });

    const { data } = await axios.delete(
      `${server}/product/delete-shop-product/${id}`,
      { withCredentials: true }
    );

    dispatch({ type: "deleteProductSuccess", payload: data.message });

    if (callback) callback(); // Execute callback after successful deletion
  } catch (error) {
    console.error(
      "Delete product error:",
      error.response?.data?.message || error.message
    );
    dispatch({
      type: "deleteProductFailed",
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsRequest",
    });

    const { data } = await axios.get(`${server}/product/get-all-products`);

    dispatch({
      type: "getAllProductsSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsFailed",
      payload: error.response.data.message,
    });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getProductDetailsRequest",
    });

    const { data } = await axios.get(`${server}/product/${id}`);

    dispatch({
      type: "getProductDetailsSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "getProductDetailsFailed",
      payload: error.response.data.message,
    });
  }
};

export const updateProduct =
  (id, productData, callback) => async (dispatch) => {
    try {
      dispatch({
        type: "updateProductRequest",
      });

      const { data } = await axios.put(`${server}/product/${id}`, productData);

      dispatch({
        type: "updateProductSuccess",
        payload: data.product,
      });

      if (callback) callback(true); // Execute callback with success
    } catch (error) {
      dispatch({
        type: "updateProductFailed",
        payload: error.response.data.message,
      });

      if (callback) callback(false); // Execute callback with failure
    }
  };
