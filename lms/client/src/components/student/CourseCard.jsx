import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";



const CourseCard = ({course}) => {
  return (
   <Link to={'/course/'+ course._id} onClick={()=>scrollTo(0,0)} className="border border-gray-500 pb-6 overflow-hidden rounded-l-lg">
    <img className="w-full " src={course.courseThumbnail} alt="thumnail" />
    <div className="p-3 text-left">
      <h3 className="text-base font-semibold">{course.courseTitle}</h3>
      <p className="text-gray-500">{course.educator.name}</p>
      <div className="flex items-center space-x-2">
        <p>4.5</p>
        <div className="flex">
          {[...Array(5)].map((_,i)=>(
            <img className="w-3.5 h-3.5" key={i} src={assets.star} alt="star icon" />
          ))}
        </div>
        <p className="text-gray-500">22</p>
      </div>
      <p className="text-base font-semibold text-gray-800">₹{(course.coursePrice - course.discount * course.coursePrice/100).toFixed(0)}</p>
    </div>
   </Link>
  );
};

export default CourseCard;


