import Image from "next/image";
import { Inter, Tektur } from "next/font/google";
import { useState } from "react";
import QRCode from "qrcode";

const inter = Inter({ subsets: ["latin"] });
const validURL = (str) => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
};

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [inputError, setInputError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [qrcode, setQrcode] = useState("");
  const [qrcodeloading, setQrcodeloading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (originalUrl !== "") {
      if (validURL(originalUrl)) {
        setLoading(true);
        const response = await fetch("/api/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ originalUrl }),
        });

        const data = await response.json();
        setShortUrl(data.shortUrl);
        setLoading(false);
      } else {
        setInputError(true);
        setLoading(false);
      }
    } else {
      setInputError(true);
      setLoading(false);
    }
  };

  const getValidURL = (url) => {
    if (url.includes("http://") || url.includes("https://")) {
      return url;
    }
    return "http://" + url;
  };

  const GenerateQRCode = () => {
    setQrcodeloading(true);
    QRCode.toDataURL(getValidURL(shortUrl), (err, shortUrl) => {
      if (err) return console.log(err);

      console.log(shortUrl);
      setQrcode(shortUrl);
      setQrcodeloading(false);
    });
  };

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">ATOM</a>
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
              tabIndex={2}
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
                  aria-label="Dim"
                  value="dim"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-4 flex justify-center items-center flex-col min-h-screen">
        <div className="card w-full h-72 bg-base-100 shadow-xl md:w-1/2 lg:w-1/2 xl:w-1/2">
          <div className="card-body">
            <h1 className="text-2xl font-bold mb-4 text-center ">
              URL Shortener
            </h1>
            <form className="flex justify-around mt-4" onSubmit={handleSubmit}>
              <div className="w-8/12 md:w-1/2">
                <input
                  type="text"
                  placeholder="Enter URL"
                  className={`input w-full input-bordered ${
                    inputError ? "input-error" : ""
                  } max-w-xs p-3 mr-2 border`}
                  value={originalUrl}
                  onChange={(e) => {
                    setOriginalUrl(e.target.value);
                    setInputError(false);
                  }}
                />
                {inputError && (
                  <div className="mt-2 text-red-600">Invalid URL</div>
                )}
              </div>
              <button type="submit" className="btn btn-primary">
                Shorten
              </button>
            </form>
            {loading && (
              <div className="flex justify-center">
                <span className="loading loading-dots loading-lg"></span>
              </div>
            )}
            {shortUrl && (
              <div className="mt-4 flex flex-col justify-evenly items-center lg:flex-col ">
                <div className="flex items-center">
                  <label className="font-bold mr-2">Short URL:</label>
                  <a
                    href={getValidURL(shortUrl)}
                    target="_blank"
                    className="link link-hover"
                  >
                    {getValidURL(shortUrl)}
                  </a>
                </div>
                <div className="dropdown mt-3" onClick={GenerateQRCode}>
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn m-1 btn-primary"
                  >
                    QR Code
                    {qrcodeloading && (
                      <span className="loading loading-spinner"></span>
                    )}
                  </div>
                  <ul
                    tabIndex={2}
                    className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52"
                  >
                    <li>
                      <img src={qrcode}></img>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* <div className="container mx-auto p-4 flex justify-center items-center flex-col min-h-screen">
        <div class="card lg:card-side bg-base-100 shadow-xl">
          <figure>
            <img src="/shortImage.png" alt="Album" />
          </figure>
          <div class="card-body">
            <h2 class="card-title">New album is released!</h2>
            <p>Click the button to listen on Spotiwhy app.</p>
            <div class="card-actions justify-end">
              <button class="btn btn-primary">Listen</button>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
