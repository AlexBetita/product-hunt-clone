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

  let product = useSelector((state)=>{
      if(state.session?.products[id]?.id === state?.products?.viewedProducts[id]?.id){
        maker = true
      }
      return state.products.viewedProducts[id]
  })

  useEffect(()=> {
    const viewProduct = async () => {
      await dispatch(viewOneProduct(id))
    }
    viewProduct()
  }, [dispatch, id])

  const [title, setTitle] = useState(product?.title);
  const [tagline, setTagline] = useState(product?.tagline)
  const [description, setDescription] = useState(product?.description);
  const [thumbnail, setThumbnail] = useState(product?.thumbnail);
  const [errors, setErrors] = useState([]);

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

    let newErrors = [];


    if(title !== undefined){
      if(title.length < 3){
        newErrors.push('Title is to short, minimum 3 chars')
      } else if(title.length > 40){
        newErrors.push('Title too long, maximum 40 chars')
      }
    }

    if(tagline !== undefined){
      if(tagline.length < 3){
        newErrors.push('Tagline is to short, minimum 3 chars')
      } else if(tagline.length > 50){
        newErrors.push('Tagline is to long, maximum 50 chars')
      }
    }

    if(description !== undefined){
      if(description.length > 2500){
        newErrors.push('Description is too long, limit 2500')
      }
    }

    setErrors(newErrors)
    if(!newErrors.length){
      setErrors([]);

      //To prevent errors on refresh this whole line of code was implemented
      const _title = title ? title : product.title;
      const _tagline = tagline ? tagline : product.tagline;
      const _description = description ? description : product.description;
      const _thumbnail = thumbnail ? thumbnail : product.thumbnail;

      await dispatch(updateProduct({"title": _title, "tagline": _tagline, "description": _description, "thumbnail": _thumbnail, id: product.id}))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    }

  }

  const deleteProduct = async (e) => {
    e.preventDefault()
    setErrors([]);
    await dispatch(removeProduct({id}))
      .then(()=> history.push('/'))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  }

  return (
    <>
      <div>
        <ul>
            {errors.map((error, idx) =>
            <li key={idx} className="error">{error}</li>)
            }
        </ul>
        <form onSubmit={handleSubmit}>

          <label>
            Titlle
          </label>
          <input
                value={title || product?.title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
          <label>
            Tagline
          </label>
          <input
                value={tagline || product?.tagline}
                onChange={(e) => setTagline(e.target.value)}
                required
                />

          <label>
            Description
          </label>
          <textarea
                value={description || product?.description}
                onChange={(e) => setDescription(e.target.value)}
                required
                />

          <img src={product?.thumbnail} alt='product thumbnail'>

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
