"use client";

import "../globals.css";
import { Providers } from "@/Providers";
import Navigation from "@/components/Navigation";
import Aside from "@/components/Aside";
import { useState } from "react";

export default function RootLayout({ children }) {
  const [menuDisabled, setMenuDisabeld] = useState(false);

  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="bg-[#f2f2f5] bg-default-100 overflow-hidden">
            <Navigation
              showMenu={menuDisabled}
              setShowMenu={setMenuDisabeld}
              className="p-3 h-14"
            />
            <main className="flex relative h-[92.8vh]">
              <Aside
                menuDisabled={menuDisabled}
                setMenuDisabeld={setMenuDisabeld}
                className={`laptop:ml-0 bg-[#28293D]   p-2 transition-all  ${
                  menuDisabled ? "w-10 hover:bg-[#06070c]" : "w-56 "
                } ${!menuDisabled ? "shadow-md rounded-tr-none" : "-ml-56"}`}
              />
              <div
                className={`flex-grow ${
                  menuDisabled ? "ml-10" : "laptop:ml-56 ml-0"
                } pl-4`}
              >
                <div className="bg-[#f2f2f5] w-full p-2 h-full overflow-auto  rounded-tl-large">
                  {children}
                </div>
              </div>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
