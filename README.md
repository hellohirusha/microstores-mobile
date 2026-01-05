# MicroCommerce Store App

A full-featured React Native mobile application that simulates a **modern e-commerce Point-of-Sale (POS) and store browsing platform**, designed for buyers to browse stores, manage their cart, place orders, and manage their profile.

This project was developed with a focus on **full-stack mobile development, state management, context-based architecture, and persistent user authentication**, showcasing a complete end-to-end mobile commerce experience.


## Table of Contents

* [Project Overview](#project-overview)
* [Key Features](#key-features)
* [Tech Stack](#tech-stack)
* [Architecture & Contexts](#architecture--contexts)
* [Screens & UI Flow](#screens--ui-flow)
* [Data Management](#data-management)
* [Specialties & Highlights](#specialties--highlights)
* [Future Improvements](#future-improvements)
* [Getting Started](#getting-started)
* [Author](#author)


## Project Overview

This mobile application allows a user (buyer) to:

* Browse a list of **stores** and view **products** within each store.
* Add products to a **cart** and manage quantities with stock validation.
* View and manage **orders** (history of purchased items).
* Maintain a **profile** with persistent authentication.
* Register and login with **persistent user storage** using AsyncStorage.

The app mimics a real-world **micro e-commerce platform**, and all user interactions and product management features are implemented using **React Native Context API** for state management.


## Key Features

1. **Authentication & User Management**

   * Email/password login and registration.
   * Full user profile management.
   * AsyncStorage persistence ensures user stays logged in across sessions.
   * Validation for all fields during registration/login.

2. **Store & Product Browsing**

   * Dynamic **store list** with search and filter capabilities.
   * Individual store view displaying only products belonging to that store.
   * Product stock management integrated with cart operations.

3. **Cart & Orders**

   * Add, remove, increase, and decrease product quantities in the cart.
   * Stock validation to prevent over-purchasing.
   * Order summary and order history (mocked for demo purposes).

4. **Profile Management**

   * Display logged-in user data dynamically.
   * Sign out functionality.
   * Real-time updates when user logs in/out or modifies data.

5. **UI/UX Considerations**

   * Modern and clean card-based layouts for products and stores.
   * Scrollable screens with keyboard-aware inputs for better usability.
   * Responsive UI components matching across login, registration, and main app screens.
   * Badges on cart tab showing the current number of items.


## Tech Stack

* **Frontend:** React Native (Expo)
* **Navigation:** React Navigation (Stack & Bottom Tabs)
* **State Management:** Context API (`AuthContext`, `ProductContext`, `CartContext`, `OrdersContext`)
* **Storage:** AsyncStorage for persistent user and cart data
* **Icons & UI:** Expo Vector Icons (Ionicons)
* **Mock Data:** Demo stores and products provided in `demoproducts.ts`


## Architecture & Contexts

The app uses a **context-driven architecture**, separating concerns for authentication, product management, cart operations, and orders:

| Context         | Responsibilities                                                            |
| --------------- | --------------------------------------------------------------------------- |
| AuthContext     | Manages login/logout, user profile, persistent AsyncStorage authentication. |
| ProductContext  | Provides product list, stock operations (`increaseStock`, `decreaseStock`). |
| CartContext     | Manages cart state, calculates totals, validates stock.                     |
| OrdersContext   | Tracks orders placed by the user.                                           |
| ProductProvider | Wraps around the app to provide global access to products.                  |

This approach **ensures modularity, easier state updates, and scalability**.


## Screens & UI Flow

1. **LoginScreen**

   * Email/password login with field validation.
   * Redirect to RegisterScreen for new users.

2. **RegisterScreen**

   * New user registration with validation and AsyncStorage persistence.
   * Keyboard-friendly inputs for smooth UX.
   * Auto-login after successful registration.

3. **StoreListScreen**

   * Displays all stores.
   * Search bar dynamically filters stores by name.
   * Shows “No stores found” when there are no matching results.

4. **StoreScreen**

   * Displays products belonging to a specific store.
   * Clicking a product navigates to ProductScreen (mock).

5. **CartScreen**

   * Shows all items added to the cart.
   * Allows increasing/decreasing quantities.
   * Reflects real-time stock validation from ProductContext.

6. **ProfileScreen**

   * Displays current logged-in user data.
   * Includes stats like total products in stock and items in cart.
   * Sign out button with immediate effect.

7. **BuyerTabs**

   * Bottom tab navigation between Stores, Cart, Orders, and Profile.
   * Badge indicator for cart items.


## Data Management

* **Persistent User Storage:** AsyncStorage keeps user login sessions alive.
* **Cart & Stock Management:**

  * Products are tracked with stock counts.
  * Cart operations automatically update product stock.
* **Mock Demo Data:** `demoproducts.ts` and `DEMO_STORES` used for initial state before backend integration.


## Specialties & Highlights

* Full **end-to-end mobile app** with authentication, cart management, and profile persistence.
* Keyboard-aware, scrollable forms for better UX.
* Context-driven architecture ensures **clean separation of concerns**.
* Dynamic search implementation with “no results” feedback.
* Demonstrates **real-world full-stack mobile app patterns**, ready for backend integration.
* Modular code organization: reusable components, context providers, and screens.


## Future Improvements

* **Backend Integration:** Replace AsyncStorage with real API endpoints for authentication, products, and orders.
* **Order Management:** Allow real checkout flow, payments, and order history retrieval.
* **Profile Editing:** Enable editing of user profile and avatar.
* **Advanced Search & Filters:** Filter products by category, price range, ratings, etc.
* **Notifications:** Push notifications for order updates.
* **Seller Role:** Add seller functionality with product management capabilities.
* **Testing:** Implement unit tests and end-to-end testing (Vitest, Jest, Detox).


## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/hellohirusha/microstores-mobile.git
cd microstores-mobile
```

2. Install dependencies:

```bash
npm install
```

3. Run the app (Expo):

```bash
npm start
```

4. Open on device/emulator using Expo Go.


## Author

**Hirusha Randombage**

* Email: [randombage.hirusha@gmail.com](randombage.hirusha@gmail.com)
* LinkedIn: [linkedin.com/in/hellohirusha](https://linkedin.com)


### Notes for Recruiters

This project demonstrates:

* Strong **React Native expertise** with clean architecture.
* Ability to implement **context-driven state management** across multiple app domains.
* Practical skills in **persistent user storage, input validation, and modern UI patterns**.
* Focus on **realistic app flows and user experience**.

This is a **fully functional mobile commerce demo**, and while the backend is mocked with AsyncStorage, the architecture is **ready to integrate real-world APIs** with minimal refactoring.