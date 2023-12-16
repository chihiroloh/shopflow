import React from "react";
import { useLocation } from "react-router-dom";
import NavBar from "./NavBar";

// const MyOffer = () => {
//   const location = useLocation();
//   const { offerDetails } = location.state || {};

//   return (
//     <div>
//       <NavBar />
//       <hr />
//       <h1>My Offers</h1>
//       {offerDetails ? (
//         <div>
//           <h2>Offer Details</h2>
//           <p>Price: ${offerDetails.price}</p>
//           <p>Status: {offerDetails.status}</p>
//           <p>Created At: {offerDetails.createdAt}</p>
//           <p>Posted By: {offerDetails.username}</p>
//           {offerDetails.listingDetails && (
//             <div>
//               <hr />
//               <h2>Listing Details</h2>
//               <p>ID: {offerDetails.listingDetails.id}</p>
//               {/* Display other listing details here */}
//             </div>
//           )}
//         </div>
//       ) : (
//         <p>You have no offers.</p>
//       )}
//     </div>
//   );
// };

const MyOffer = () => {
  return (
    <div>
      <NavBar />
      <hr />
    </div>
  );
};

export default MyOffer;
