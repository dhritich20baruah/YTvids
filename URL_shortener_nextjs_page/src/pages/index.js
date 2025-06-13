import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState('');
  const [short, setShort] = useState('');

  const shorten = async () => {
    const res = await fetch('/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ longUrl: url }),
    });
    const data = await res.json();
    setShort(`${window.location.origin}/${data.shortCode}`);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-white text-3xl">URL SHORTENER</h1>
          <div className="text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            <lable className="mb-2 tracking-[-.01em]">
              Paste the URL you want to shorten
            </lable>
            <br />
            <input type="url" value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter your long URL here"
              required className="md:w-full bg-white p-2 text-black rounded-md" name="longurl" id="longurl" />
          </div>
          <button
            className="rounded-md mt-5 border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            onClick={shorten}
          >
            Shorten
          </button>

        {short && (
          <div className="w-full bg-blue-50 border border-blue-200 p-4 rounded-lg flex flex-col items-center space-y-3">
            <p className="text-gray-700 text-lg font-medium">Your Shortened URL:</p>
            <a
              href={short}
              className="text-blue-700 hover:underline text-xl font-semibold break-all text-center"
            >
              {short}
            </a>
          </div>
        )}
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center text-white">
        Powered by Next.js, Firebase & Tailwind CSS
      </footer>
    </div>
  );
}
