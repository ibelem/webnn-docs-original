"use client"

import React, { useState, useEffect } from 'react';
import { Sandpack } from "@codesandbox/sandpack-react";
import { useTheme } from 'nextra-theme-docs';
import { editorFiles, themeDark, themeLight } from './config.js';
import { Html5Icon, VanillaIcon, SvelteIcon, ReactIcon, VueIcon } from '../../_components/icons/js_frameworks.jsx'
import { TransformersjsIcon, OnnxIcon, WebNNIcon, LiteRTIcon } from '../../_components/icons/editor.jsx'

export default function Page() {
  const { theme, setTheme } = useTheme();
  let editorTheme = themeLight;
  console.log(`theme: ${theme}`);
  (theme === 'dark') ? editorTheme = themeDark : editorTheme = themeLight;

  const [js, setJs] = useState(() => {
    const saved = localStorage.getItem('selectedJs');
    return saved || 'vanilla';
  });

  const [framework, setFramework] = useState(() => {
    const saved = localStorage.getItem('selectedFramework');
    return saved || 'webnn';
  });

  useEffect(() => {
    localStorage.setItem('selectedJs', js);
  }, [js]);

  useEffect(() => {
    localStorage.setItem('selectedFramework', framework);
  }, [framework]);

  let files = editorFiles[js][framework];

  const isSelected = (type, value) => {
    return type === 'js' ? js === value : framework === value;
  };

  const handleJsChange = (newJs) => {
    setJs(newJs);
  };

  const handleFrameworkChange = (newFramework) => {
    setFramework(newFramework);
  };

  return (
    <div className="md:px-8 xl:px-8 mb-8">
      <div className="mx-1 md:mx-0 playground-nav">
        <div className="self-center flex flex-row">
          <h2 className="pl-4 text-xl md:text-2xl font-title light-color py-1">
            Playground
          </h2>
          <div className="selected-framework-js ml-4 self-center">
            {/* Only show currently selected icons */}
            {framework === 'webnn' && <WebNNIcon />}
            {framework === 'onnxruntime' && <OnnxIcon />}
            {framework === 'transformersjs' && <TransformersjsIcon />}
            {framework === 'litert' && <LiteRTIcon />}
            {js === 'static' && <Html5Icon />}
            {js === 'vanilla' && <VanillaIcon />}
            {js === 'svelte' && <SvelteIcon />}
            {js === 'react' && <ReactIcon />}
            {js === 'vue' && <VueIcon />}
          </div>
        </div>
        <div className="self-center">
          <div className={`pg-framework ${framework}`}>
            <button
              className="webnn hover:cursor-pointer"
              onClick={() => handleFrameworkChange('webnn')}
            >
              <WebNNIcon className="webnn"/>
              <span className={`ml-[4px] text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 ${framework === 'webnn' ? 'text-gray-800 dark:text-gray-200' : ''
                }`}>
                WebNN
              </span>
            </button>
            <button
              className="onnx hover:cursor-pointer"
              onClick={() => handleFrameworkChange('onnxruntime')}
            >
              <OnnxIcon className="onnx" />
              <span className={`ml-[4px] text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 ${framework === 'onnxruntime' ? 'text-gray-800 dark:text-gray-200' : ''
                }`}>
                ONNX Runtime
              </span>
            </button>
            <button
              className="transformersjs hover:cursor-pointer"
              onClick={() => handleFrameworkChange('transformersjs')}
            >
              <TransformersjsIcon className="transformersjs" />
              <span className={`ml-[4px] text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 ${framework === 'transformersjs' ? 'text-gray-800 dark:text-gray-200' : ''
                }`}>
                Transformers.js
              </span>
            </button>
            <button
              className="litert hover:cursor-pointer"
              onClick={() => handleFrameworkChange('litert')}
            >
              <LiteRTIcon className="litert" />
              <span className={`ml-[4px] text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 ${framework === 'litert' ? 'text-gray-800 dark:text-gray-200' : ''
                }`}>
                LiteRT
              </span>
            </button>
          </div>
          <div className={`pg-js ${js}`}>
            <button
              className="static hover:cursor-pointer"
              onClick={() => handleJsChange('static')}
            >
              <Html5Icon className="static"/>
              <span className={`ml-[4px] text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 ${js === 'static' ? 'text-gray-800 dark:text-gray-200' : ''
                }`}>
                HTML5
              </span>
            </button>
            <button
              className="vanilla hover:cursor-pointer"
              onClick={() => handleJsChange('vanilla')}
            >
              <VanillaIcon className="vanilla"/>
              <span className={`ml-[4px] text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 ${js === 'vanilla' ? 'text-gray-800 dark:text-gray-200' : ''
                }`}>
                Vanilla
              </span>
            </button>
            <button
              className="svelte hover:cursor-pointer"
              onClick={() => handleJsChange('svelte')}
            >
              <SvelteIcon className="svelte" />
              <span className={`ml-[4px] text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 ${js === 'svelte' ? 'text-gray-800 dark:text-gray-200' : ''
                }`}>
                Svelte
              </span>
            </button>
            <button
              className="react hover:cursor-pointer"
              onClick={() => handleJsChange('react')}
            >
              <ReactIcon className="react" />
              <span className={`ml-[4px] text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 ${js === 'react' ? 'text-gray-800 dark:text-gray-200' : ''
                }`}>
                React
              </span>
            </button>
            <button
              className="vue hover:cursor-pointer"
              onClick={() => handleJsChange('vue')}
            >
              <VueIcon className="vue" />
              <span className={`ml-[4px] text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 ${js === 'vue' ? 'text-gray-800 dark:text-gray-200' : ''
                }`}>
                Vue
              </span>
            </button>
          </div>
        </div>
      </div>
      <Sandpack className="!mx-1 md:!mx-0"
        template={js}
        theme={editorTheme}
        options={{
          editorHeight: 532,
          showLineNumbers: true
        }}
        customSetup={{ 
          dependencies: { 
            "svelte": "^5.22.6",
            "@huggingface/transformers": "^3.4.0"
          }
        }}
        files={files}
      />
    </div>
  )
}