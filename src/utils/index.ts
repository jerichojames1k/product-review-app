import { IDataReview } from "../view/components/add-review-product/types";

export const capitalizeFirstLetter=(word:string)=> {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
export const formValidation = (data: IDataReview, requiredField: string[]) => {
  const validation = Object.entries(data).reduce((acc: any, curr: string[]) => {
    if (curr?.[0]) {
      if (requiredField.includes(curr?.[0])) {
        if (curr?.[0] === "email" && curr?.[1]) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const isvalid = emailRegex.test(curr?.[1]);
          return { ...acc, [curr[0]]: isvalid ? " " : "Email is invalid" };
        }
        if (curr?.[0] === "rating" && curr?.[1]) {
          const ratingNumber = Number(curr?.[1]);
          if (isNaN(ratingNumber) || ratingNumber < 1 || ratingNumber > 5) {
            return {
              ...acc,
              [curr[0]]: "Rating must be a number between 1 and 5",
            };
          }
        }

        if (!curr?.[1]) {
         const keyWord=capitalizeFirstLetter(curr[0])
          return { ...acc, [curr[0]]: keyWord + " is required." };
        }
      }
    }

    return acc;
  }, {}) as Object;

  return validation;
};
