import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../component/Header";

export default function RootLayout() {

  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    setVisitCount(localStorage.getItem("visitCount") || 0);
  }, []);

  return (
    <section>
      <Header />
      <main>
        {/* CHILDREN- DIFFERENT PAGES */}
        <Outlet />
      </main>
    </section>
  );
}
