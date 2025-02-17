import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Tesseract from 'tesseract.js'

function App() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false)

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file))
  }

  const performOCR = () => {
    if(!image) return;
    setLoading(true);
    Tesseract.recognize(image, "eng", {
      logger: (m) => console.log(m),
    }).then((result)=>{
      if(result && result.data && result.data.text){
        setText(result.data.text);
      }else{
        console.error("OCR result is missing text")
      }
      setLoading(false)
    }).catch((err)=>{
      console.error(err);
      setLoading(false)
    });
  }

  return (
    <>
      <h1 className='text-center font-bold text-2xl m-10'>TEXT EXTRACTOR USING OCR</h1>
      <div className='m-10 p-5 shadow-lg shadow-black rounded-md'>
        <label htmlFor="image" className='text-lg'>
          Choose Image to Extract Text From:
        </label>
        <br /><br />
        <input type="file" name="image" id="image" accept='image'onChange={handleImageUpload} className='border-2 border-gray-400'/>
        {image && (<button className='shadow-lg shadow-black p-2 bg-red-700 m-5 text-white' onClick={()=>window.location.reload()}>Choose Another</button>)}
      </div>
      <div className='md:flex w-[100%] md:m-10'>
        {image && (
          <div className='md:w-[40%] w-full shadow-lg shadow-black p-10 md:mx-10 rounded-md'>
            <img src={image} alt="Uploaded"/>
            <button className='shadow-lg shadow-black p-2 bg-red-700 my-5 text-white' onClick={performOCR}>{loading ? "Processing..." : "Extract Text"}</button>
          </div>
        )}
        <div>
          {text && (
            <div>
              <h3>Extracted Text</h3>
              <textarea cols={50} rows={100}>{text}</textarea>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App
