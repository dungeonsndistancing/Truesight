# Truesight

Hello! Truesight is a charactersheet application that allows you to keep track of a all most things related to your Character.

I built this application because I wasn't quite happy with some of the other applications/websites that exist,
while it might not have triumped any or all of the other options that exist it was a fun project It is a open source webapp that you can set up for your own group if you feel like it.

Both to encourage people reading the book and because of copyright reasons the application by default does not contain any material PHB or other books.

an EXAMPLE version of the project is running on https://truesight.thepineapple.dev 
DON'T USE THIS FOR ACTUALLY STORING A CHARACTER LONG TERM, the database will be cleared regularly of accounts, as this is not set up to support a large amount of users.
It is intended purely for demonstration.

## Setup

I will preface the setup by saying that ideally in front of this you have a reverse proxy that can provide you with a secure connection by allowing you to also set up https.
For this I recommend something like NGINX (it's what I used). But given the complexity I cannot provide any assistance in this step.

1. In order to be able to run the project Node.js is needed: https://nodejs.org/ 
   Instructions for this can be found on the web.



2. After first downloading/pulling the project the command `npm install` must be ran in both the `client` and `server` folders.
   This will make sure all the dependencies are installed and the projects can be launched.



3. Both the client and server need a `.env` file containing global variables that should be kept private such as database connection.
   Examples of the `.env`files are as follows:

### 	Client:

```javascript
VUE_APP_SERVER_IP='http(s)://<ipadress>:<port>' //this is the server address that the client corresponds with
VUE_APP_WSS_IP='ws(s)://<ipadress>:<port>'	//this is the address that the websocket connects to, they should probably be the same ipaddress/port combo
```

### 	Server:

```javascript
DATABASE_URL='url containing connection to MongoDB server'
SECRET='secret used for JWT token verification'
TOKEN_TIMEOUT=10800 //token timeout (3 hours in this case)
LONG_TOKEN_TIMEOUT=7889238 //long token timeout (3 months in this case)
PORT=5000 //an example value for the port, pick whatever you want
CLIENT_IP='client frontend url' //this is to ensure that people can only connect to the websocket from the client front-end. 
```

4. As noted in the `.env` files a database is also needed to store the data, you can set up a MongoDB database locally on your system/server https://www.mongodb.com.
   It can also be hosted using MongoDB atlas: https://www.mongodb.com/cloud/atlas

   

5.  When all of that is set up the project can be ran by running the following commands:

   ### Server

   Enter the server folder and run the command`npm run dev ` in the command line.

   ### Client

   Enter the client folder and run the command `npm run serve` in the command line.

   Alternatively the command `npm run build` can be ran to instead build the project into a html webpage.
   When doing this it's important to have a way to offer the webpage you created to the world, for example using NGINX as mentioned at the beginning of setup.

I will end the setup by saying again that ideally in front of this you have a reverse proxy that can provide you with a secure connection by allowing you to also set up https.
For this I recommend something like NGINX (it's what I used). But given the complexity I cannot provide any assistance in this step.



## Future development

For now this project is functional and suited for my personal needs. I will try to fix bugs/makes improvements as needed. 
In the future it might be revisited to improve certain aspects and add more functionality.

As this is open source anyone is free to contribute to this project or fork in and create their own.