import { useRef, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { Box, HStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");
  const Email = useParams();

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  return (
                  <header className="registration-header">
                    <div className="container">
                        <div className="logo">
                            <a href="index.html">ZCoder</a>
                        </div>
                        <nav>
                            <ul>
                            <li className="link">
                                    <a href={"/Home/"+Email.email+"/"+Email.name}>Home</a>
                                </li>
                                <li className="link">
                                    <a href={"/savedProblems/"+Email.email+"/"+Email.name}>Save Code</a>
                                </li>
                                <li className="link">
                                    <a href={"/CodeEditor/"+Email.email+"/"+Email.name}>Code Editor</a>
                                </li>
                                <li className="link">
                                    <a href={"/chatRoom/"+Email.email+"/"+Email.name}>Chat Room</a>
                                </li>
                                <li className="link">
                                    <a href={"/"}>Logout</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <Box className="CodeEditorbox">
                      <HStack spacing={4}>
                        <Box w="50%">
                          <LanguageSelector language={language} onSelect={onSelect} />
                          <Editor
                            options={{
                              minimap: {
                                enabled: false,
                              },
                            }}
                            height="75vh"
                            theme="vs-dark"
                            language={language}
                            defaultValue={CODE_SNIPPETS[language]}
                            onMount={onMount}
                            value={value}
                            onChange={(value) => setValue(value)}
                          />
                        </Box>
                        <Output editorRef={editorRef} language={language} />
                      </HStack>
                    </Box>
                  </header>

  );
};
export default CodeEditor;