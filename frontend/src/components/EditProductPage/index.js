import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { updateProduct } from '../../store/products';

import './EditProductPage.css'

const EditProductPage = () => {
  const {id} = useParams();
  const dispatch = useDispatch();

  let maker = false;

  const product = useSelector((state)=>{
    try{
      if(state.products[id].id === state.session.products[id].id){
        maker = true
      }
    } catch(e) {
      //
    }
    return state.products[id]
  })

  const [title, setTitle] = useState(product?.title);
  const [tagline, setTagline] = useState(product?.tagline)
  const [description, setDescription] = useState(product?.description);
  const [thumbnail, setThumbnail] = useState(product?.thumbnail);

  if(!product){
    return (
      <>
        Product does not exists
      </>
    )
  }

  if(!maker){
    return (
      <>
        You don't own this product
      </>
    )
  }

  const updateFile = async (e) => {
    const file = e.target.files[0]
    if(file) setThumbnail(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    await dispatch(updateProduct({title, tagline, description, thumbnail, id: product.id}))

  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>

          <label>
            Titlle
          </label>
          <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                />

          <label>
            Tagline
          </label>
          <input
                value={title}
                onChange={(e) => setTagline(e.target.value)}
                required
                />

          <label>
            Description
          </label>
          <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                />

          <img src={product?.thumbnail}>

          </img>

          <input type='file' onChange={updateFile}/>

          <button type='submit'>SAVE CHANGES</button>
        </form>
      </div>
    </>
  )
};

export default EditProductPage;
