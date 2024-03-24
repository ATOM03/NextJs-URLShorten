import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ originalUrl }),
    });

    const data = await response.json();
    setShortUrl(data.shortUrl);
  };

  const getValidURL = (url) => {
    if (url.includes("http://") || url.includes("https://")) {
      return url;
    }
    return "http://" + url;
  };
  console.log(shortUrl);

  return (
    <div className="container mx-auto p-4 flex justify-center items-center flex-col min-h-screen">
      <h1 className="text-2xl font-bold mb-4">URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter URL"
          className="p-2 mr-2 border border-gray-300 text-black"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Shorten
        </button>
      </form>
      {shortUrl && (
        <div className="mt-4">
          <label className="font-bold">Short URL:</label>
          <a href={getValidURL(shortUrl)} target="_blank">
            {getValidURL(shortUrl)}
          </a>
        </div>
      )}
    </div>
  );
}
