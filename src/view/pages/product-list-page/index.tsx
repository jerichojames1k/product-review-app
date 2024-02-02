import axios from "../../../api/axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ICategoriesProps, IProductProps } from "./types";
import { AxiosResponse } from "axios";
import Loading from "../../modal/loading";
const ProductListPage: React.FC = () => {
  const [categories, setCategories] = useState<ICategoriesProps[]>([]);
  const [products, setProducts] = useState<IProductProps[]>([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const handleFetchData = async () => {
    try {
      setLoading(true);
      //all categories
      const responseCategories = await axios.get<
        any,
        AxiosResponse<any, any>,
        any
      >("categories");
      setCategories(responseCategories?.data ?? []);
      //all products
      const responseProducts = await axios.get<
        any,
        AxiosResponse<any, any>,
        any
      >("products?sortBy=createdAt&order=desc");
      const allProducts = responseProducts?.data
        .map((item: IProductProps) => {
          const category = responseCategories?.data.find(
            (itemCategory: ICategoriesProps) =>
              itemCategory?.id === item?.categoryId
          );
          if (item) {
            return { ...item, categoryName: category?.["name"] ?? "" };
          }
          return null;
        })
        .filter((x: Object) => x);
      setProducts(allProducts);
      const timeoutId = setTimeout(() => {
        setLoading(false);
      }, 1000);

    
      return () => clearTimeout(timeoutId);
    } catch (error) {
      console.error("Error fetching data:", error);
      const timeoutId = setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  };

  const handleDataSearch = async (searchText: string) => {
    const searchQuery = searchText.toLowerCase();
    if (searchQuery) {
      const searchResult = await axios.get<any, AxiosResponse<any, any>, any>(
        `products?search=${searchQuery}`
      );

      const allSearchProducts = searchResult?.data
        .map((item: IProductProps) => {
          const category = categories.find(
            (itemCategory: ICategoriesProps) =>
              itemCategory?.id === item?.categoryId
          );
          if (item) {
            return { ...item, categoryName: category?.name ?? "" };
          }
          return null;
        })
        .filter((y: Object) => y);
      setProducts(allSearchProducts);
      return;
    } else {
      handleFetchData();
    }
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  // Event handler for when the category selection changes
  const handleCategoryChange = async (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedCategory(event.target.value);
    if (event.target.value) {
      const searchResult = await axios.get(
        `products?categoryId=${event.target.value}`
      );
      const productCategories = searchResult?.data
        .filter((el: IProductProps) => el?.categoryId === event.target.value)
        .map((item: ICategoriesProps) => {
          const categoryData = categories.find(
            (itemCategory: ICategoriesProps) =>
              itemCategory?.id === item?.categoryId
          );
          return { ...item, categoryName: categoryData?.["name"] };
        });
      setProducts(productCategories);
    } else {
      handleFetchData();
    }
  };
  const handleNavigation = (item: IProductProps) => {
    navigate("/product", {
      state: {
        item,
      },
    });
  };
  return (
    <div>
      {loading ? <Loading />:  <div>
        <div className="flex items-center justify-start bg-gray-100 py-2 px-4 pt-20">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleDataSearch(e.target.value);
            }}
          />
          <div className="px-4">
            <label htmlFor="category">Select a category:</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="border-2 rounded-md px-4 py-2"
            >
              <option value="">{"All Categories"}</option>
              {categories.map((category: ICategoriesProps) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap">
          {products.map((item: IProductProps) => {
            return (
              <div
                className="w-[25%] px-5 pb-0 pt-20"
                onClick={() => {
                  handleNavigation(item);
                }}
                key={item?.id}
              >
                <div className="w-full aspect-square border border-2">
                  <img
                    className="w-[100%] h-full object-cover"
                    src={item?.image ?? ""}
                    alt={"product-details-" + item?.id}
                  />
                </div>
                <span>
                  <b>Name</b> <p>{item?.name}</p>
                </span>
                <span>
                  <b>Categoryss</b>{" "}
                  <p>{item?.categoryName ? item?.categoryName : "N/A"}</p>
                </span>
                <span>
                  <b> Review count</b>
                  <p>{Object.keys(item?.reviews ?? []).length}</p>
                </span>
              </div>
            );
          })}
        </div>
      </div>}
    
    </div>
  );
};
export default ProductListPage;
