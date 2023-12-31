# Weather App

This project was developed during the La Capsule BootCamp with subsequent modifications tailored to personal coding style.

## Overview

This full-stack web application utilizes HTML, CSS, and vanilla JS. It leverages an external API to retrieve weather information for a specified city. The back end, powered by Express, features routes for weather (including POST, GET, and DELETE operations), with data stored in MongoDB collections for users and cities. Input validation is implemented through a dedicated module. Additionally, sensitive information is secured using environmental variables stored in a `.env` file.

## Features

- **Weather Page**: The main page allows users to input a city name. Upon pressing Enter or clicking the button, a fetch request is sent to the backend, triggering the appropriate route. The backend interacts with MongoDB to determine if the city is already in the database. If not, it queries the API, displays the weather data in a container card, and adds the city to the database.

- **User Authentication**: A second page accessible via a button provides options to log in or register as a user. The frontend communicates with the backend through fetch requests, and user data is stored in MongoDB.

## Project Structure

The project consists of the following components:

- **Frontend**: HTML, CSS, and vanilla JS
- **Backend**: Express with routes for weather, user authentication, and MongoDB integration
- **Input Validation**: A module ensures proper validation of input fields

## Getting Started

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Create a `.env` file with the required environmental variables.
4. Run the application using `npm start`.

## Deployment

The project is deployed on Vercel.

## Acknowledgments

This was my first full-stack mini-project, and it was an enjoyable learning experience. Special thanks to La Capsule BootCamp for providing the foundation.

## License

This project is licensed under the [MIT License](LICENSE).
