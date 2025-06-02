import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleShorten = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setShortUrl('');

    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ longUrl }),
      });

      const data = await response.json();

      if (response.ok) {
        setShortUrl(data.shortUrl);
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (error) {
      setError('Failed to connect to the server.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }


  const copyToClipboard = () => {
    if (shortUrl) {
      // Using document.execCommand('copy') as navigator.clipboard.writeText()
      // might not work due to iFrame restrictions in some environments.
      const el = document.createElement('textarea');
      el.value = shortUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      alert('Short URL copied to clipboard!'); // Using alert for simplicity, consider a custom modal in production.
    }
  };
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-white text-3xl">URL SHORTENER</h1>
        <form onSubmit={handleShorten}>
          <div className="text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            <lable className="mb-2 tracking-[-.01em]">
              Paste the URL you want to shorten
            </lable>
            <br />
            <input type="url" value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              placeholder="Enter your long URL here"
              required className="md:w-full bg-white p-2" />
          </div>
          <button
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Shortening...' : 'Shorten URL'}
          </button>
        </form>

        {shortUrl && (
          <div className="w-full bg-blue-50 border border-blue-200 p-4 rounded-lg flex flex-col items-center space-y-3">
            <p className="text-gray-700 text-lg font-medium">Your Shortened URL:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline text-xl font-semibold break-all text-center"
            >
              {shortUrl}
            </a>
            <button
              onClick={copyToClipboard}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              Copy to Clipboard
            </button>
          </div>
        )}

        {error && (
          <div className="w-full bg-red-100 border border-red-400 text-red-700 p-3 rounded-lg text-center">
            {error}
          </div>
        )}
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
