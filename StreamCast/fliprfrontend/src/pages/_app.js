import "@/styles/globals.css";
import "@/styles/Navbar.scss";
import "@/styles/podcast.scss";
import Store from "@/utils/Redux/Store";
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={Store}>
      <ThemeProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </ThemeProvider>
    </Provider>
  );
}
