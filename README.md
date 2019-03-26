[![Build Status](https://travis-ci.com/nyu-software-engineering/instrument-exchange.svg?branch=master)](https://travis-ci.com/nyu-software-engineering/instrument-exchange)
<h1>README</h1>  

<h3>History</h3>  
The project was designed by developer Jonathan Wang who was influenced by his musical interests growing up. Seeking to introduce newcomers to music, he sought an opportunity to provide them with a platform that would allow anyone to sample new instruments or practice in private studios regardless of social or economic status.

<h3>Instrument Exchange</h3>  
Instrument Exchange is an online platform designed to enable instrument and studio owners to list their equipment and space for rental or sale. This platform enables aspiring musicians to trial new instruments from other instrument owners. The interface will be very similar to Ebay or Craigslist where consumers are able to browse on an easily navigable interface where they are able to filter by a number of attributes including location, price, instrument, user rating, and condition of instrument. Users can sign up on the website and browse instruments and studios in their local area for lease or sale as well as list their own equipment for others to view. In signing up, all users will have dual ability to list their own instruments as well as purchase from others. Furthermore, the product will possibly aspire to implement a function to introduce a social media like platform that enables others to seek performances in listing their expertise, as well as list music lessons that others would be able to purchase.   

<h3>Technologies</h3>  
The project will utilize JavaScript/React as a frontend framework to allow users to easily navigate the platform.   
In addition, the unit testing framework Mocha will be used to complement our use of JavaScript.   
MongoDB will be used as a database platform to maintain users' data and transaction history to record all products listed and purchased as well as user profile information such as login and password.     
The authentication software used to ensure security will be Passport.js. A file system will be used to maintain all photos listed by sellers.  
Monetary transactions through our platform will be securely done through implementing PayPal.   

<h2>Getting Started</h2>   
This project has yet to reach the stage of a minimum viable product. However, more detailed instructions to come on how to install the project on your local machine. To contribute to our project, kindly clone or fork a git repository on to begin.

<h3>Prerequisites</h3>   
Before working on this project, ensure that there is a **MongoDB instance** running on the local machine.     

Official links can be found here:  
- [Node.js](https://nodejs.org/en/download/) - Backend framework used   
- [Passport.js](http://www.passportjs.org/) - Used to ensure login authentication    
- [React.js](https://facebook.github.io/react-native/docs/getting-started.html) - Web interface framework    
- [MongoDB](https://docs.mongodb.com/manual/administration/install-community/) - Database platform for user data     
- [Mocha](https://mochajs.org/#installation) - Unit testing framework    

<h3>Installing</h3>  
Navigate to the `application_code` directory run the command `npm install` to install all the packages required for this project to run.

<h3>Running the tests</h3>     
Run the command `npm test` to run all the unit tests written. To generate `code coverage` report run the command `npm run test-with-coverage`

<h3>Running the Application</h3>
Navigate to the `application_code` directory run the command `node app.js`. As mentioned in the **Prerequisite** section, make sure that you already have a **MongoDB instance** running before you run this command.

<h3>Links</h3>  

For more information, please read our [REQUIREMENTS.md](https://github.com/nyu-software-engineering/instrument-exchange/blob/master/REQUIREMENTS.md)

If you would like to contribute to our project, please refer to [CONTRIBUTING.md](CONTRIBUTING.md) for instructions.
