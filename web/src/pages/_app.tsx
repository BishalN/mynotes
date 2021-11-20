import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 } },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />;
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
export default MyApp;
