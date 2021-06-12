import { csrfFetch } from './csrf';

export const LOAD_PRODUCTS = "products/LOAD_PRODUCTS";
export const REMOVE_PRODUCT = "products/REMOVE_PRODUCT";
export const ADD_PRODUCT = "products/ADD_PRODUCT";
export const ADD_ONE_PRODUCT = "products/ADD_ONE_PRODUCT";
const INITIAL_STATE = "products/INITIAL_STATE";

const load = (products) => ({
  type: LOAD_PRODUCTS,
  products
});

const add = (product) => ({
  type: ADD_PRODUCT,
  product
});

const remove = (productId) => ({
  type: REMOVE_PRODUCT,
  productId
});

export const resetState = () => ({
  type: INITIAL_STATE,
});

export const getProducts = page => async dispatch => {
  const response = await fetch(`/api/products/${page}`);
  if (response.ok) {
    const products = await response.json();
    dispatch(load(products));
  }
};

export const getOneProduct = id => async dispatch => {
  const response = await fetch(`/api/products/${id}`);

  if (response.ok) {
    const product = await response.json();
    dispatch(add(product));
  }
};

export const postProduct = payload => async dispatch => {
  const { title, thumbnail, description } = payload;
  const formData = new FormData();

  formData.append("title", title);
  formData.append("description", description);

  if(thumbnail) formData.append("image", thumbnail);

  const response = await csrfFetch(`/api/products`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  })

  if (response.ok){
    const data = await response.json();
    dispatch(add(data))
    return data;
  }
}

export const updateProduct = payload => async dispatch => {
  const { title, thumbnail, description } = payload;
  const formData = new FormData();

  formData.append("title", title);
  formData.append("description", description);

  if(thumbnail) formData.append("image", thumbnail);

  const response = await csrfFetch(`/api/products/${payload.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  })

  if (response.ok){
    const data = await response.json();
    dispatch(add(data))
    return data;
  }
}


const initialState = {
  list: [],
  comments: [],
  upvotes: []
}

const listProducts = (list, state) =>{

  const prodList = []


  delete state['list']
  delete state['comments']
  delete state['upvotes']

  if (state){
    let reverse = Object.keys(state).reverse()
    reverse.forEach(id =>{
      prodList.push(parseInt(id))
    })
  }

  list.forEach(product=>{
    prodList.push(product.id)
  })

  return prodList
}

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS: {
      const allProducts = {};

      action.products.forEach(product=>{
        allProducts[product.id] = product;
      });

      let list = listProducts(action.products, state)

      return {
        ...allProducts,
        ...state,
        list: list
      }
    }
    case ADD_PRODUCT: {
      if(!state[action.product.id]){
        const newState = {
          ...state,
          [action.product.id]: action.product
        };
        newState.list.unshift(action.product.id)
        return newState
      }
      return {
        ...state,
        [action.product.id]: action.product
      };
    }
    case INITIAL_STATE:
      return {...initialState};
    default:
      return state;
  }
}

export default productReducer;
