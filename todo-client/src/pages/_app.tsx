import "@/styles/globals.css";
import ReduxProvider from "@/utils/redux/redux.provider";
import { store } from "@/utils/redux/store";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </ReduxProvider>
  );
}
