import { webnnEditorFiles } from '../editor-files-webnn.js';
import { onnxruntimeEditorFiles } from '../editor-files-onnxruntime.js';
import { transformersjsEditorFiles } from '../editor-files-transformersjs.js';
import { liteRTEditorFiles } from '../editor-files-litert.js';
import { Cards } from 'nextra/components'
import { Html5Icon, VanillaIcon, SvelteIcon, ReactIcon, VueIcon } from '../../../_components/icons/js_frameworks.jsx'
import { TransformersjsIcon, OnnxIcon, WebNNIcon, LiteRTIcon } from '../../../_components/icons/editor.jsx'

export default function Page() {
  // Function to generate cards from editorFiles
  const generateCards = (j, files) => {
    const cards = [];
    const js = ["vanilla", "react", "static", "vue", "svelte"];
    
    // Traverse through examples in editorFiles
    Object.entries(files).forEach(([exampleId, exampleData]) => {
      // Check if the example has at least one of the specified frameworks
      const hasJs = js.some(framework => framework in exampleData);
      
      // Only add card if it has title, description, and at least one framework
      if (exampleData.title && exampleData.description && hasJs) {
        cards.push({
          id: exampleId,
          exampleId: exampleId,
          title: exampleData.title,
          description: exampleData.description,
          href: `./${j}/${exampleId}`
        });
      }
    });

    return cards;
  };

  const webnnCards = generateCards("webnn", webnnEditorFiles);
  const onnxruntimeCards = generateCards("onnxruntime", onnxruntimeEditorFiles);
  const transformersjsCards = generateCards("transformersjs", transformersjsEditorFiles);
  const litertCards = generateCards("litert", liteRTEditorFiles);

  return (
    <div className="min-h-screen md:px-8 xl:px-8">
      <h2 className="text-4xl font-title light-color !text-center pt-4 mt-4">Playground</h2>
      <h3 className="text-2xl font-title light-color px-4">ONNX Runtime Web</h3>
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {onnxruntimeCards.map((card) => (
            <Cards.Card
              key={card.id}
              icon={<OnnxIcon />}
              title={card.title}
              description={card.description}
              href={card.href}
            />
          ))}
        </div>
      </div>
      <h3 className="text-2xl font-title light-color px-4">WebNN</h3>
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {webnnCards.map((card) => (
            <Cards.Card
              key={card.id}
              icon={<WebNNIcon />}
              title={card.title}
              description={card.description}
              href={card.href}
            />
          ))}
        </div>
      </div>
      <h3 className="text-2xl font-title light-color px-4">Transformers.js</h3>
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {transformersjsCards.map((card) => (
            <Cards.Card
              key={card.id}
              icon={<TransformersjsIcon />}
              title={card.title}
              description={card.description}
              href={card.href}
            />
          ))}
        </div>
      </div>
      <h3 className="text-2xl font-title light-color px-4">LiteRT</h3>
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {litertCards.map((card) => (
            <Cards.Card
              key={card.id}
              icon={<LiteRTIcon />}
              title={card.title}
              description={card.description}
              href={card.href}
            />
          ))}
        </div>
      </div>  
    </div>
  );
}