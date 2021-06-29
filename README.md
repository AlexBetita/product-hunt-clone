## Welcome to ProductHuntClone
## Live link: [ProductHuntClone](https://producthuntclone.herokuapp.com/)

Producthuntclone is my best attempt at cloning [producthunt's](https://www.producthunt.com/) overall design and functionalites, it's a web application that allow uers to post products that they wanna pitch, made or hunt for. As an annonymous user you can only view all products posted, disucssions and comments. As a registered user you can posts new products, create discussions, create comments, upvote products or discussions, follow users, and search for users, products and discussions.

##### Table of Contents
1. [Getting Started](#getting_started)
2. [Technologies Used](#technologies)
3. [Key Featues](#key_features)
4. [Code Snippets](#code_snippets)
5. [Wiki](#wiki)

<a name="getting_started"/>

##### Getting Started

1. Clone this repository
2. Install dependencies `npm install`
3. Create a `.env` file based on the `.env.example`
4. Set up your PostgreSQL user and password.
5. Make sure to create the db `npx dotenv sequelize-cli db:create`
6. Migrate the models `npx dotenv sequelize-cli db:migrate`
7. Populate the data with seeders found in "backend/db/seeders" `npx dotenv sequelize-cli db:seed:all`
8. Now run the application `npm start`

<a name="technologies"/>

### Technologies Used

<!-- For more icons please follow  https://github.com/MikeCodesDotNET/ColoredBadges -->
<img src="https://github.com/devicons/devicon/blob/master/icons/javascript/javascript-original.svg" alt="javaScript" width="50" height="50">
<img src="https://github.com/devicons/devicon/blob/master/icons/html5/html5-original.svg" alt="html" width="50" height="50">
<img src="https://github.com/devicons/devicon/blob/master/icons/css3/css3-original.svg" alt="css" width="50" height="50">
<img src="https://github.com/devicons/devicon/blob/master/icons/express/express-original.svg" alt="express" width="50" height="50">
<img src="https://github.com/devicons/devicon/blob/master/icons/git/git-original.svg" alt="git" width="50" height="50">
<img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original.svg" alt="react" width="50" height="50">
<img src="https://github.com/devicons/devicon/blob/master/icons/redux/redux-original.svg" alt="redux" width="50" height="50">
<img src="https://github.com/devicons/devicon/blob/master/icons/npm/npm-original-wordmark.svg" alt="redux" width="50" height="50">


<a name="code_snippets"/>

### Code Snippets

#### Implementation of infinite scroll for products with the use of an external library lodash.
Why lodash? It provides a fully implemented throttler function, what is a throttler function? Basically it throttles multiple function calls and limits it to the most latest call, reason for it being needed in infinite scroll is when you scroll an event fires and for this particular use case as soon as you reach bottom of the page without a throttler multiple scroll events fire even when you have logic that supports current scroll coordinate == bottom document height.


```javascript
  const products = useSelector((state)=>{
    return state.products.list.map((productId) => state.products[productId])
  })

  let pageCounter = 1
  const throttler = _.throttle(scroll, 500)

  let sortedProducts = {}
  
  Object.keys(products).map((key) =>{
    let str = products[key].createdAt
    str = str.substring(0, str.length - 4);
    if(!sortedProducts[str]){
      sortedProducts[str] = []
      return sortedProducts[str].push(products[key])
    } else {
      return sortedProducts[str].push(products[key])
    }
  })

  useEffect(()=>{
    if(window.addEventListener){
      window.addEventListener('scroll', throttler, true);
      window.addEventListener('scroll', scrollToTopChecker);
    }
    return function cleanup(){
      window.removeEventListener('scroll', throttler, true);
      window.removeEventListener('scroll', scrollToTopChecker);
    }

  }, [throttler])

  const setNextPage = async () => {
    await dispatch(getProducts(pageCounter + 1))
    pageCounter += 1
  }

  function scroll(){
    const pixelFromTopToBottom = Math.max(document.documentElement.scrollTop,document.body.scrollTop);
    if((pixelFromTopToBottom+document.documentElement.clientHeight) >= document.documentElement.scrollHeight ){
      setNextPage()
    }
  }
```

#### Implementation of the upvotes feature for products

This block of code checks the current users upvotes and applies a class `voted__true` to the corresponding element.
If there is no current user logged on then no change happens on the element and the first line of code makes it so that non logged in users,
can't upvote
```javascript
const [disableVote, setDisableVote] = useState(false)
let upvoted = useSelector((state)=>{
    if(state.session.user){
      user = state.session.user
      for (const [key, value] of Object.entries(state.session.upvotes)){
        if(key){
          if(products.id === value.id){
            return true
          }
        }
      }
    }
  })

  useEffect(() => {
    if(upvoted){
      upvoteElementRef.current.classList.add('voted__true')
    }
  },[user, upvoted])
```


This block of code makes it so users can't spam the upvote button in quick succession, only allowing them to click the button
after the dispatch finishes, it also makes an animation when an upvote occurs through the use of that setTimeout.

```javascript
const vote = async () =>{
    if(user){
      if (upvoteElementRef.current.classList.contains('voted__true')){

        setDisableVote(true)
        await upvoteElementRef.current.classList.remove('voted__true')
        await dispatch(voteProduct(products.id))
        setUpvotes(getUpvotes - 1)
        setDisableVote(false)
      } else {
        setDisableVote(true)
        await triangleRef.current.classList.add('hidden')

        await circleRef.current.classList.remove('hidden')
        await circleRef.current.classList.add('scale')

        setTimeout(()=>{
          triangleRef.current.classList.remove('hidden')
          circleRef.current.classList.remove('scale')
          circleRef.current.classList.add('hidden')
        }, 200)
        await upvoteElementRef.current.classList.add('voted__true')

        await dispatch(voteProduct(products.id))
        setUpvotes(getUpvotes + 1)
        setDisableVote(false)
      }
    }
  }
```



### Database Schema
![image](https://user-images.githubusercontent.com/77173456/119290595-a4c07e80-bc01-11eb-99dd-2e98f2a01690.png)
