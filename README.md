# BookAShow

Website URL : [Book A Show](https://book-a-show.firebaseapp.com)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` or `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test --code-coverage` to execute the unit tests via [Karma](https://karma-runner.github.io).

# Using BOOK A SHOW Application

# Home Page

Shows the header, which contains company name and buttons such as login, logout, switch theme etc...

Shows the list of currently playing movies inside 'NOW SHOWING' tab based on location( permission should be granted user ). The user can filter the movies based on language, genre, distance and movie details in real-time.

Each movie details will be displayed in card, by clicking on the card user will be navigated to movie details screen where user will be able to see the complete details related to movie. A button named 'BOOK' is present in each card, which on click will take user to booking screen. Share button will also be available, by which user can share the movie details on social platforms like facebook, whatsapp.

Moving to 'NEXT CHANGE' tab, user will be shown with the list of upcoming movies(which are not yet released). Here the movie card consists of icon button with alert functionality, which on click notifies the user on release date through push notification or notification panel in header.Share button is also available which has same functionality as above.

Switch theme is used to toogle between Light and Dark themes.

## Login/Signup

The user can view the login/signup dialog by clicking on login button available in header. Once clicked, the user will be presented two tabs, namely 'Login', 'Signup'. User can select tab based on whether he is an existing user or a new user.

## Login

The users should provide valid email and password to enter as an user.

## Admin login details

email : admin@admin.com
password : admin12345

## signup

The user should provide valid details such as name, email and password inorder to signup.

## Google login

If the user wishes to login using google-signin, he can click on google signin button, where user will be shown a popup from google.

## Movie Details Page

By Clicking on the respective movie card, the user will be navigated to the movie details screen, where user will be shown with list of details available for the movie such as map indicating the location of theater, 'IMDB' button which on click will take to particular movie on Imdb page, details of popularity, voting averrage etc... Cast and Crew of the movie. By clicking on the 'BOOK' button the user will be navigated booking page. Alert icon button is available, which can be used for notifying the user about the movie on a particular date(between start and end date of movie). Share button where user can share details on social platform.

## Booking Page

Here user will be shown with a seat layout for selecting the seats that he requiers. Intially the seat layout will be in disabled mode till the user fill the details such as date, slot time, number of seats required. Once the user selects all the details the seat layout will now be available for user selection, once done 'Book Now' button which is in disabled the state until the user selected the required seats, will now be available for user operation. Click the 'BOOK NOW' button to proceed for payment operation.

## Payment Page

Once the seats selection is done and all the required criterias are met the user will be shown with the payment page else he will be redirected to home/booking page. Once the required criteria is met the user will be shown with different payment options such as credit/debit card, upi, Netbanking. The user can select the mode of payment as per his wish and fill the details required based on mode of payment selected. On successful completion of payment the user will be shown with a message confirming that the tickets were booked successfully.

## User Profile Page

The User profile page is accessed using the button present inside the header. This will show the user details such as name, email, mobile. The user will be given an option to change name/ mobile number by filling the required details. The user logged in with google will not be able to change the name, since google api's won't allow such operation. The user will be shown with 'Change Password' option, which on click will take the user to respective page.

## Reset Password

The logged in user will be able to change his password by filling the required details.

## Forgot Password

If an existing user forgot's his/her password, he can utilise this service. The user should enter his email id, which is given at the time of signup. On successful opration an E-mail will be sent to users registered id, through which he/she can change the password with the link given in the mail.

## Past Booking

The logged in user will be able to view the list past bookings.

## Current Bookings

The user will be able to view the list of upcoming bookings.

# Admin

## Admin Dashboard

Admin Dashboard contains the list of movies, seperated by currently showing and upcoming. Dashboard consists of 'ADD MOVIE' button, which is used for adding a movie.

## Add Movie

For adding movie user needs to enter the title, which inturn calls an api, to show the list of movies according to search. If movie got selected from auto complete, it will populate the fields story and imdb id fields. If admin can't see the movie in the auto complete list, he can fill the title field as well as story field normally.

Admin should also enter the rest of details such as genre, language, theater name , map co-ordinates, start, end dates, show timings etc... If admin fails to enter any of the mandatory fields, he won't be allowed to add the movie.

## Technologies used

---

Angular - 10.0.5,
Angular-material - 10.1.1,
Database: Firebase database -> dynamic data
forms - Reactive forms
css - SCSS format
Rxjs - 6.5.5

Date related to movies is handled through Angular's [InMemoryWebApi](https://www.npmjs.com/package/angular-in-memory-web-api) . So, if the application is refreshes it resets back the changes that the user has done.

The data of user's such as booking details, alerts, name, mobile will not be altered by refreshing the application, this is because we are using firebase database.

## code coverage

code-coverage = 85%+
code-coverage file path => coverage/BookAShow/index.html

# others

## In production ready code

path - dist/BookAShow/browser

gzipper path - gzipper/BookAShow/browser

Progressive Web App - 100%

Accessibility - 92/100

Best practises - 92/100

SEO - 100/100

Performance - 75/100

First Contentful Paint - 0.4s

Time to interactive - 2.8s

Speed Index - 1.0s

Total Blocking Time -260ms

Cumulative Layout Shift - 0

Memory leak between a transaction < 0.1MB

## production ready code gzip version

path: gzipped/BookAShow/browser

run gzip version on http-server using 'http-server -g'

## Web Pack build analyzer

builder cmd: npm run build:stats
cmd: npm run analyze

# Deployment

The project is deployed on firebase using CI/CD pipeline of Github Actions

file path : .github/workflows/main.yml
