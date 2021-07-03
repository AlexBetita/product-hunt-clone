import { NavLink, useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postDiscussion } from '../../store/discussions';

import './CreateDiscussionsPage.css'


const CreateDiscussionsPage = () => {
    const history = useHistory();
    const dispatch = useDispatch()

    const [discussion, setDiscussion] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        let newErrors = [];

        if(discussion.length < 4){
            newErrors.push('Title is too short minimum 4 chars')
        } else if (discussion.length > 100){
            newErrors.push('Dicussion is too long maximum 100 chars')
        }

        if(message.length < 5){
            newErrors.push('Message is too short minimum 5 chars')
        } else if (message.length > 2500){
            newErrors.push('Message is too long maximum 2500 chars')
        }

        if (!newErrors.length){
            setErrors([]);
            await dispatch(postDiscussion({ discussion, message }))
                .catch(async (res) =>{
                    const data = await res.json();
                    if (data && data.errors){
                        newErrors = data.errors;
                        setErrors(newErrors);
                    }
                })
            history.push('/discussions')
        }

        setErrors(newErrors)

        return setErrors
    }

    return (
        <>
            <div className='div__create__discussions__page__styles'>
                <div className='div__create__discussions__main'>
                    <div className='div__create__discussions__link'>
                        <ul>
                            <li>
                                <NavLink to='/discussions'>
                                    Discussions
                                </NavLink>
                            </li>
                            <li>
                                <span>
                                {`  →  `}
                                </span>
                                <NavLink to='/discussions/new'>
                                    Start a discussion
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <ul>
                        {errors.map((error, idx) => <li className='errors__create__discussions' key={idx}>{error}</li>)}
                    </ul>
                    <div className='create__discussions__styles'>
                        <div>
                            <form
                                onSubmit={handleSubmit}
                                className='create__discussions__form'>
                                <label className='create__discussions__title__style'>
                                    <div className='div__create__discussions__title__style'>
                                        <span className='create__discussions__title'>
                                            Title
                                        </span>
                                    </div>
                                    <input
                                    type='text'
                                    className='input__create__discussions__title'
                                    placeholder='Try to describe what this discussion will be about'
                                    value={discussion}
                                    onChange={(e)=>setDiscussion(e.target.value)}
                                    >
                                    </input>
                                </label>
                                <div className='div__create__discussions__message__style'>
                                        <label className='label__create__discussions__message'>
                                            <div className='div__create__discussions__message__style'>
                                                <span className='create__discussions__message'>
                                                    Your message
                                                </span>
                                            </div>
                                            <div>
                                                <textarea
                                                type="textarea"
                                                placeholder='Write your message here or create a poll (Top right icon)'
                                                className='text__area__create__discussions'
                                                value={message}
                                                onChange={(e)=>setMessage(e.target.value)}
                                                >
                                                </textarea>
                                            </div>
                                        </label>
                                    </div>
                                <button className='button__create__discussions__post'>
                                    POST
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='div__create__discussions__side'>
                    <div className='div__create__discussions__side__style'>
                        <div className='div__create__discussions__side__content'>
                            <div>
                                <span>
                                👋
                                </span>
                                Be kind and respectful
                            </div>
                            <div>
                                Our community exists to support and encourage people to learn and
                                build things. Keep in mind that your fellow community
                                members might have more or less experience than you but
                                deserve just as much respect. Do not troll or harass people.
                            </div>
                            <div>
                                <span>
                                🚫
                                </span>
                                No advertisement or self-promotion
                            </div>
                            <div>
                                While it is encouraged to discuss your projects and share links to collect feedback,
                                it is not okay to use the discussions and comments to
                                advertise your products or force-feed them to other people.
                            </div>
                            <div>
                                <span>
                                🔗
                                </span>
                                Links in discussions and comments
                            </div>
                            <div>
                                It is acceptable to share links to your projects to
                                collect feedback or share an article you wrote
                                that might benefit the community. Spamming the
                                community by sharing the same links in discussions and
                                comments will not be tolerated.
                            </div>
                            <div>

                            </div>
                            <div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateDiscussionsPage;
