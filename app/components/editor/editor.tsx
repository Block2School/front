import Editor from "@monaco-editor/react";

export default function MyEditor ({ theme, lang, onChange, defaultValue }: { theme: any, lang: any, onChange: any, defaultValue: any }) {

    return (
            <Editor
                height="100%"
                width="100%"
                theme={theme}
                language = {lang}
                defaultLanguage="javascript"
                defaultValue={defaultValue}
                onChange={onChange}
            />
    );
}