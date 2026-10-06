"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { BookingForm } from "./BookingForm";

type Prefill = { treatment?: string; doctor?: string };
const Ctx = createContext<{ open: (p?: Prefill) => void }>({ open: () => {} });
export const useBooking = () => useContext(Ctx);

/** App-wide booking sheet (native <dialog>: focus trap + Esc). Every "Book" button can open it. */
export function BookingProvider({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [prefill, setPrefill] = useState<Prefill>({});
  const [n, setN] = useState(0);

  const open = useCallback((p: Prefill = {}) => {
    setPrefill(p);
    setN((x) => x + 1); // remount the form so defaults apply and old results clear
    ref.current?.showModal();
    document.documentElement.classList.add("lenis-stopped");
  }, []);
  const close = () => ref.current?.close();

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const onClose = () => document.documentElement.classList.remove("lenis-stopped");
    d.addEventListener("close", onClose);
    return () => d.removeEventListener("close", onClose);
  }, []);

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      <dialog ref={ref} className="sheet" aria-label="Book an appointment" onClick={(e) => { if (e.target === ref.current) close(); }}>
        <div className="flex h-full items-end justify-center md:items-center md:p-6" onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
          <div className="relative max-h-[94dvh] w-full max-w-2xl overflow-y-auto rounded-t-[2rem] bg-cream p-5 pb-8 shadow-2xl md:rounded-[2rem] md:p-8">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Book</p>
                <h2 className="!text-3xl">Request an appointment</h2>
              </div>
              <button type="button" onClick={close} aria-label="Close" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sand text-cocoa hover:bg-peach"><X aria-hidden /></button>
            </div>
            <BookingForm key={n} treatment={prefill.treatment} doctor={prefill.doctor} bare />
          </div>
        </div>
      </dialog>
    </Ctx.Provider>
  );
}
