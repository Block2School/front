import Editor from "@monaco-editor/react";

export default function MyEditor ({ theme, lang, onChange, defaultValue}) {

    return (
        <>
            <Editor
                height="100%"
                width="100%"
                theme={theme}
                language = {lang}
                defaultLanguage="javascript"
                defaultValue={defaultValue}
                onChange={onChange}
            />
        </>
    );
}