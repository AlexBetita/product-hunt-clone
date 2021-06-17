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
  const [errors, setErrors] = useState([]);

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

    let newErrors = [];

    if(title.length < 3){
      newErrors.push('Title is to short, minimum 3 chars')
    } else if(title.length > 40){
      newErrors.push('Title too long, maximum 40 chars')
    }

    if(tagline.length < 3){
      newErrors.push('Tagline is to short, minimum 3 chars')
    } else if(tagline.length > 50){
      newErrors.push('Tagline is to long, maximum 50 chars')
    }

    if(description.length > 2500){
      newErrors.push('Description is too long, limit 2500')
    }

    setErrors(newErrors)
    if(!newErrors.length){
      setErrors([]);
      await setLoading(true)
      await dispatch(postProduct({title, tagline, description, thumbnail})).then(()=>history.push('/'))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
          await setLoading(false)
        }
      });
    }
    await setLoading(false)
  }

  const fileUpload = (e) =>{
    const file = e.target.files[0]
    if(file) setThumbnail(file);
  }

  return (
    <>
      <ul>
          {errors.map((error, idx) =>
          <li key={idx}>{error}</li>)
          }
      </ul>
      <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                Title
              </label>
              <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    />
            </div>

            <div>
              <label>
                Tagline
              </label>
              <input
                    type="text"
                    value={title}
                    onChange={(e) => setTagline(e.target.value)}
                    required
                    />
            </div>

            <div>
              <label>
                Description
              </label>
                <textarea
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      />
            </div>

            <div>
              <input
                    type='file'
                    onChange={fileUpload}
                  />
            </div>

            <div>
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
            </div>
          </form>
      </div>
    </>
  )
};

export default Post;
