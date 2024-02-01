import axios from '../../../api/axios'
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import { IILike, IProductProps, IReviewProps } from "./types";
import { AxiosResponse } from 'axios';
const moment = require("moment");

const ProductDetailsPage: React.FC = () => {
  const [product, setProduct] = useState<IProductProps>({});
  const [reviewsProducts, setReviewProducts] = useState<IReviewProps[]>([]);
  console.log("%c 🥜: ProductDetailsPage:React.FC -> reviewsProducts ", "font-size:16px;background-color:#b00d72;color:white;", reviewsProducts)
  const [countRating,setCountRating]=useState({1:0,2:0,3:0,4:0,5:0})
  console.log("%c 🧝‍♂️: ProductDetailsPage:React.FC -> countRating ", "font-size:16px;background-color:#43ac2c;color:white;", countRating)
  const location = useLocation();
  const navigate = useNavigate();
  const { item } = location?.state ?? {};
  const [liked, setLiked] = useState<IILike[]>([]);
  const totalRating = product?.reviews
    ?.map((item:IReviewProps) => {
      const number = item?.rating.toString() as string;
      return parseInt(number?.charAt(0));
    })
    .reduce((curr: number, acc: number) => curr + acc, 0);

  const handleProductReviews = async (id?: string, isLiked?: boolean) => {
    try {
      const result = await axios.get<any, AxiosResponse<any, any>, any>(
        `products/${id}/reviews?sortBy=likes&order=desc`
      );
      setReviewProducts(result?.data ?? []);
      if (!isLiked) {
        const reviews =
          Object.keys(result?.data ?? []).length &&
          result?.data.map((item:IReviewProps) => ({
            id: item?.id,
            liked: false,
            likes: item?.likes,
          }));
        setLiked(reviews);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLike = async (reviewId?: string) => {
    const productCurrentLikes= reviewsProducts.find(
      (el:IReviewProps) => el?.id == reviewId
    ) as IReviewProps;
    const status =
      Object.keys(liked ?? {}).length &&
      liked.find((el: IILike) => el?.id == reviewId);
    const totalLikes =
      status && !status?.["liked"]
        ? parseInt(productCurrentLikes?.likes) + 1
        : ((parseInt(productCurrentLikes?.likes) - 1) as number);

    const result = await axios.put(
      `products/${product?.id}/reviews/${reviewId}`,
      { likes: totalLikes }
    );

    handleProductReviews(product?.id ?? item?.id, true);
    setLiked((prevReviews:IILike[]) =>
      prevReviews.map((review:IILike) =>
        review.id === reviewId ? { ...review, liked: !review.liked } : review
      )
    );
    return result;
  };
  const handleDataReview = (data?:IReviewProps | string, mode?: string) => {
    const dataId=typeof data=='object' ? data?.id :undefined
    navigate(
      `/review?mode=${mode}&productId=${item?.id ?? product?.id}&id=${
        dataId ?? " "
      }&categoryId=${item?.categoryId ?? product?.categoryId}`,
      {
        state: {
          productId: item?.id ?? product?.id,
          categoryId: item?.categoryId ?? product?.categoryId,
          reviewId: dataId,
          items:data
        },
      }
    );
  };
  const handleCountRating=(reviews:IReviewProps[])=>{
    return reviews.reduce((countMap:any, review:IReviewProps) => {
      const number=review.rating ? review.rating.toString() : 0;
      const rating: number = number
      ? parseInt(number?.charAt(0)) > 4 &&
        parseInt(number?.charAt(0)) <= 9
        ? 5
        : parseInt(number.charAt(0))
      : 0;
      // Increment the count for the specific rating
      countMap[rating] = (countMap[rating] || 0) + 1;
  
      return countMap;
    }, {});
  }
  const handleViewAllRating=()=>{
    const ratingCounts = handleCountRating(reviewsProducts);
    console.log("%c ⏯️: handleViewAllRating -> ratingCounts ", "font-size:16px;background-color:#8b2767;color:white;", ratingCounts)
    setCountRating({...countRating,...ratingCounts})
  }

  useEffect(() => {
    setProduct({ ...item });
    handleProductReviews(item?.id, false);
  }, [location?.state]);
  return (
    <div className="">
      <div className="flex flex-wrap w-full justify-center">
        <div className="w-[25%] px-4 pb-0 pt-20">
          <span className="flex space-x-2">
            <b>Name:</b> <p>{product?.name}</p>
          </span>
          <div className="w-full aspect-square border border-2">
            <img
              className="w-[100%] h-full object-cover"
              src={product?.image ?? ''}
              alt={"product-list"}
            />
          </div>

          <span className="flex space-x-2">
            <b>Category:</b>{" "}
            <p>{product?.categoryName ? product?.categoryName : "N/A"}</p>
          </span>
          <span className="flex space-x-2">
            <b>Price:</b> <p>{product?.currency + " " + product?.price}</p>
          </span>
          <span className="flex space-x-2">
            <b>Details:</b> <p>{product?.details}</p>
          </span>
          <span className="flex space-x-2">
            <b onClick={handleViewAllRating}>Overall Rating</b>{" "}
            <p>
              {Object.keys(product?.reviews ?? []).length ? `${'('+totalRating+')'}` : ""}
            </p>
          </span>
          <span className="flex space-x-2">
            <b>Date Created:</b>{" "}
            <p>{moment(product?.createdAt).format("MM/DD/YY")}</p>
          </span>
          <div className="pt-2 pb-2 px">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                handleDataReview(" ", "insert");
              }}
            >
              Add Review
            </button>
          </div>
          <span className="flex space-x-2 pt-2">
            <b className='text-2xl'>Reviews</b>
          </span>
        </div>
      </div>
      <div className="flex flex-wrap px-5 space-y-2 space-x-2">
        {!!Object.keys(reviewsProducts ?? []).length &&
          reviewsProducts.map((item:IReviewProps) => {
            const isLike =
              Object.keys(liked ?? {}).length &&
              liked.find((el: IILike) => el?.id == item?.id);
            const number = item?.rating.toString() as string;
            const rate: string = number
              ? parseInt(number?.charAt(0)) > 4 &&
                parseInt(number?.charAt(0)) <= 9
                ? "5"
                : number.charAt(0)
              : "";
            return (
              <div
                className="w-[25%] px-5 border-2 pb-0 pt-4 py-4"
                key={item?.id}
              >
                <span className="flex space-x-2 w-100">
                  <b>AuthorName:</b> <p>{item?.name}</p>
                </span>
                <span className="flex space-x-2">
                  <b>AuthorAvatar:</b>{" "}
                  <div className="aspect-w-1 aspect-h-1 rounded-full bg-gray-300">
                    <img
                      className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                      src={item?.avatar ?? ''}
                      alt={"author-"+item?.id}
                    />
                  </div>
                </span>
                <span className="flex space-x-2">
                  <b>AuthorEmail:</b> <p className='break'>{item?.email ?? ""}</p>
                </span>
                <span className="flex space-x-2">
                  <b>Title:</b> <p>{item?.title ?? ""}</p>
                </span>
                <span className="flex space-x-2">
                  <b>Content:</b> <p>{item?.content ?? ""}</p>
                </span>
                <span className="flex space-x-2">
                  <b>Rating:</b> <p>{rate}</p>
                </span>
                <span className="flex space-x-2">
                  <b>Badge:</b>{" "}
                  <p>
                    {item?.verified.toString() == "true" ? "true" : "false"}
                  </p>
                </span>
                <span className="flex space-x-2">
                  <b>Likes:</b> <p>{item?.likes ?? ""}</p>
                </span>
                <button
                  onClick={() => {
                    handleLike(item?.id);
                  }}
                  className={`flex items-center space-x-1 px-2 py-1 bg-gray-200 rounded-full ${
                    isLike && isLike?.["liked"]
                      ? "text-blue-500"
                      : "text-gray-500"
                  } hover:bg-gray-300 focus:outline-none`}
                >
                  <AiOutlineLike />
                  <span>{isLike && isLike?.["liked"] ? "Liked" : "Like"}</span>
                </button>
                <div className="pt-4">
                  <button
                    className="bg-blue-500 text-white py-1 px-7 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                    type="button"
                    onClick={() => {
                      handleDataReview(item, "update");
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default ProductDetailsPage;
