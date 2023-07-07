# Fetch Rewards Backend Exercise
The following web service fulfills the documented API for processing receipts and retrieving points awarded per receipt Id. Points are calculated and awarded based on a number
of different guidelines that are outlined in the exercise instructions.

## Dependencies:
* [Node](https://nodejs.org/en)
* [Express](https://expressjs.com/)
* [Express-Validator](https://www.npmjs.com/package/express-validator)
* [Chai](https://www.chaijs.com/)
* [Chai-http](https://www.chaijs.com/plugins/chai-http/)
* [Mocha](https://mochajs.org/)

## Setup
* Node Version 10.0.0 or higher must be installed. If you do not have Node installed, please download from the link in the Dependencies section.
  You can check the version of node you have locally by running:
	```
	node --version
	```
* Clone repository:
	```
	git clone https://github.com/nbhattacharyya/Fetch_Rewards_Backend_Exercise.git
	```
* Install dependencies (npm, the Node Package Manager, comes with the installation of Node):
	```
	npm i
	```
* Starting the service:
	```
	npm start
	```
Succesful starting of the server should be indicated by the following in terminal:
	```
	Server running on port: http://localhost:3000
	```
You can validate further by putting the url in your browser and seeing the following:
	```
	Server started succesfully!
	```

## Testing API's with Postman
* Download [Postman](https://www.postman.com/)
* Create an account or login
* The following screenshots show a few different tests for the two API calls (the example payloads can be found in the process_receipt_example_payloads folder):
>![Post_Request_One](/postman_images/post_request_one.png)

>![Get_Request_One](/postman_images/get_request_one.png)

## Unit Tests
You can run the unit tests with the following command:
```
npm test
```

