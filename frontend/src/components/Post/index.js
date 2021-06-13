import { useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { postProduct } from "../../store/products";

import './Post.css';

const Post = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [loading, setLoading] = useState(false)

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

    await setLoading(true)

    await dispatch(postProduct({title, description, thumbnail}))

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
          Tagline
        </label>
        <input
              type="text"
              value={title}
              onChange={(e) => setTagline(e.target.value)}
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
        {loading &&
          <>
            <button type='submit' disabled>
              Submit Product
            </button>
            LOADING
          </>
        }
        {!loading &&
          <button type='submit'>
            Submit Product
          </button>
        }

      </form>
    </>
  )
};

export default Post;
