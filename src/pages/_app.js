// pages/_app.js
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import DashboardLayout from "@/components/layout/DashboardLayout";
import store from "@/redux/store";

function MyApp({ Component, pageProps, router }) {
  const isDashboard = router.pathname.startsWith("/dashboard");

  return (
    <Provider store={store}>
      {/* <ThemeProvider theme={theme}> */}
        <CssBaseline />
        {isDashboard ? (
          <DashboardLayout>
            <Component {...pageProps} />
          </DashboardLayout>
        ) : (
          <Component {...pageProps} />
        )}
      {/* </ThemeProvider> */}
    </Provider>
  );
}

export default MyApp;
