import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { pageview } from "@/lib/analytics";

const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view em cada mudança de rota
    pageview(location.pathname + location.search);
  }, [location]);

  return null;
};

export default Analytics;
