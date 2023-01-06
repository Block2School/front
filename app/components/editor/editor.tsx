import Editor from "@monaco-editor/react";

export default function MonacoEditor ({ theme, lang, onChange, defaultValue, onMount, options }: { theme: any, lang: any, onChange: any, defaultValue: any, onMount:any, options:any }) {

    return (
        <Editor
            height="100%"
            width="100%"
            theme={theme}
            language = {lang}
            defaultLanguage="javascript"
            defaultValue={defaultValue}
            onChange={onChange}
            onMount={onMount}
            options={options}
        />
    );
}