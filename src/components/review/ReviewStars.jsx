import React from "react";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

const maxStar = 5;
const ReviewStars = ({ averageRating = maxStar }) => {
  const fullRating = Math.floor(averageRating); // natural whole number
  const isHalfStar = averageRating > fullRating; //true or false

  const emptyStar = isHalfStar
    ? maxStar - fullRating + 1
    : maxStar - fullRating;

  return (
    <div className="">
      <span>
        {Array(fullRating)
          .fill("")
          .map((item, i) => (
            <FaStar className="text-warning" key={i} />
          ))}
        &nbsp;&nbsp;
        {emptyStar && <FaStarHalfAlt className="text-warning" />}
        {Array(emptyStar)
          .fill("")
          .map((item, i) => (
            <FaRegStar className="text-warning" key={i} />
          ))}{" "}
        &nbsp; / {averageRating}
      </span>
    </div>
  );
};

export default ReviewStars;
