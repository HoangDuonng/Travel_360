// import React from "react";
// import cn from "classnames";
// import styles from "./Details.module.sass";
// import Icon from "../../../../components/Icon";

// const parameters = [
//   {
//     title: "2 guests",
//     icon: "home",
//   },
//   {
//     title: "1 bedroom",
//     icon: "flag",
//   },
//   {
//     title: "1 private bath",
//     icon: "flag",
//   },
// ];

// const options = [
//   {
//     title: "Free wifi 24/7",
//     icon: "modem",
//   },
//   {
//     title: "Free clean bathroom",
//     icon: "toilet-paper",
//   },
//   {
//     title: "Free computer",
//     icon: "monitor",
//   },
//   {
//     title: "Breakfast included",
//     icon: "burger",
//   },
//   {
//     title: "Free wifi 24/7",
//     icon: "medical-case",
//   },
//   {
//     title: "ATM",
//     icon: "credit-card",
//   },
//   {
//     title: "Free wifi 24/7",
//     icon: "modem",
//   },
//   {
//     title: "Nearby city",
//     icon: "building",
//   },
// ];

// const Details = ({ className }) => {
//   return (
//     <div className={cn(className, styles.details)}>
//       <h4 className={cn("h4", styles.title)}>Private room in house</h4>
//       <div className={styles.profile}>
//         <span>Hosted by</span>
//         <div className={styles.avatar}>
//           <img src="/images/content/avatar.jpg" alt="Avatar" />
//         </div>
//         <div className={styles.name}>Zoe Towne</div>
//       </div>
//       <div className={styles.parameters}>
//         {parameters.map((x, index) => (
//           <div className={styles.parameter} key={index}>
//             <Icon name={x.icon} size="20" />
//             {x.title}
//           </div>
//         ))}
//       </div>
//       <div className={styles.content}>
//         <p>
//           Described by Queenstown House & Garden magazine as having 'one of the
//           best views we've ever seen' you will love relaxing in this newly
//           built, architectural house sitting proudly on Queenstown Hill.
//         </p>
//         <p>
//           Enjoy breathtaking 180' views of Lake Wakatipu from your well
//           appointed & privately accessed bedroom with modern en suite and
//           floor-to-ceiling windows.
//         </p>
//         <p>
//           Your private patio takes in the afternoon sun, letting you soak up
//           unparalleled lake and mountain views by day and the stars & city
//           lights by night.
//         </p>
//       </div>
//       <div className={styles.info}>Amenities</div>
//       <div className={styles.options}>
//         {options.map((x, index) => (
//           <div className={styles.option} key={index}>
//             <Icon name={x.icon} size="24" />
//             {x.title}
//           </div>
//         ))}
//       </div>
//       <button className={cn("button-stroke button-small", styles.button)}>
//         More detail
//       </button>
//     </div>
//   );
// };

// export default Details;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import styles from "./Details.module.sass"; // Đường dẫn tới file CSS Module

// const LocationDetails = () => {
//   // Đặt ID của địa điểm trực tiếp trong component
//   const locationId = "672731f001808a452f0bfae0";

//   const [location, setLocation] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Fetch location details from backend
//     const fetchLocationDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/locations/${locationId}`);
//         setLocation(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchLocationDetails();
//   }, [locationId]); // Dependency array sử dụng locationId

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className={styles.locationDetails}> {/* Áp dụng class CSS */}
//       {location && (
//         <div>
//           <h1>{location.name}</h1>
//           {location.image && (
//             <div>
//               <img
//                 src={`http://localhost:5000/image/${location.image}`} // Hình ảnh địa điểm
//                 alt={location.name}
//               />
//               <p className={styles.subTitle} >{location.name}</p>
//             </div>
//           )}
//           <div className={styles.content}>
//             <p >{location.description}</p>
//           </div>

//           {location.blogs.length > 0 ? (
//             <ul>
//               {location.blogs.map((blog) => (
//                 <li key={blog._id}>
//                   <h1>{blog.title}</h1>
//                   {blog.image && (
//                     <div>
//                       <img
//                         src={`http://localhost:5000/image/${blog.image}`} // Hình ảnh blog
//                         alt={blog.title}
//                       />
//                       <p className={styles.subTitle} >{blog.title}</p>
//                     </div>
//                   )}
//                   <div className={styles.content}>
//                     <p >{blog.description}</p>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No blogs linked to this location.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default LocationDetails;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Sử dụng useParams để lấy id từ URL
import styles from "./Details.module.sass"; // Đường dẫn tới CSS Module

const LocationDetails = () => {
  const { id: locationId } = useParams(); // Lấy locationId từ URL

  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocationDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/locations/${locationId}`);
        setLocation(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (locationId) fetchLocationDetails();
  }, [locationId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.locationDetails}>
      {location && (
        <div>
          <h1>{location.name}</h1>
          {location.image && (
            <div>
              <img
                src={`http://localhost:5000/image/${location.image}`} // Hình ảnh địa điểm
                alt={location.name}
              />
              <p className={styles.subTitle}>{location.name}</p>
            </div>
          )}
          <div className={styles.content}>
            <p>{location.description}</p>
          </div>

          {location.blogs.length > 0 ? (
            <ul>
              {location.blogs.map((blog) => (
                <li key={blog._id}>
                  <h1>{blog.title}</h1>
                  {blog.image && (
                    <div>
                      <img
                        src={`http://localhost:5000/image/${blog.image}`} // Hình ảnh blog
                        alt={blog.title}
                      />
                      <p className={styles.subTitle}>{blog.title}</p>
                    </div>
                  )}
                  <div className={styles.content}>
                    <p>{blog.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No blogs linked to this location.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationDetails;
