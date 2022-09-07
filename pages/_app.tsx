import "../styles/globals.css";
import type { AppProps } from "next/app";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";  
import { SWRConfig } from "swr";

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher: (url: string) => fetch(url).then((response) => response.json())}} >
      <div className="w-full max-w-lg mx-auto">
        <Component {...pageProps} /> 
      </div>
    </SWRConfig>
  );
}

export default MyApp;
