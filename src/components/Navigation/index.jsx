"use client";

import { signOut } from "next-auth/react";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { useEffect } from "react";

export default function Navigation({ showMenu, setShowMenu, className = "" }) {
  function checkWindowWidth() {
    var windowWidth = window.innerWidth;
    if (windowWidth > 1024) {
    } else {
      setShowMenu(!showMenu);
    }
  }
  useEffect(() => {
    // Call the function initially to check the window width on page load
    checkWindowWidth();
    // Add an event listener to check the window width when the window is resized
    window.addEventListener("resize", checkWindowWidth);
  }, []);

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex space-x-4 items-center p-4">
        <i
          onClick={() => setShowMenu(!showMenu)}
          className="pi pi-bars cursor-pointer"
          style={{ color: "#000", fontSize: "1.5rem" }}
        />

        <div className="font-bold text-lg ">Logo</div>
      </div>
      <div className="flex items-center">
        <Button
          onClick={() => {
            signOut();
          }}
          isIconOnly
          startContent={
            <i className="pi-sign-in" style={{ fontSize: "2rem" }}></i>
          }
          variant="light"
          radius="full"
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}
