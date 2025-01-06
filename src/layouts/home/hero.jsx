import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { BoltIcon, SparklesIcon } from "@heroicons/react/24/outline";

export default function Hero() {
  const router = useRouter();
  let locale = "en";
  if (router.route.indexOf("/en")) {
    locale = "en";
  }
  if (router.route.indexOf("/zh")) {
    locale = "zh";
  }

  return (
    <div className="z-10 w-full md:w-2/5 lg:w-1/3 px-6 md:px-0 pt-8 md:pt-16 lg:pt-20 pb-2 md:pb-16 lg:pb-20 items-center justify-items-base backdrop-blur-[1px] 
    static md:absolute left-0 md:left-8 lg:left-16 xl:left-20 2xl:left-24">
      <h1 className="font-title tracking-[-0.02rem] text-3xl lg:text-4xl xl:text-5xl 2xl:text-5xl mb-4 font-black">
        WebNN: Neural Network Acceleration for the Web
      </h1>
      <div>
        Web Neural Network API, a new web standard will play a pivotal role in
        the future of web development by enabling seamless integration of
        artificial intelligence (AI) directly within web browsers, allowing for
        faster, more efficient AI-powered applications on user devices.
      </div>
      <div className="my-8">
        <Link
          href="/learn/quickstart"
          locale={locale}
          className="button-highlight px-4 md:px-6 py-2 md:py-3"
        >
          <BoltIcon className="w-5 h-5 mr-1 inline-flex" /> Quickstart
        </Link>
        <Link
          href="/faq/overview"
          locale={locale}
          className="button-outline ml-4 px-4 md:px-6 py-2 md:py-3"
        >
          <SparklesIcon className="w-5 h-5 mr-1 inline-flex" /> FAQ
        </Link>
      </div>
    </div>
  );
}
