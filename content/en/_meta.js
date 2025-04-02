export default {
  index: {
    title: 'Home',
    display: 'hidden',
    type: 'page',
    theme: {
      typesetting: 'article',
      toc: false,
      timestamp: false,
      layout: 'full'
    }
  },
  learn: {
    title: 'Learn',
    type: 'page',
  },
  'api-reference': {
    title: 'Reference',
    type: 'page',
  },
  faq: {
    title: 'FAQ',
    type: 'page',
  },
  showcase: {
    title: 'Showcase',
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
    title: 'Spec',
    type: 'page',
    href: 'https://www.w3.org/TR/webnn/',
  }
}