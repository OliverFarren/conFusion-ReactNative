# conFusion-ReactNative

## About
Developed through Coursera learning course:<br>
-- Full-Stack Web Development with React Specialization<br>
-- Jogesh K. Muppala h <br>
-- The Hong Kong University of Science and Technology<br>

## Contents

Demo Ristorante conFusion phone app that explores key ReactNative library concepts

## How to Run

Ensure you have the expo-cli downloaded onto a mobile device. This project was developed using Android. While there _shouldn't_ be any compatibility issues using the React Native app on an Android or IOS device, this hasn't been fully tested.

Start the project in your terminal using

To start using the application, go to your terminal, in the root directory of this project and type:

```
git clone https://github.com/OliverFarren/conFusion-ReactNative
```

Next you will need to install all the packages:

```
npm install package.json
npm install -g json-server
```

This will install all the packages needed to successfully start up the application. 

Now start the React App


First you will need to run the json-server in a terminal:

```
cd json-server
json-server --watch db.json --host 192.168.1.194 -p 3010 -d 2000
```

N.B. the ip address needs to match your local Ipv4 address. This can be checked in Wifi-Hardware Properties on Windows.

Now you can start running the app.

In a new terminal run:

```
npm start
```

This will install the expo-cli 

next run the expo client

```
expo start
```

This will generate a QR code that can be scanned by the mobile Expo-Cli to load the web-app
