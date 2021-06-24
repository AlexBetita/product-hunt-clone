## Welcome to ProductHuntClone
## Live link: [ProductHuntClone](https://producthuntclone.herokuapp.com/)

Producthuntclone is my best attempt at cloning [producthunt's](https://www.producthunt.com/) overall design and functionalites, it's a web application that allow uers to post products that they wanna pitch, made or hunt for. As an annonymous user you can only view all products posted, disucssions and comments. As a registered user you can posts new products, create discussions, create comments, upvote products or discussions, follow users, and search for users, products and discussions.

##### Table of Contents
1. [Getting Started](#getting_started)
2. [Technologies Used](#technologies)
3. [Key Featues](#key_features)
4. [Wiki](#wiki)

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



##### Database Schema
![image](https://user-images.githubusercontent.com/77173456/119290595-a4c07e80-bc01-11eb-99dd-2e98f2a01690.png)
