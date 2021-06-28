import { NavLink  } from "react-router-dom";

const Comments = ({product, index}) => {
    return (
        <>
            <li key={index}>
                <h4>
                    {product.Comments[index].comment}
                </h4>
                <div>
                    {`Commented by: `}
                    <NavLink to={`/@${product.Comments[index].User.username}`}>
                        <img
                            className='img__product__details__profileimage'
                            src={product.Comments[index].User.profileImage}
                            alt='profile icon'
                        />
                    </NavLink>
                    @{product.Comments[index].User.username}
                </div>
            </li>
        </>
    )
}

export default Comments;
