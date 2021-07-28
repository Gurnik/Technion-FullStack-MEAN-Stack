# Technion-FullStack-MEAN-Stack
This repo contains both:
1.  Node.js
2.  Angular

To run locally, do as follows:
1.  Clone this repo
2.  Open your terminal and navigate to the Server folder.
3.  Run node install
4.  Run npm start
5.  Navigate to the Client folder and run node install.
6.  run ng serve

Note:
In Robo 3T, create database called: usersDB
Then create a collection called: users
Make sure, schema structure is as follows:
{
    "name": "Avi Cohen",
    "email": "avic@gmail.com",
    "street": "Herzel",
    "city": "Haifa",
    "zipcode": 41200,
    "tasks": [
        {
            "title": "Learn Front End",
            "completed": false
        },
        {
            "title": "Learn NodeJS",
            "completed": true
        },
        {
            "title": "Build Projects",
            "completed": false
        }
    ],
    "posts": [
        {
            "title": "Some Title...",
            "body": "Some body..."
        },
        {
            "title": "Some Title...",
            "body": "Some body..."
        }
    ]
}
