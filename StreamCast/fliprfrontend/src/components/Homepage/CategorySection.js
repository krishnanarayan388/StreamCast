import React from "react";
import Slider from "react-slick";
import CategoryCard from "../Cards/CategoryCard";
"Sports",
  "Technology",
  "Entertainment",
  "Lifestyle",
  "Current affairs",
  "Comedy",
  "Comedy",
  "Business";
const categories = [
  {
    name: "Sports",
    image:
      "https://res.cloudinary.com/ompra/image/upload/v1682165502/zhnc5dnzk0q6rmqce575.jpg",
  },
  {
    name: "Technology",
    image:
      "https://res.cloudinary.com/ompra/image/upload/v1682165502/zhnc5dnzk0q6rmqce575.jpg",
  },
  {
    name: "Entertainment",
    image:
      "https://res.cloudinary.com/ompra/image/upload/v1682165502/zhnc5dnzk0q6rmqce575.jpg",
  },
  {
    name: "Lifestyle",
    image:
      "https://res.cloudinary.com/ompra/image/upload/v1682165502/zhnc5dnzk0q6rmqce575.jpg",
  },
  {
    name: "Comedy",
    image:
      "https://res.cloudinary.com/ompra/image/upload/v1682165502/zhnc5dnzk0q6rmqce575.jpg",
  },
  {
    name: "Business",
    image:
      "https://res.cloudinary.com/ompra/image/upload/v1682165502/zhnc5dnzk0q6rmqce575.jpg",
  },
  {
    name: "LifeStyle",
    image:
      "https://res.cloudinary.com/ompra/image/upload/v1682165502/zhnc5dnzk0q6rmqce575.jpg",
  },
];
const CategorySection = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    width: "100%",
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  return (
    <div className="pb-10    " style={{ width: "100%" }}>
      <div className="mt-5">
        <div className="text-2xl font-bold text-white mt-5 mb-8 ">
          Categories
        </div>

        <Slider {...settings} arrows={false} >
          {categories?.map((item, index) => (
            <div key={index}>
              <div className="mb-5  flex justify-center items-center ">
                <CategoryCard item={item} />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CategorySection;
