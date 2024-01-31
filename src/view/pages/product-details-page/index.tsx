import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
const moment = require("moment");
interface IILike{
  id:string
  liked:boolean
}
const ProductDetailsPage: React.FC = () => {
  const [product, setProduct] = useState<any>({});
  const [reviewsProducts, setReviewProducts] = useState<any>({});
  const location = useLocation();
  const [liked, setLiked] = useState<IILike[]>([]);
  const totalRating = product?.reviews
    ?.map((item: any) => {
      const number = item?.rating.toString() as string;
      return parseInt(number?.charAt(0));
    })
    .reduce((curr: any, acc: any) => curr + acc, 0);

  const handleProductReviews = async (id: string) => {
    const result = await axios.get(
      `https://5ffbed0e63ea2f0017bdb67d.mockapi.io/products/${id}/reviews?sortBy=rating&order=des`
    );
    setReviewProducts(result?.data ?? []);
    const reviews =
      Object.keys(result?.data ?? []).length &&
      result?.data.map((item: any) => ({ id: item?.id, liked: false }));
    setLiked(reviews);
  };



  const handleLike = (reviewId?: string,isChecked?:boolean) => {
    setLiked((prevReviews: any) =>
    prevReviews.map((review:any) =>
      review.id === reviewId ? { ...review, liked: !review.liked } : review
    )
  );
  const status=Object.keys(liked ?? {}).length && liked.find((el:IILike)=>el?.id==reviewId) 
  console.log("%c ✳️: handleLike -> status ", "font-size:16px;background-color:#c78596;color:white;", status)
  };
  useEffect(() => {
    const { item } = location?.state ?? {};
    console.log(
      "%c 🏐: ProductDetailsPage:React.FC -> item ",
      "font-size:16px;background-color:#718bb6;color:white;",
      item
    );
    setProduct({ ...item });
    handleProductReviews(item?.id);
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
              src={product?.image}
              alt="product-image-detail"
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
            <b>Overall Rate:</b>{" "}
            <p>
              {Object.keys(product?.reviews ?? []).length ? totalRating : ""}
            </p>
          </span>
          <span className="flex space-x-2">
            <b>Date Created:</b>{" "}
            <p>{moment(product?.createdAt).format("MM/DD/YY")}</p>
          </span>
          <div className="pt-2 pb-2 px">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add Review
            </button>
          </div>
          <span className="flex space-x-2 pt-2">
            <b>Reviews:</b>
          </span>
        </div>

        <div className="flex flex-wrap">
          {Object.keys(reviewsProducts ?? []).length &&
            reviewsProducts.map((item: any) => {
              const isLike=Object.keys(liked ?? {}).length && liked.find((el:IILike)=>el?.id==item?.id) 
              const number = item?.rating.toString() as string;
              const rate: string = number
                ? parseInt(number?.charAt(0)) > 4 &&
                  parseInt(number?.charAt(0)) <= 9
                  ? "5"
                  : number.charAt(0)
                : "";
              return (
                <div className="w-[25%] px-5 pb-0 pt-4" key={item?.id}>
                  <span className="flex space-x-2 w-100">
                    <b>AuthorName:</b> <p>{item?.name}</p>
                  </span>
                  <span className="flex space-x-2">
                    <b>AuthorAvatar:</b>{" "}
                    <div className="aspect-w-1 aspect-h-1 rounded-full bg-gray-300">
                      <img
                        className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                        src={item?.avatar}
                        alt="author-image"
                      />
                    </div>
                  </span>
                  <span className="flex space-x-2">
                    <b>AuthorEmail:</b> <p>{item?.email ?? ""}</p>
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
                    <b>Badge:</b> <p>{item?.verified ? "true" : "false"}</p>
                  </span>
                  <span className="flex space-x-2">
                    <b>Likes:</b> <p>{item?.likes ?? ""}</p>
                  </span>
                  <button
                    onClick={() => {
                      handleLike(item?.id,isLike as any);
                    }}
                    className={`flex items-center space-x-1 px-2 py-1 bg-gray-200 rounded-full ${
                      isLike && isLike?.['liked']? "text-blue-500" : "text-gray-500"
                    } hover:bg-gray-300 focus:outline-none`}
                  >
                    <AiOutlineLike />
                    <span>{isLike && isLike?.['liked'] ? "Liked" : "Like"}</span>
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default ProductDetailsPage;
