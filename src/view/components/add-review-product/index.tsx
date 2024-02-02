import  { AxiosResponse }  from "axios";
import axios from '../../../api/axios'
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IDataReview } from "./types";
import { formValidation } from "../../../utils";
const ReviewProductPage: React.FC = () => {
  const location = useLocation();
  const { items } = location?.state ?? {};
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const mode = searchParams.get("mode");
  const reviewId = searchParams.get("id");
  const productID = searchParams.get("productId");
  const categoryId = searchParams.get("categoryId");
  const [error,setError]=useState<string>('')
  const [dataReview, setDataReview] = useState<IDataReview>({
    content: "",
    email: "",
    likes: 0,
    name: "",
    rating: "",
    title: "",
    verified: false,
  });


  const [errors, setErrors] = useState<IDataReview>({
    name: "",
    email: "",
    rating: "",
    content: "",
  });

  const handleDataChange = (key: string, value: string) => {
    setDataReview({ ...dataReview, [key]: value });
    setErrors({ ...errors, [key]: "" });
  };
  const handleSubmit = async () => {
    const requiredField = ["name", "email", "title", "content", "rating"];
    const errorData = formValidation(dataReview, requiredField);
    const isValid = Object.values(errorData ?? []).every(
      (item: string) => item === " " || item === undefined
    );
    setErrors({ ...errors, ...errorData });
    if (isValid) {
      try {
        if (mode === "update") {
          const insertReview = await axios.put<any, AxiosResponse<any, any>, IDataReview>(
            `categories/${categoryId}/products/${productID}/reviews/${reviewId}`,
            dataReview
          );
          if (Object.keys(insertReview?.data ?? []).length) {
            navigate(-1);
            return;
          }
        }
        if (mode === "insert") {
          const insertReview = await axios.post<any, AxiosResponse<any, any>, IDataReview>(
            `categories/${categoryId}/products/${productID}/reviews`,
            dataReview
          );
          if (Object.keys(insertReview?.data ?? []).length) {
            navigate(-1);
          }
        }
        setError('')
      } catch (error: any) {
        console.error("Error fetching data:", error?.message);
        setError(error?.message)
      }
    }
  };


  useEffect(() => {
    if (items?.id && Object.keys(items ?? []).length) {
      const number=items?.rating ? items?.rating.toString() : "";
      const rate: string = number
      ? parseInt(number?.charAt(0)) > 4 &&
        parseInt(number?.charAt(0)) <= 9
        ? "5"
        : number.charAt(0)
      : "";
   setDataReview({...items ,rating:(number ? rate  : "") });
    }
  }, [location?.state,items]);

  return (
    <div className="container mx-auto mt-8">
      <div className="max-w-md mx-auto bg-white p-8 rounded border-2 shadow-md">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-600 text-sm font-semibold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
            value={dataReview?.["name"] ?? ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleDataChange("name", e?.target?.value);
            }}
          />
          {errors?.["name"] && (
            <p className="text-red-600 text-base">{errors?.["name"]}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-600 text-sm font-semibold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
            value={dataReview?.["email"] ?? ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleDataChange("email", e?.target?.value);
            }}
          />
          {errors?.["email"] && (
            <p className="text-red-600 text-base">{errors?.["email"]}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-600 text-sm font-semibold mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
            value={dataReview?.["title"] ?? ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleDataChange("title", e?.target?.value);
            }}
          />
          {errors?.["title"] && (
            <p className="text-red-600 text-base">{errors?.["title"]}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-gray-600 text-sm font-semibold mb-2"
          >
            Content
          </label>
          <textarea
            id="content"
            name="content"
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
            value={dataReview?.["content"] ?? ""}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              handleDataChange("content", e?.target?.value);
            }}
          ></textarea>
          {errors?.["content"] && (
            <p className="text-red-600 text-base">{errors?.["content"]}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="rating"
            className="block text-gray-600 text-sm font-semibold mb-2"
          >
            Rating
          </label>
          <select
            id="rating"
            name="rating"
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
            value={dataReview?.["rating"] ?? ""}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              handleDataChange("rating", e?.target?.value);
            }}
          >
            <option value=""></option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          {errors?.["rating"] && (
            <p className="text-red-600 text-base">{errors?.["rating"]}</p>
          )}
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none"
            onClick={() => {
              handleSubmit();
            }}
          >
            Submit
          </button>
        </div>
      </div>
      {error && <div className="flex justify-center p-10 flex-row space-x-2"><p  className="text-2xl font-semibold">Error Message:</p> <p className="text-2xl"> {error ?? ''}</p></div>}
    </div>
  );
};
export default ReviewProductPage;
