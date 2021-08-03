# Claim-listing-screen
Claim listing screen with User Management

#### Installation
After download or clone this use ```npm run install``` command to install the environment

#### Run as application
Use ```npm run server``` command to run this application

The default port number is ```5000```.

ex: ```http://localhost:5000/api/user/register```


#### API Routes

| REQUEST METHOD | URL | Description |
| ---- | ---- | ---- |
| POST | /api/user/register | **Create user API**. ***firstname, lastname, email, role, password*** is mandatory *address, city, pincode* are optional |
| POST | /api/user/login | **Authenticate user and generate JWT token**. ***email, password*** is mandatory |
| POST | /api/user/resetpassword | **Reset password API**. ***newpassword, confirmpassword*** is mandatory also need to provide token in **Authorization** header. <br/>ex: ```Authorization : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.........```|
| GET | /api/user/listallusers | **List user API (only for user role admin)**. Provide token in **Authorization** header. <br/>ex: ```Authorization : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.........```|
| GET | /api/claims/listclaims/page/limit | **List claims API parameters for page and limit**. <br/> ```page``` and ```limit``` must be number. Need to provide token in **Authorization** header |
