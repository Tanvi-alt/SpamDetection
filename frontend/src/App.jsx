import React, { useState } from "react";

const App = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkSpam = async () => {
    if (!text.trim()) return;

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: text }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-md w-[400px]">
        <h1 className="text-2xl font-bold text-center mb-4">
          Spam Email Detector
        </h1>

        <textarea
          className="w-full p-3 border rounded-md focus:outline-none focus:ring"
          rows="5"
          placeholder="Paste email text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={checkSpam}
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Checking..." : "Check Spam"}
        </button>

        {result && (
          <div
            className={`mt-4 text-center text-lg font-semibold ${
              result.is_spam ? "text-red-600" : "text-green-600"
            }`}
          >
            {result.result}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
