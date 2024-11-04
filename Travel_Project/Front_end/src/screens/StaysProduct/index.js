import React from "react";
import cn from "classnames";
import styles from "./StaysProduct.module.sass";
import Product from "../../components/Product";
import Description from "./Description";
import CommentsProduct from "../../components/CommentsProduct";
import Browse from "../../components/Browse";
import Newsletter from "../../components/Newsletter";

// data
import { browse1 } from "../../mocks/browse";
import { browse2 } from "../../mocks/browse";

const breadcrumbs = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Stays",
    url: "/",
  },
  // {
  //   title: "New Zealand",
  //   url: "/stays-category",
  // },
  {
    title: "Hạ Long",
  },
];


const gallery = [
  "/images/content/photo-1.1.jpg",
  "/images/content/photo-1.2.jpg",
  "/images/content/photo-1.3.jpg",
  "/images/content/photo-1.4.jpg",
];

const options = [
  {
    title: "Địa điểm lý tưởng",
    icon: "home",
  },
  {
    title: "VietNam",
    icon: "flag",
  },
];

const parametersUser = [
  {
    title: "Superhost",
    icon: "home",
  },
  {
    title: "256 reviews",
    icon: "star-outline",
  },
];

const socials = [
  {
    title: "twitter",
    url: "https://twitter.com/ui8",
  },
  {
    title: "instagram",
    url: "https://www.instagram.com/",
  },
  {
    title: "facebook",
    url: "https://www.facebook.com/",
  },
];

const StaysProduct = () => {
  return (
    <>
      <Product
        classSection="section-mb64"
        urlHome="/stays-category"
        title="Tổng quan địa điểm du lịch"
        breadcrumbs={breadcrumbs}
        options={options}
        // gallery={gallery}
        type="stays"
        description="Thị trấn Semporna nằm ven biển ở phía Đông Nam của bang Sabah, Malaysia. Semporna là điểm đến lý tưởng cho những ai yêu thích biển, lặn biển và khám phá văn hóa bản địa. "
      />
      <Description classSection="section" />
      <CommentsProduct
        className={cn("section", styles.comment)}
        parametersUser={parametersUser}
        info="Described by Queenstown House & Garden magazine as having 'one of the best views we've ever seen' you will love relaxing in this newly built"
        socials={socials}
        buttonText="Contact"
      />
      {/* <Browse
        classSection="section"
        classTitle="h2"
        title="Browse by property type"
        info="Let’s go on an adventure"
        items={browse1}
      /> */}
      {/* <Newsletter /> */}
      {/* <Browse
        classSection="section"
        headSmall
        classTitle="h4"
        title="Explore mountains in New Zealand"
        items={browse2}
      /> */}
    </>
  );
};

export default StaysProduct;
