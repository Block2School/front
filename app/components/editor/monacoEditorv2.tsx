import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";

export default function MonacoEditor({
  theme, lang, onChange,
  defaultValue, onMount, options,
  height, width
}: {
  theme: any, lang: any, onChange: any,
  defaultValue: any, onMount: any, options: any,
  height: string, width: string
}) {

  const [usedLang, setUsedLang] = useState(lang);

  useEffect(() => {
    if (lang == "py") setUsedLang("python");
    else if (lang == "js") setUsedLang("javascript");
    else if (lang == "cpp") setUsedLang("cpp");
    else if (lang == "c") setUsedLang("c");
    else if (lang == "R") setUsedLang("r");
    else if (lang == "solidity") setUsedLang("solidity");
    else setUsedLang("javascript");
  }, [lang, usedLang]);

  return (
    <Editor
      height={height}
      width={width}
      theme={theme}
      language={usedLang}
      defaultLanguage="python"
      defaultValue={defaultValue}
      onChange={onChange}
      onMount={onMount}
      options={options}
    />
  );
}