import React, { useEffect, useState } from "react";

const Rating = ({ initialRating = 0, onRate }) => {
  const [rating, setRating] = useState(initialRating);

  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  const handleRating = (value) => {
    setRating(value);
    if (onRate) onRate(value);
  };

  return (
    <div>
      {Array.from({ length: 5 }, (_, i) => {
        const starValue = i + 1;
        return (
          <span
            key={i}
            className={`text-xl sm:text-2xl cursor-pointer transition-colors ${
              starValue <= rating ? "text-yellow-500" : "text-gray-400"
            }`}
            onClick={() => handleRating(starValue)}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
};

export default Rating;
