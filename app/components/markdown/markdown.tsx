import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import { FunctionComponent } from "react";

type MarkdownRendererProps = {
  source: string
};

const MarkdownRenderer: FunctionComponent<MarkdownRendererProps> = ({ source }) => {
  // console.log('source == ', source);
  return (
    <>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={
          ChakraUIRenderer(
            {
              code: ({ node, inline, className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              }
            }
          )
        }
      >
        {source}
      </ReactMarkdown>
    </>
  );
}

export default MarkdownRenderer;