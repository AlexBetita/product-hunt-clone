import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom'
import { updateProduct, removeProduct, viewOneProduct } from '../../store/products';


import './EditProductPage.css'

const EditProductPage = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  let maker = false;

  useEffect(()=> {
    const viewProduct = async () => {
      await dispatch(viewOneProduct(id))
    }
    viewProduct()

  }, [])

  let product = useSelector((state)=>{
    try{
        if(state.session.products[id].id === state.products.viewedProducts[id].id){
          maker = true
        }
      }
    catch(e) {
      //
    }
      return state.products.viewedProducts[id]
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

  const deleteProduct = async (e) => {
    e.preventDefault()
    await dispatch(removeProduct({id}))
    history.push('/')
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
        <button onClick={deleteProduct}>
          DELETE
        </button>
      </div>
    </>
  )
};

export default EditProductPage;
