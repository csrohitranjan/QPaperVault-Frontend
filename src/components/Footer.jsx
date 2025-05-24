// src/components/Footer.jsx
import React from "react";

export default function Footer() {
  return (
    <footer
      className="
        fixed bottom-0 left-0 w-full
        bg-black text-gray-400 text-[10px]
        select-none font-light tracking-wider
        flex justify-center items-center gap-2
        py-0.5 border-t border-gray-800 z-50
      "
      role="contentinfo"
    >
      <span className="text-gray-300 font-medium">
        Designed and Developed by Mr. Rohit Ranjan
      </span>

      <a
        href="https://www.linkedin.com/in/csrohitranjan"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit LinkedIn Profile of Mr. Rohit Ranjan"
        className="inline-block"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="#0A66C2"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-hidden="true"
        >
          <title>LinkedIn</title>
          <path d="M20.447 20.452H16.893v-5.569c0-1.328-.024-3.037-1.852-3.037-1.852 0-2.136 1.446-2.136 2.939v5.667H9.298V9h3.404v1.561h.049c.474-.9 1.635-1.852 3.364-1.852 3.6 0 4.268 2.369 4.268 5.455v6.288zM5.337 7.433a1.974 1.974 0 110-3.948 1.974 1.974 0 010 3.948zm1.707 13.019H3.63V9h3.414v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.73v20.539C0 23.225.792 24 1.771 24h20.451C23.2 24 24 23.225 24 22.269V1.73C24 .774 23.2 0 22.225 0z" />
        </svg>
      </a>
    </footer>
  );
}
