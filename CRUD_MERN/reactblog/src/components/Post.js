import React, {useContext} from 'react'
import { itemStateContext } from './Context'
import { Link } from 'react-router-dom'
import parse from 'html-react-parser'

const Post = () => {
  const { post, setpost } = useContext(itemStateContext)

  return (
    <>
    <div className='container'>
      <h2>{post.title}</h2>
      <h5>{post.snippet}</h5>
      <p>{parse(post.blogBody)}</p>
    </div>
    </>
  )
}

export default Post