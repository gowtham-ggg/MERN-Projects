import React, { useEffect, useState } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
import axios from "axios";

const App = () => {
  const [code, setCode] = useState("");
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false); // ✅ Loading state

  const url = import.meta.env.VITE_BACKEND_URL;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCode(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  const reviewCode = async () => {
    try {
      setIsLoading(true); // ✅ Start loading
      console.log("Sending code for review...", code);
      const response = await axios.post(
        url,
        { prompt: code },
        { headers: { "Content-Type": "application/json" } }
      );
      setReview(response.data.response);
    } catch (error) {
      console.error("Error reviewing code:", error.response?.data || error.message);
      setReview("❌ Failed to fetch review. Check console for details.");
    } finally {
      setIsLoading(false); // ✅ Stop loading
    }
  };

  useEffect(() => {
    prism.highlightAll();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-6 gap-6">
      <header className="w-full text-center py-4 text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg rounded-lg">
        AI Code Reviewer 🤖
      </header>

      <div className="flex flex-row gap-6 w-full max-w-6xl">
        <div className="w-1/2 h-full bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 overflow-auto">
          <input
            type="file"
            accept=".js,.jsx,.ts,.tsx,.py,.cpp,.c,.cs,.java,.rb,.swift,.go,.php,.html,.css,.json,.xml,.sh,.bat,.rs,.kt,.lua,.pl,.r,.dart,.sql,.md,.yaml,.yml,.ini,.toml"
            onChange={handleFileUpload}
            className="mb-4 text-sm text-gray-400 rounded-lg cursor-pointer bg-gray-700"
          />
          <div className="border border-gray-600 rounded-lg bg-gray-900 p-4 whitespace-pre-wrap">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: "Fira Code, monospace",
                fontSize: 16,
              }}
            />
          </div>
          <button
            className={`w-full py-3 text-lg font-semibold text-white rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-500 hover:to-blue-600 shadow-lg transform transition duration-300 ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:scale-105 hover:shadow"
            } mt-2 flex justify-center items-center`}
            onClick={reviewCode}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z"></path>
                </svg>
                Reviewing...
              </>
            ) : (
              "Review Code 🛫"
            )}
          </button>
        </div>

        <div className="w-1/2 h-full bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 overflow-auto">
          <Markdown rehypePlugins={[rehypeHighlight]} components={{ p: ({ node, ...props }) => <p {...props} className="text-gray-300" /> }}>
            {isLoading ? "⌛ **Reviewing your code... Please wait!**" : review || "No review available."}
          </Markdown>
        </div>
      </div>
    </div>
  );
};

export default App;
