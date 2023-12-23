# Shopflow

- ShopFlow is a online marketplace, allowing users to deal easily by making offer on listings and choosing whether to accept or decline the offer.

# Main features

- User is able to view all the listings and see which one he/she wants to make an offer on.
- User is able to create a listing, once created user is able to update or delete the listing.
- User is able to make an offer on a listing, the listing owner is able to either accept or decline the offer. The user who made the offer is able to withdraw the offer.

# Tech stack

- React.js
- Node.js
- Express
- MongoDB
- Mongoose

# Database design

# Entities

Listings Entity

- Represents various items/services users can offer on the platform.
  Key attrbiutes
- Title
- Description
- Price
- Category
- Seller (User posted the listing)

Offers Entity

- Encapsulates bids that users make on the listings. Each offer is tied to a specific listing and include details of proposal made by the user.
  Key attributes
- Buyer (User making the offer)
- Listing Reference (Link to the associated listing)
- Offered Price
- Status (pending, accepted, declined, cancelled)

Users Entity

- Represents individuals who interact with the platform whether posting listings or making offers.
  Key attributes
- Username
- Password

# Relationships

User-Listing Relationships

- One-to-Many
- Each user can create multiple listings. A single listing is uniquely associated with one user, but a user can have several listings under their profile.

User-Offers Relationship

- One-to-Many
- Users can make multiple offers across different listings. Each offer is linked to one user, the potential buyer.

Listings-Offers Relationship

- One-to-Many
- Each listing can attract multiple offers from different users, enabling a dynamic interaction between buyers and sellers.

# Environment Variables

Backend

- PORT - 5001
- DATABASE - mongodb://- 127.0.0.1:27017/Carousell
- ACCESS_SECRET
- REFRESH_SECRET

Frontend

- VITE_SERVER - http://localhost:5001
