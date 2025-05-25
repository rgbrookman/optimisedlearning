import React from "react";
import { TranscriptProvider } from "@/app/contexts/TranscriptContext";
import { EventProvider } from "@/app/contexts/EventContext";
import { Suspense } from 'react';
import App from "./App";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading page content...</div>}>
    <TranscriptProvider>
      <EventProvider>
        <App />
      </EventProvider>
    </TranscriptProvider>
    </Suspense>
  );
}
