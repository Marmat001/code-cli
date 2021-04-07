import MonacoEditor, { EditorDidMount } from '@monaco-editor/react'
import prettier from 'prettier'
import parser from 'prettier/parser-babel'
import { useRef } from 'react'
import './code-editor.css'
import './syntax.css'
import Highlighter from 'monaco-jsx-highlighter'
import codeShift from 'jscodeshift'

interface CodeEditorProps {
  initialValue: string
  onChange(value: string): void
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  initialValue,
  onChange,
}) => {
  const editorRef = useRef<any>()

  const onEditorDidMount: EditorDidMount = (getCode, monacoEditor) => {
    editorRef.current = monacoEditor
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getCode())
    })

    const highlighter = new Highlighter(
      //@ts-ignore
      window.monaco,
      codeShift,
      monacoEditor
    )

    highlighter.highLightOnDidChangeModelContent(
      () => {},
      () => {},
      undefined,
      () => {}
    )

    // monacoEditor.getModel()?.updateOptions({ tabSize: 6 })
  }

  const handleFormat = () => {
    const unformattedCode = editorRef.current.getModel().getValue()

    const formattedCode = prettier
      .format(unformattedCode, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, '')

    editorRef.current.setValue(formattedCode)
  }

  return (
    <div className='editor-container'>
      <button
        className='button button-format primary-button is-small'
        onClick={handleFormat}
      >
        Format Code
      </button>
      <MonacoEditor
        value={initialValue}
        editorDidMount={onEditorDidMount}
        options={{
          automaticLayout: true,
          fontSize: 16,
          scrollBeyondLastLine: false,
          showUnused: false,
          wordWrap: 'on',
          lineNumbersMinChars: 3,
          minimap: { enabled: false },
          folding: false,
        }}
        language='javascript'
        theme='dark'
        height='100%'
      />
    </div>
  )
}
