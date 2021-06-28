import { useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';

import {getDiscussions} from '../../store/discussions';
import Discussion from '../Discussion';

import './DiscussionsPage.css'

const DiscussionsPage = () =>{

  const dispatch = useDispatch();

  const discussions = useSelector((state)=>{
    return state.discussions.list.map((discussionId)=> state.discussions[discussionId])
  })

  useEffect(()=>{
    dispatch(getDiscussions())
  }, [dispatch])

  if (!discussions) {
    return null;
  }

  return (
    <>
      <div className='div__discussion__cointainer'>
        <div className='div__discussion__page__styles'>
          <div>
            {Object.keys(discussions).map((key)=>{
              return <Discussion key={key} discussion={discussions[key]}/>
            })}
          </div>
        </div>
        <div className='div__create__discussion'>
            <NavLink to={'/discussions/new'}
                     className='navlink__discussions'
            >
              <span className='span__discussions'>
                CREATE NEW DISCUSSION
              </span>
            </NavLink>
        </div>
      </div>
    </>
  )
};

export default DiscussionsPage;
