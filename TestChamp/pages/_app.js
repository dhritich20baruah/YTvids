import { useState } from 'react'
import '../styles/globals.css'
import {ScoreStateContext} from '../components/Context'

function MyApp({ Component, pageProps }) {
  const [score, setScore] = useState(0)
  
  return <>
  <ScoreStateContext.Provider value={{score, setScore}}>
  <Component {...pageProps} />
  </ScoreStateContext.Provider>
  </>
}

export default MyApp
