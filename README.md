### Project-3: HomeMe

### About the Project

HomeMe is a web application for renters in the Greater Los Angeles area who need a more streamlined housing search application with their roommates. HomeMe also allows users to post properties that are available for rent. Unlike RadPad and Zillow, our app lets users communicate with their roommates/housemates during the search process within the same web application avoiding the back and forth email chains.

## Approach Taken
We started with the User model and decided to use Google for our OAuth. Using passport.js, we were able to get this facet of our project done first. Once we realized that we were not going to be able to use a 3rd party API to pull rental information in Los Angeles, we redirected and added to the listings model so that our users could post their own rental listings to home_Me. The next step was to be sure that there was full CRUD for listings. A user can create, read, update, and destroy a listing so long as they have created it. Once a listing is put into the home_Me database, all logged in users can view the listings that match their search parameters.

The Google Maps API was useful in mapping the listings' pins and node-geocoder enriched the data which provided latitude and longitude coordinates to feed into Google maps.

We used socket.io in order to create the chat function of our project. Currently we have a chatroom working, but the private chatrooms are not fully functional.


## MVP

This application will allow a user to create an account or login through OAuth via Google.com.
After an account has been created, the user can search for an apartment using our application's search function.
This data will be rendered through an interactive map through the googlemaps API.
A user can also post a listing if they have a property they would like to rent out.
The application provides further functionality whereby the user can invite potential roommates to join a group.
The functionality of the group feature will facilitate easy communication via a chatroom.

### Technologies Used

1. Javascript
2. HTML5
3. CSS3
4. Node.js
5. Express.js
6. Mongo
7. Mongoose
8. jQuery
9. AJAX
10. HTML5Up Template
11. GoogleMaps API
12. node-geocoder
13. Socket.io
14. Passport.js
15. Amazon S3



### Installation Instructions
Visit https://github.com/Code-Cadets/Project-3 and either clone or download the repo
Use your terminal to go to the directory containing the application files
Type 'npm install' into your terminal
In  a new window under the same directory, type 'mongod' into your terminal.
In  a new window under the same directory, type 'nodemon' into your terminal.
Use your web browser and navigate to 'localhost:3000'
Heroku link: https://projecthomeme.herokuapp.com/

### Known Bugs/ Unsolved Problems
* Users cannot yet favorite or "like" a listing they find.
* Users cannot yet create a group chat and invite friends to join the chat.
* User cannot delete their profile.
* Users cannot click on an individual listing unless  they are planning to edit or delete it.



---
### Pitch Deck

[Link to Pitch Deck](https://docs.google.com/presentation/d/1xGIqvYHterTJOM0Hx6fqo1-Ix0OLbg5R0gXRKM2f8IY/edit?usp=sharing)

---
### Trello Board

[Link to Trello](https://trello.com/b/yGCemAqi/project-3)

---
### Wireframes

![](http://imgur.com/mq0FTIU.png)
![](http://imgur.com/qKqoW6o.png)
![](http://imgur.com/c2spcxJ.png)
![](http://imgur.com/8MhX9hD.png)
![](http://imgur.com/0cc0Ex5.png)

### ERD

![](http://imgur.com/EGOlVdi.png)
