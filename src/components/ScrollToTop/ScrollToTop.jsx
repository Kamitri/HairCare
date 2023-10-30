import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const element = document.getElementById('app-navbar');
    element.scrollIntoView();
  }, [pathname]);

  return null;
}