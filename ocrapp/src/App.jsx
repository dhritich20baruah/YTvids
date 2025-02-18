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
    const file = e.target.files[0]; //e.target.files is an array-like object containing selected files. files[0] gets the first file.
    setImage(URL.createObjectURL(file)) //URL.createObjectURL(file) generates a temporary URL for the file. This URL allows us to display the image without uploading it to a server.
  }

  const performOCR = () => { //This function performs OCR (Optical Character Recognition) on an image.
    if(!image) return; //If no image is provided, the function returns immediately and does nothing.
    setLoading(true); //This updates the state to indicate that OCR processing has started.
    Tesseract.recognize(image, "eng", { //Runs OCR on the given image. "eng": Specifies the English language model for text recognition.
      logger: (m) => console.log(m), //Logs the OCR progress to the console.
    }).then((result)=>{ //Once OCR is complete, it returns a result object.
      if(result && result.data && result.data.text){ 
        setText(result.data.text); //If OCR successfully detects text, it updates the state with setText(result.data.text).
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
            <div className='m-10'>
              <h3 className='font-bold'>Extracted Text</h3>
              <textarea cols={70} rows={100} className='my-5 p-4 shadow-lg shadow-black'>{text}</textarea>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App
