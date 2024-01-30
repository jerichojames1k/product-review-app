import axios from "axios";
//import axios from '../../api/axios'
import React, { useEffect, useState } from "react";

const ProductListPage: React.FC = () => {
  const [categories, setCategories] = useState([]);
  console.log("%c 🔎: ProductListPage:React.FC -> categories ", "font-size:16px;background-color:#c375cb;color:white;", categories)
  const [data, setData] = useState([]);
  const handleFetchData = async () => {
    try {
      // Make GET request to the API endpoint
      const response = await axios.get(
        "https://5ffbed0e63ea2f0017bdb67d.mockapi.io/categories?sortBy=createdAt&order=desc"
      );
      console.log("%c 💰: handleFetchData ->  response?.data ", "font-size:16px;background-color:#b0848f;color:white;",  response?.data);
      const products = response?.data.flatMap(
        (category: { products: Object }) => category.products
      );

      // const allProducts = products.flatMap((category: Object) => category);
      setCategories(products);
      setData(products);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Define your search function
function search(query:string) {
    // Filter the array based on the query
    return data.filter((item:any)=> {
        // Check if the name property of the object contains the query
        if (item.name && item.name.toLowerCase().includes(query.toLowerCase())) {
            return true;
        }
        // Check if the name property inside the category key object contains the query
        if (item.category && item.category.name && item.category.name.toLowerCase().includes(query.toLowerCase())) {
            return true;
        }
        // If neither condition is met, return false
        return false;
    });
}
  const handleDataSearch = (searchText: string) => {
    const searchQuery = searchText.toLowerCase() ;
    // const filteredData = data.filter((item: any) =>
    //   item.name.toLowerCase().includes(searchQuery)
    // );
    // setCategories(filteredData);
    const searchResult = search(searchQuery);
    console.log("%c 🦅: handleDataSearch -> searchResult ", "font-size:16px;background-color:#5f80b0;color:white;", searchResult)
    setCategories(searchResult);
    return;
  };

  useEffect(() => {
    handleFetchData();
  }, []);
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
      </div>
      <div className="flex flex-wrap">
        {categories.map((item: any) => {
          return (
            <div className="w-[25%] px-5 pb-0 pt-20" onClick={()=>{}}>
              <div className="w-full aspect-square border border-2">
                <img
                  className="w-[100%] h-full object-cover"
                  src={
                    item?.image ??
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG58OcMgzuh978O8Scphw_v8Gu7NhyLKW22Q&usqp=CAU"
                  }
                  alt="product-image"
                />
              </div>
              <span>
                <b>Name</b> <p>{item?.name}</p>
              </span>
              <span>
                <b>Category</b> <p>{item?.category?.name ?? "N/A"}</p>
              </span>
              <span>
                <b> Review count</b> <p>{0}</p>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ProductListPage;
