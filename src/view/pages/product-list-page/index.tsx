import axios from "axios";
import React, { useEffect, useState } from "react";
import {useNavigate } from 'react-router-dom'
const ProductListPage: React.FC = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  console.log("%c 👩‍👩‍👧‍👧: ProductListPage:React.FC -> products ", "font-size:16px;background-color:#7058b0;color:white;", products)
  
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate()

  const handleFetchData = async () => {
    try {
      // Make GET request to all categories
      const responseCategories = await axios.get(
        "https://5ffbed0e63ea2f0017bdb67d.mockapi.io/categories"
      );
      setCategories(responseCategories?.data ?? []);
      // Make GET request to all products
      const responseProducts = await axios.get(
        "https://5ffbed0e63ea2f0017bdb67d.mockapi.io/products?sortBy=createdAt&order=des"
      );
      const allProducts = responseProducts?.data
        .map((item: any) => {
          const category = responseCategories?.data.find(
            (itemCategory: any) => itemCategory?.id === item?.categoryId
          );
          if (item) {
            return { ...item, categoryName: category?.["name"] ?? "" };
          }
          return
        })
        .filter((x: any) => x);
      setProducts(allProducts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const handleDataSearch = async (searchText: string) => {
    const searchQuery = searchText.toLowerCase();
    if (searchQuery) {
      const searchResult = await axios.get(
        `https://5ffbed0e63ea2f0017bdb67d.mockapi.io/products?search=${searchQuery}`
      );

      const allSearchProducts = searchResult?.data
        .map((item: any) => {
          const category = categories.find(
            (itemCategory: any) => itemCategory?.id == item?.categoryId
          );
          if (item) {
            return { ...item, categoryName: category?.["name"] ?? "" };
          }
        })
        .filter((x: any) => x);
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
        `https://5ffbed0e63ea2f0017bdb67d.mockapi.io/products?categoryId=${event.target.value}`
      );
      const productCategories = searchResult?.data
        .filter((el: any) => el?.categoryId == event.target.value)
        .map((item: any) => {
          const categoryData = categories.find(
            (itemCategory: any) => itemCategory?.id == item?.categoryId
          );
          return { ...item, categoryName: categoryData?.["name"] };
        });
      setProducts(productCategories);
    } else {

      handleFetchData();
    }
  };
  const handleNavigation=(item:any)=>{
    navigate("/product", {
      state: {
        item,
      },
    })
  }
  return (
    <div>
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
            {categories.map((category: any) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap">
        {products.map((item: any) => {
          return (
            <div className="w-[25%] px-5 pb-0 pt-20" onClick={() => {handleNavigation(item)}} key={item?.id}>
              <div className="w-full aspect-square border border-2">
                <img
                  className="w-[100%] h-full object-cover"
                  src={
                    item?.image ?? ''
                  
                  }
                  alt={"product-images-details"+item?.id}
                />
              </div>
              <span>
                <b>Name</b> <p>{item?.name}</p>
              </span>
              <span>
                <b>Category</b>{" "}
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
    </div>
  );
};
export default ProductListPage;
