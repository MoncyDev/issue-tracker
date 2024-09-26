"use client";
import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from "@tanstack/react-query";
import { PropsWithChildren } from "react";

const queryCLient = new QueryClient();

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <ReactQueryClientProvider client={queryCLient}>
      {children}
    </ReactQueryClientProvider>
  );
};

export default QueryClientProvider;
