import { useSelector } from 'react-redux';

import './Discussion.css'

const Discussion = ({discussion}) => {

  return (
    <>
      <div className='div__discussion'>
        <div className='div__discussion__content'>
          <div>
            <h1>
              {discussion.discussion}
            </h1>
          </div>
          <div>
            {discussion.message}
          </div>
        </div>
      </div>
    </>
  )
};


export default Discussion;
