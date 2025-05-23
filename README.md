# RaunaCart E-Commerce Platform

RaunaCart is a modern, responsive e-commerce web application built with React, Redux Toolkit, Firebase, and Vite. It features user authentication (email/password & Google OAuth), a shopping cart, and a clean, mobile-friendly UI.

---

## Features

- 🔒 **Authentication:** Email/Password & Google OAuth via Firebase
- 🛒 **Shopping Cart:** Add, remove, and update product quantities
- 📱 **Responsive Design:** Optimized for mobile, tablet, and desktop
- ⚡ **Modern Stack:** React, Redux Toolkit, Vite, TypeScript, Firebase
- 🎨 **UI Components:** Built with reusable and accessible components

---

## Getting Started

### 1. **Clone the Repository**

```bash
git clone https://github.com/Rs07-404/RaunaCart.git
cd raunacart
```

---

### 2. **Install Dependencies**

> **Important:** Use `--legacy-peer-deps` to avoid peer dependency conflicts.

```bash
npm install --legacy-peer-deps
```

---

### 3. **Setup Environment Variables**

- Update `.env` with the credentials and configurations:

- **Rename the app:**  
  Edit the `VITE_APP_NAME` variable in your `.env` file to your desired app name.

- **Fill Firebase credentials:**  
  Replace the placeholder values in `.env` with your Firebase project credentials:

  ```
  VITE_FIREBASE_API_KEY=your_api_key
  VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
  VITE_FIREBASE_PROJECT_ID=your_project_id
  VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
  VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
  VITE_FIREBASE_APP_ID=your_app_id
  VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
  VITE_FIREBASE_WEB_CLIENT_ID=your_web_client_id
  VITE_APP_NAME=RaunaCart
  ```

---

### 4. **Setup Firebase Project**

#### a. **Create a Firebase Project**

- Go to [Firebase Console](https://console.firebase.google.com/)
- Click **Add project** and follow the steps

#### b. **Register Your App**

- Add a new **Web App** in your Firebase project settings
- Copy the config values into your `.env` file as shown above

#### c. **Enable Authentication Providers**

1. Go to **Authentication > Sign-in method** in Firebase Console
2. **Enable Email/Password**
3. **Enable Google**
   - For Google, you may need to provide a project support email
   - Add your development and production domains (e.g., `http://localhost`, your deployed URL) to the **Authorized domains** list

#### d. **Get Web Client ID for Google OAuth**

- Go to **Project Settings > General > Your apps > Web app**
- Under **OAuth 2.0 Client IDs**, copy the **Web client ID** and set it as `VITE_FIREBASE_WEB_CLIENT_ID` in your `.env`

---

### 5. **Run the App**

```bash
npm run dev
```

- The app will be available at [http://localhost:5173](http://localhost:5173) (or your chosen port).

---

## Project Structure

```
src/
  components/      # Reusable UI components
  context/         # React context providers
  pages/           # App pages (Cart, Auth, etc.)
  store/           # Redux Toolkit store and slices
  config/          # Firebase and app config
  assets/          # Images and static assets
  types/           # TypeScript types/interfaces
```

---

### PlayGround
- You can also change the primary and secondary colors in index.css to change the theme.

---

## Troubleshooting

- **Firebase errors:** Double-check your `.env` values and that your Firebase project is set up correctly.
- **Google OAuth errors:** Ensure your domain is in the Firebase **Authorized domains** and the correct Web Client ID is used.
- **Dependency issues:** Always use `npm install --legacy-peer-deps`.

---

## License

This project is licensed under the MIT License.

---

**Happy Shopping with RaunaCart!**