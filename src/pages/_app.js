// src/pages/_app.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import DashboardLayout from "@/components/layout/DashboardLayout";
import store from "@/redux/store";
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function MyApp({ Component, pageProps}) {
  const appRouter = useRouter();

  const isDashboard = appRouter.pathname.startsWith("/dashboard");
  const isAuthPage = appRouter.pathname.startsWith("/auth");

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token && isDashboard) {
      appRouter.replace("/");
    }
    if (token && isAuthPage) {
      appRouter.replace("/dashboard");
    }
  }, [appRouter.pathname]);

  let Layout = ({ children }) => <>{children}</>;
  if (isDashboard) Layout = DashboardLayout;
const queryClient = new QueryClient();

  return (
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <Layout>
        <Component {...pageProps} />
        <ToastContainer position="top-right" autoClose={3000} />
      </Layout>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
