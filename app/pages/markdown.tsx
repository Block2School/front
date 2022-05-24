import React from "react";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import { useEffect, useState } from "react";
import remarkGfm from 'remark-gfm'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dark} from 'react-syntax-highlighter/dist/cjs/styles/prism'
import {docco} from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import {atomOneDark} from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import MarkdownRenderer from "../components/markdown/markdown";

export default function MarkdownTest() {
  const link = "https://raw.githubusercontent.com/Block2School/tutorials/master/en/introduction_tutorial.md";
  const link2 = "https://raw.githubusercontent.com/Block2School/tutorials/master/en/test_file.md";

  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    axios.get(link2).then(res => {
      console.log('res == ', res.data);
      setMarkdown(res.data);
    });
  }, []);

  const test = "\
# Introduction\n\n\
```js\n\
import React from 'react';\n\
```\n\n\
## What is Block2School?\n";

  return (
    <>
      <Navbar />
      <div style={{ height: '90vh', width: "50%", backgroundColor: '#0c1118', color: 'white', boxSizing: 'content-box', overflow: 'hidden scroll', flexWrap: 'nowrap', paddingLeft: '25px', paddingRight: '25px' }}>
        {/* <ReactMarkdown
          remarkPlugins={[remarkGfm]}
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
          {markdown}
        </ReactMarkdown> */}
        <MarkdownRenderer source={markdown}/>
      </div>
      <Footer />
    </>
  );
}