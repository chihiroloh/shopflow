SHOPFLOW
Overview

- ShopFlow is a buy and sell website, allowing users to deal easily by making offer on listings and choosing whether to accept or decline the offer.

Features

- User is able to view all the listings and see which one he/she wants to make an offer on.
- User is able to create a listing, once created user is able to update or delete the listing.
- User is able to make an offer on a listing, the listing owner is able to either accept or decline the offer. The user who made the offer is able to withdraw the offer.

TECH STACK

- React.js
- Node.js
- Express
- MongoDB
- Mongoose

Database Design

Entities

User
username (String, required, unique)
password (String, required)
isAdmin (Boolean, default: false)

Listing
title (String, required)
category (String, required)
description (String, required)
price (Number, required)
user (String, required)
username (String)
createdAt (Date, default: Date.now)

Offer
buyer (String, required)
buyerId (ObjectId, ref: 'User')
listing (ObjectId, ref: 'listing', required)
price (Number, required)
status (String, enum: ["pending", "accepted", "declined", "cancelled"], default: "pending")
createdAt (Date, default: Date.now)

Relationships
Each Listing is associated with a User.
Each Offer is linked to a Listing and a User (as buyer).

Environment Variables
PORT - 5001
DATABASE - Connection string for MongoDB (e.g., mongodb://127.0.0.1:27017/Carousell)
ACCESS_SECRET
REFRESH_SECRET

API Endpoints
Auth Routes
POST /auth/register
POST /auth/login
GET /auth/users
GET /auth/userinfo
PUT /auth/users/:userId
DELETE /auth/users/:userId
Listing Routes
POST /listing
GET /listing
GET /listing/:id
GET /listing/category/:category
PUT /listing/:id
DELETE /listing/:id
Offer Routes
POST /offer/create/:listingId
GET /offer/listing/:listingId
GET /offer/user/:userId
PUT /offer/update/:offerId
PATCH /offer/cancel/:offerId
