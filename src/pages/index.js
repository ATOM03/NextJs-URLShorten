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
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn m-1">
              Theme
              <svg
                width="12px"
                height="12px"
                className="h-2 w-2 fill-current opacity-60 inline-block"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 2048 2048"
              >
                <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52"
            >
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="Default"
                  value="default"
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="Retro"
                  value="retro"
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="Cyberpunk"
                  value="cyberpunk"
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="Valentine"
                  value="valentine"
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="Aqua"
                  value="aqua"
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="Forest"
                  value="forest"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-4 flex justify-center items-center flex-col min-h-screen">
        <div className="card w-100 h-100 bg-primary text-primary-content">
          <div className="card-body">
            <h1 className="text-2xl font-bold mb-4">URL Shortener</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter URL"
                className="input input-bordered max-w-xs p-3 mr-2 border"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
              />
              <button type="submit" className="btn">
                Shorten
              </button>
            </form>
            {shortUrl && (
              <div className="mt-4">
                <label className="font-bold mr-10">Short URL:</label>
                <a href={getValidURL(shortUrl)} target="_blank">
                  {getValidURL(shortUrl)}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
