// src/layouts/MainLayout.jsx

import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

// // src/layouts/MainLayout.jsx
// import React from "react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { Outlet } from "react-router-dom";

// export default function MainLayout() {
//   return (
//     <>
//       <Navbar />
//       <main>
//         <Outlet />
//       </main>
//       <Footer />
//     </>
//   );
// }
