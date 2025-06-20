# 🧳 Travel Agency Management System

A comprehensive Travel Agency Management System built to streamline the operations of a travel agency — from managing customer bookings to organizing travel packages, transportation, and accommodation.

## 📌 Project Overview

This system is designed to automate and manage the workflow of a travel agency. It allows administrators to manage travel packages, customer information, bookings, payments, and more. The system ensures a smooth experience for both agency staff and customers.

## ✨ Features

- 👤 **User Management**
  - Admin login and role-based access
  - Customer registration and profile management

- 🏖️ **Package Management**
  - Add, update, delete travel packages
  - View packages with details like destination, price, duration, and itinerary

- 📅 **Booking System**
  - Customers can book packages
  - Payment status tracking

- 💳 **Payment Management**
  - Integration with dummy payment gateway (or simulated payments)
  - Payment history 

- 🚌 **Transportation & Accommodation**
  - Add/manage transport options (buses, flights, trains)
  - Hotel/room booking and management


## 🛠️ Technologies Used

| Layer              | Technology              |
|-------------------|--------------------------|
| Frontend          | HTML, CSS, JavaScript, React |
| Backend           |  Node.js |
| Database          | MongoDB  |
| Tools             | VS Code,  Git |


## 🧩 Modules Breakdown

1. **Admin Panel**
   - Dashboard overview
   - Manage packages, bookings, payments, users

2. **Customer Panel**
   - View/search packages
   - Book packages and make payments
   - View booking history

3. **Search & Filter**
   - Filter packages by destination, price, duration


## 🗃️ Database Schema (Simplified)

- `users (id, name, email, password, role)`
- `packages (id, title, description, price, duration, image_url)`
- `bookings (id, user_id, package_id, status, booking_date)`
- `payments (id, booking_id, amount, payment_status, date)`
- `transport (id, type, details, availability)`
- `hotels (id, name, location, room_details)`
