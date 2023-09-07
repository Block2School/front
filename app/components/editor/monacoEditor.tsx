import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
// import Editor, { useMonaco } from "@monaco-editor/react";

export default function MonacoEditor({ theme, lang, onChange, defaultValue, onMount, options }: { theme: any, lang: any, onChange: any, defaultValue: any, onMount: any, options: any }) {

    // const monaco = useMonaco();
    const [usedLang, setUsedLang] = useState(lang);

    useEffect(() => {
        if (lang == "py") setUsedLang("python");
        else if (lang == "js") setUsedLang("javascript");
        else if (lang == "cpp") setUsedLang("cpp");
        else if (lang == "c") setUsedLang("c");
        else if (lang == "R") setUsedLang("r");
        else if (lang == "solidity") setUsedLang("solidity");
        else setUsedLang("javascript");
        console.log("usedLang is: ", usedLang);
    }, [lang, usedLang]);

    return (
        <Editor
            height="100%"
            width="100%"
            theme={theme}
            language={usedLang}
            defaultLanguage="javascript"
            defaultValue={defaultValue}
            onChange={onChange}
            onMount={onMount}
            options={options}
        />
    );
}