import { useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { postProduct } from "../../store/products";

import './Post.css';

const Post = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const history = useHistory();

  const user = useSelector((state)=>{
    return state.session.user
  })

  if(!user){
    return (
      <>
        Please Sign Up
      </>
    )
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();

    const results = await dispatch(postProduct({title, description, thumbnail}))

    console.log('RESULTS', results)

    history.push('/')
  }

  const fileUpload = (e) =>{
    const file = e.target.files[0]
    if(file) setThumbnail(file);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Title
        </label>
        <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              />

        <label>
          Description
        </label>
        <textarea
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              />

        <input
          type='file'
          onChange={fileUpload}
        >
        </input>

        <button type='submit'>
          Submit Product
        </button>
      </form>
    </>
  )
};

export default Post;
