"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { BookingForm } from "./BookingForm";

function Inner() {
  const q = useSearchParams();
  return <BookingForm treatment={q.get("treatment") ?? undefined} doctor={q.get("doctor") ?? undefined} />;
}

/** Reads ?treatment= and ?doctor= on the client so /book stays statically generated. */
export function BookingFormFromUrl() {
  return <Suspense fallback={<BookingForm />}><Inner /></Suspense>;
}
