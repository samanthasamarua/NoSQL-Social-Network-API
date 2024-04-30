# NoSQL-Social-Network-API
This project is to build an API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list. You’ll use Express.js for routing, a MongoDB database, and the Mongoose ODM.

# User Story
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data

# Acceptance Criteria
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list

# Installations

Install the following dependencies once repo has been cloned

    "express": "^4.19.2",
    "mongodb": "^6.5.0",
    "mongoose": "^8.3.2",
    "nodemon": "^3.1.0

# Usage

To access the application, follow instructions below:

1. Clone the repository (link below)
2. Open Integrated Terminal
3. Type npm I to install all the dependencies listed above
4. Seed the database by typing in "node utils/seed.js. Navigate to Mongo DB Compass to view the newly   created database and seeded data.
5. Run the server by typing in "node index.js"
6. Navigate to Insomnia and test the routes. Refer to the walkthrough video for reference.


# Github Repository
https://github.com/samanthasamarua/NoSQL-Social-Network-API

# Walkthrough Video
https://drive.google.com/file/d/1UWbFqU8ylZMdif5_MItlOq8hfOxa_c1Y/view?usp=sharing