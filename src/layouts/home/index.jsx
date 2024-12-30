import React from 'react';
import { ReactFlow } from '@xyflow/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BoltIcon, SparklesIcon } from '@heroicons/react/24/outline';
 
import '@xyflow/react/dist/style.css';
 
const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export default function Home() {
  const router = useRouter();
  let locale = 'en';
  if(router.route.indexOf('/en')) {
    locale = 'en';
  }
  if(router.route.indexOf('/zh')) {
    locale = 'zh';
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-20 pt-10 lg:pt-14 2xl:pt-18 pb-24 mx-auto max-w-[90rem] pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]">
      <div className="col-span-1 py-12 h-2/6 items-center justify-items-base">
        <h1 className="tracking-[-0.02rem] text-4xl lg:text-5xl mb-4 font-black">WebNN is the <span className="a">Future</span></h1>
        <div>Web Neural Network API, a new web standard will play a pivotal role in the future of web development by enabling seamless integration of artificial intelligence (AI) directly within web browsers, allowing for faster, more efficient AI-powered applications on user devices.</div>
        <div className="my-8">
          <Link href="/learn/quickstart" locale={locale} className='button-highlight'>
            <BoltIcon className="w-5 h-5 mr-1 inline-flex" /> Quickstart
          </Link>
          <Link href="/api-reference/reference" locale={locale} className='button-outline ml-4'>
            <SparklesIcon className="w-5 h-5 mr-1 inline-flex" /> API Reference
          </Link>
        </div>
      </div>
      <ReactFlow className="col-span-1 md:col-span-1 lg:col-span-2" nodes={initialNodes} edges={initialEdges} />
    </div>
  );
}