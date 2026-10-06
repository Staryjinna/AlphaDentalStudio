"use client";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";

const KEY = "ads-consent";
type Choice = "granted" | "denied" | null;

/** Consent banner. GA4 and Microsoft Clarity load only after the visitor accepts. */
export function Consent() {
  const [choice, setChoice] = useState<Choice>(null);
  const [ready, setReady] = useState(false);
  const ga = process.env.NEXT_PUBLIC_GA_ID;
  const clarity = process.env.NEXT_PUBLIC_CLARITY_ID;

  useEffect(() => {
    try { setChoice((localStorage.getItem(KEY) as Choice) ?? null); } catch { /* storage blocked: stay undecided */ }
    setReady(true);
  }, []);

  const decide = (c: "granted" | "denied") => {
    setChoice(c);
    try { localStorage.setItem(KEY, c); } catch { /* ignore */ }
  };

  return (
    <>
      {choice === "granted" && ga && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${ga}');`}</Script>
        </>
      )}
      {choice === "granted" && clarity && (
        <Script id="clarity" strategy="afterInteractive">{`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarity}");`}</Script>
      )}
      {ready && choice === null && (ga || clarity) && (
        <div role="dialog" aria-label="Cookie preferences" className="glass fixed inset-x-3 bottom-24 z-[60] mx-auto max-w-xl rounded-3xl p-5 md:bottom-6 md:left-6 md:right-auto md:mx-0">
          <p className="text-base text-ink">We use cookies for analytics to improve this site. Nothing loads until you agree. <Link href="/privacy" className="underline">Privacy notice</Link></p>
          <div className="mt-4 flex gap-3">
            <button type="button" onClick={() => decide("granted")} className="min-h-12 rounded-full bg-brand-900 px-6 font-semibold text-white hover:bg-brand-600">Accept</button>
            <button type="button" onClick={() => decide("denied")} className="min-h-12 rounded-full border border-brand-900/40 px-6 font-semibold text-brand-900 hover:bg-brand-100">Decline</button>
          </div>
        </div>
      )}
    </>
  );
}
