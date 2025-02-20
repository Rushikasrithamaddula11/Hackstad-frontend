import React, { useState, useRef } from 'react';
import { Editor } from '@monaco-editor/react';
import axios from 'axios';

const LANGUAGE_VERSIONS = {
  javascript: '18.15.0',
  typescript: '5.0.3',
  python: '3.10.0',
  java: '15.0.2',
  csharp: '6.12.0',
  php: '8.2.3',
};

const CODE_SNIPPETS = {
  javascript: `function greet(name) {
  console.log("Hello, " + name + "!");
}

greet("World");`,
  typescript: `type Params = {
  name: string;
}

function greet(data: Params) {
  console.log("Hello, " + data.name + "!");
}

greet({ name: "World" });`,
  python: `def greet(name):
    print("Hello, " + name + "!")

greet("World")`,
  java: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`,
  csharp: `using System;

namespace HelloWorld {
    class Hello { 
        static void Main(string[] args) {
            Console.WriteLine("Hello World in C#");
        }
    }
}`,
  php: `<?php
$name = 'World';
echo "Hello, " . $name . "!";
?>`,
};

// Memoized API instance
const API = axios.create({
  baseURL: 'https://emkc.org/api/v2/piston',
  timeout: 10000,
});

const executeCode = async (language, sourceCode) => {
  try {
    const response = await API.post('/execute', {
      language,
      version: LANGUAGE_VERSIONS[language],
      files: [{ content: sourceCode }],
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to execute code');
  }
};

const LanguageSelector = ({ language, onSelect }) => (
  <div className="mb-4">
    <label className="block text-white text-lg mb-2">Select Language:</label>
    <select
      value={language}
      onChange={(e) => onSelect(e.target.value)}
      className="w-full p-2 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:border-blue-500"
    >
      {Object.keys(LANGUAGE_VERSIONS).map((lang) => (
        <option key={lang} value={lang}>
          {lang.charAt(0).toUpperCase() + lang.slice(1)}
        </option>
      ))}
    </select>
  </div>
);

const Output = ({ output, isLoading, isError }) => (
  <div className="h-[75vh] p-4 border rounded-lg overflow-auto font-mono text-sm">
    {isLoading ? (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    ) : output ? (
      <pre className={`whitespace-pre-wrap ${isError ? 'text-red-400' : 'text-green-400'}`}>
        {output}
      </pre>
    ) : (
      <span className="text-gray-400">Click "Run Code" to see the output here</span>
    )}
  </div>
);

const Compiler = () => {
  const editorRef = useRef(null);
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [value, setValue] = useState(CODE_SNIPPETS.javascript);

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setValue(CODE_SNIPPETS[newLanguage]);
  };

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleRunCode = async () => {
    if (!editorRef.current) return;
    
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode.trim()) return;

    setIsLoading(true);
    setOutput('');
    setIsError(false);

    try {
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output);
      setIsError(!!result.stderr);
    } catch (error) {
      setIsError(true);
      setOutput(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <LanguageSelector language={language} onSelect={handleLanguageChange} />
            <div className="h-[600px] rounded-lg overflow-hidden border border-gray-700">
              <Editor
                height="100%"
                language={language}
                value={value}
                onChange={setValue}
                onMount={handleEditorDidMount}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>
          </div>
          <div>
            <button
              onClick={handleRunCode}
              disabled={isLoading}
              className="mb-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Running...' : 'Run Code'}
            </button>
            <Output output={output} isLoading={isLoading} isError={isError} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compiler;