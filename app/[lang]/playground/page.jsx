"use client"

import React, { useState, useEffect } from 'react';
import { Sandpack } from "@codesandbox/sandpack-react";
import { useTheme } from 'nextra-theme-docs';
import { editorFiles, themeDark, themeLight } from './config.js';
import { VanillaIcon, SvelteIcon, ReactIcon, VueIcon } from '../../_components/icons/js_frameworks.jsx'
import { TransformersjsIcon, OnnxIcon, WebNNIcon } from '../../_components/icons/editor.jsx'

export default function Page() {
  const { theme, setTheme } = useTheme();
  let editorTheme = themeLight;
  console.log(`theme: ${theme}`);
  (theme === 'dark') ? editorTheme = themeDark : editorTheme = themeLight;

  const [template, setTemplate] = useState(() => {
    const saved = localStorage.getItem('selectedTemplate');
    return saved || 'vanilla';
  });
  
  const [framework, setFramework] = useState(() => {
    const saved = localStorage.getItem('selectedFramework');
    return saved || 'webnn';
  });

  useEffect(() => {
    localStorage.setItem('selectedTemplate', template);
  }, [template]);

  useEffect(() => {
    localStorage.setItem('selectedFramework', framework);
  }, [framework]);

  let files = editorFiles[template][framework];

  const isSelected = (type, value) => {
    return type === 'template' ? template === value : framework === value;
  };

  const handleTemplateChange = (newTemplate) => {
    setTemplate(newTemplate);
  };

  const handleFrameworkChange = (newFramework) => {
    setFramework(newFramework);
  };

  return (
    <div className="md:px-8 xl:px-8 mb-8">
      <div className="mx-4 md:mx-0 md:grid-rows-1 playground-nav">
        <div className="playground-content self-center">
          <h2 className="pl-4 text-base font-title light-color inline-block">
            Playground
          </h2>
          <div className="selected-framework-template inline-block ml-2">
            {/* Only show currently selected icons */}
            {framework === 'webnn' && <WebNNIcon />}
            {framework === 'onnxruntime' && <OnnxIcon />}
            {framework === 'transformers.js' && <TransformersjsIcon />}
            {template === 'vanilla' && <VanillaIcon />}
            {template === 'svelte' && <SvelteIcon />}
            {template === 'react' && <ReactIcon />}
            {template === 'vue' && <VueIcon />}
          </div>
        </div>
        <div className="playground-content justify-self-end self-center">
          {/* Framework buttons */}
          <button 
            className="hover:cursor-pointer"
            onClick={() => handleFrameworkChange('webnn')}
          >
            <WebNNIcon /> 
            <span className={`ml-[4px] text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 ${
              framework === 'webnn' ? 'text-gray-800 dark:text-gray-200' : ''
            }`}>
              WebNN
            </span>
          </button>
          <button 
            className="hover:cursor-pointer"
            onClick={() => handleFrameworkChange('onnxruntime')}
          >
            <OnnxIcon /> 
            <span className={`ml-[4px] text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 ${
              framework === 'onnxruntime' ? 'text-gray-800 dark:text-gray-200' : ''
            }`}>
              ONNX Runtime Web
            </span>
          </button>
          <button 
            className="hover:cursor-pointer"
            onClick={() => handleFrameworkChange('transformers.js')}
          >
            <TransformersjsIcon /> 
            <span className={`ml-[4px] text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 ${
              framework === 'transformers.js' ? 'text-gray-800 dark:text-gray-200' : ''
            }`}>
              Transformers.js
            </span>
          </button>

          {/* Template buttons */}
          <button 
            className="hover:cursor-pointer"
            onClick={() => handleTemplateChange('vanilla')}
          >
            <VanillaIcon /> 
            <span className={`ml-[4px] text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 ${
              template === 'vanilla' ? 'text-gray-800 dark:text-gray-200' : ''
            }`}>
              Vanilla
            </span>
          </button>
          <button 
            className="hover:cursor-pointer"
            onClick={() => handleTemplateChange('svelte')}
          >
            <SvelteIcon /> 
            <span className={`ml-[4px] text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 ${
              template === 'svelte' ? 'text-gray-800 dark:text-gray-200' : ''
            }`}>
              Svelte
            </span>
          </button>
          <button 
            className="hover:cursor-pointer"
            onClick={() => handleTemplateChange('react')}
          >
            <ReactIcon /> 
            <span className={`ml-[4px] text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 ${
              template === 'react' ? 'text-gray-800 dark:text-gray-200' : ''
            }`}>
              React
            </span>
          </button>
          <button 
            className="hover:cursor-pointer"
            onClick={() => handleTemplateChange('vue')}
          >
            <VueIcon /> 
            <span className={`ml-[4px] text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 ${
              template === 'vue' ? 'text-gray-800 dark:text-gray-200' : ''
            }`}>
              Vue
            </span>
          </button>
        </div>
      </div>
      <Sandpack className="!mx-4 md:!mx-0" 
      template={template}
      theme={editorTheme}
      options={{
        editorHeight: 566, 
        showLineNumbers: true
      }}
      files={files}
      />
    </div>
  )
}