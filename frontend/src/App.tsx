import { useEffect } from "react";
import DesktopHeader from "./components/DesktopHeader";
import MobileFooter from "./components/MobileFooter";
import { Outlet, ScrollRestoration } from "@tanstack/react-router";
import { httpService } from "./services";

function App() {
  const lang = document.documentElement.lang;

  useEffect(() => {
    document.documentElement.dir = lang === "he" ? "rtl" : "ltr";
  }, [lang]);
  return (
    <>
      <DesktopHeader />
      <Outlet />
      <ScrollRestoration getKey={(location) => location.pathname} />
      <MobileFooter />
    </>
  );
}

export default App;
