export default {
  index: {
    'title': 'Web Neural Network API',
    type: 'page',
    display: 'hidden',
    theme: {
      typesetting: 'article',
      toc: false,
      timestamp: false,
      layout: 'full'
    }
  },
  learn: {
    title: '学习',
    type: 'page',
  },
  'api-reference': {
    title: 'API 参考',
    type: 'page',
  },
  faq: {
    title: '常见问题',
    type: 'page',
  },
  showcase: {
    title: '示例',
    type: 'page',
    href: '/showcase'
  },
  playground: {
    type: 'menu',
    title: 'Playground',
    items: {
      webnn: {
        title: 'WebNN API',
        href: '/playground'
      },
      ort: {
        title: 'Transformers.js',
        href: '/playground#transformersjs'
      },
      transformersjs: {
        title: 'ONNX Runtime',
        href: '/playground#onnxruntime'
      },
      litert: {
        title: 'Lite RT',
        href: '/playground#litert'
      }
    }
  },
  spec: {
    title: '规范',
    type: 'page',
    href: 'https://www.w3.org/TR/webnn/',
  }
}