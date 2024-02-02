
import React from "react";
import { IRatingProps } from "./types";

const RatingModal: React.FC<IRatingProps> = (props) => {
  const { isOpen, onClose, ratingCounts } = props;
  const handleCose = () => {
    onClose(false);
  };
  const ratingKey=Object.keys(ratingCounts ?? [])
  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } fixed inset-0 overflow-y-auto p-4 flex items-center justify-center`}
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleCose}
      ></div>

      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-auto border-2">
        <h2 className="text-xl font-bold mb-4">Rating Counts</h2>

        <ul>
          {
            ratingKey.map((item:string)=>{
              return (  <li key={item} className="flex items-center justify-between mb-2">
              <span className="flex space-x-2"><p className="font-semibold">Rating {(item)+":"}</p><p>{ratingCounts[item] || 0}</p></span>
            </li>)
            })
          }
        </ul>

        <button
          className="mt-4 bg-blue-500 text-white px-6 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          onClick={() => {
            handleCose();
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default RatingModal;
