import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import BoltIcon from './icons/bolt.jsx'
import FaqIcon from './icons/faq.jsx'

export default function HeroCh() {
  const router = useRouter();
  let locale = "en";
  if (router.route.indexOf("/en")) {
    locale = "en";
  }
  if (router.route.indexOf("/zh")) {
    locale = "zh";
  }

  return (
    <div className="xl:col-span-2 px-6 md:px-8 xl:pl-20 xl:pr-4 2xl:pl-24 pt-8 md:pt-24 lg:pt-24 pb-2 md:pb-16 lg:pb-20 items-center justify-items-base backdrop-blur-[1px]">
      <h1 className="font-title tracking-[-0.02rem] text-3xl lg:text-4xl xl:text-5xl 2xl:text-5xl mb-4 font-black">
        WebNN: Web 端侧推理加速
      </h1>
      <div>
      Web Neural Network (WebNN) API 允许 Web 开发者在浏览器中通过 TypeScript 或 JavaScript 运行人工智能模型。利用端侧 CPU, GPU 或 NPU 加速，WebNN 能显著提升 AI 应用的性能和效率。
      </div>
      <div className="my-8">
        <Link
          href="/learn/get-started/quickstart"
          locale={locale}
          className="button-highlight px-4 md:px-6 py-2 md:py-3"
        >
          <BoltIcon className="w-5 h-5 mr-1 inline-flex" /> 快速开始
        </Link>
        <Link
          href="/faq/overview"
          locale={locale}
          className="button-outline ml-4 px-4 md:px-6 py-2 md:py-3"
        >
          <FaqIcon className="w-5 h-5 mr-1 inline-flex" /> 常见问题
        </Link>
      </div>
    </div>
  );
}
