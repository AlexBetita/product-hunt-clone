import { NavLink } from 'react-router-dom';


import './CreateDiscussionsPage.css'


const CreateDiscussionsPage = () => {
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
                    <div className='create__discussions__styles'>
                        <div>
                            <form className='create__discussions__form'>
                                <label className='create__discussions__title__style'>
                                    <div className='div__create__discussions__title__style'>
                                        <span className='create__discussions__title'>
                                            Title
                                        </span>
                                    </div>
                                    <input
                                    className='input__create__discussions__title'
                                    placeholder='Try to describe what this discussion will be about'
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
                                                placeholder='Write your message here or create a poll (Top right icon)'
                                                className='text__area__create__discussions'>

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
