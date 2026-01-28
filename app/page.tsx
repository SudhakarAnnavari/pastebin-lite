"use client";
import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [views, setViews] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/pastes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          ttl_seconds: ttl ? Number(ttl) : undefined,
          max_views: views ? Number(views) : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      setUrl(data.url);
      setContent("");
      setTtl("");
      setViews("");
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-black">
          Pastebin Lite
        </h1>

        <textarea
          className="w-full border border-gray-300 rounded-md p-3 resize-none h-40 mb-4 focus:ring-2 focus:ring-gray-400 focus:outline-none text-black"
          placeholder="Enter your text here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="flex gap-4 mb-4">
          <input
            type="number"
            className="w-1/2 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-gray-400 focus:outline-none text-black"
            placeholder="TTL (seconds)"
            value={ttl}
            onChange={(e) => setTtl(e.target.value)}
            min={1}
          />
          <input
            type="number"
            className="w-1/2 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-gray-400 focus:outline-none text-black"
            placeholder="Max Views"
            value={views}
            onChange={(e) => setViews(e.target.value)}
            min={1}
          />
        </div>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <button
          onClick={submit}
          disabled={loading}
          className="w-full bg-black text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition"
        >
          {loading ? "Creating..." : "Create Paste"}
        </button>

        {url && (
          <div className="mt-4 bg-gray-50 border border-gray-300 rounded-md p-3 break-all">
            <p className="text-black font-medium mb-1">Shareable URL:</p>
            <a
              href={url}
              target="_blank"
              className="text-black hover:underline"
            >
              {url}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
