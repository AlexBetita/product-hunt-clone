# product-hunt-clone

### MVP List
Product Hunt Clone

Features to be implemented:
### 1. New account creation, log in, log out, and demo login.
* Sign up redirects user to the sign up page.
* Log in redirects user back to the home page with authorized permissions.
  * Logged-in users can create, edit, and delete products.
  * Logged-in users can create, edit, and delete discussions.
  * Logged-in users can create, edit, and delete comments.
  * Logged-in users can follow and unfollow users or collections.
  * Logged-in users can upvote or un upvote comments or products.
* Log out redirects user to home page.
* All users can read discussions.
* All users can view products

### 2. Users have access to a profile page
* If Logged-in a user can click on their profile icon which has a drop down that has access to my profile, clicking
  on my profile renders the users profile page.
* Logged-in users only have access to the profile page if not logged in then renders the sign up page.
* Profile page has Logged-in users activity displaying products upvoted, followers, following
* Profile page displays users full name, headline, website url, username, profile image,
  users created products, created collections and followed collections.
* Logged-in users can edit their profiles.
  * Allows Logged-in users to edit their full name, headline, website url, and profile image.

### 3. Create/Post products
* Only Logged-in users has access to a post button otherwise its disabled or hidden which grants them access to create a product and renders
  the create product page.
* Create/Post products renders the create product page.
  * Create product
  * Post product renders user to own products page.
* Own product page allows Logged-in users to:
  * Create product
  * Delete product
  * Edit product
  * Post product
* Posted products will have their own page.
  * Any user can visit a product page
  * Product page displays the products details, owner, discussions/comments, and upvotes
  * If Logged-in users own product they have access to an edit button and view count.
  
  

### Database Schema
![image](https://user-images.githubusercontent.com/77173456/119290595-a4c07e80-bc01-11eb-99dd-2e98f2a01690.png)
