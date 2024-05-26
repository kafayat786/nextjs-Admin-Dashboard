"use client";

import { SessionProvider } from "next-auth/react";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/tailwind-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
// import "primeflex/primeflex.css";
import "./globals.css";
import Tailwind from "primereact/passthrough/tailwind";
export function Providers({ children }: { children: React.ReactNode }) {
  // useEffect(() => {
  //   let api = process.env.NEXT_PUBLIC_API_URL;
  //   api = api?.replace("/api", "");
  //   fetch(api + "/sanctum/csrf-cookie", { credentials: "include" });
  // }, []);

  return (
    <SessionProvider>
      <PrimeReactProvider value={{ pt: Tailwind }}>
        {children}
      </PrimeReactProvider>
    </SessionProvider>
  );
}
