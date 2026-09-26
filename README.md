# Weather Finder

A responsive, lightweight weather application built using vanilla HTML5, CSS3, and modern asynchronous JavaScript. It queries real-time weather metrics worldwide by chaining Open-Meteo's Geocoding and Forecast APIs.

This is **Project 2 of 5** in my frontend fundamentals series before transitioning to React and full-stack development with the MERN stack.

---

## Live Demo
Check out the live deployment here:  
**[Live Demo](https://yashupatel007.github.io/weather-app/)**

---

## Features
- **Global City Search:** Converts user-inputted city names into coordinates via the Open-Meteo Geocoding API.
- **Real-Time Data Display:** Fetches and displays current temperature, weather conditions, relative humidity, and wind speed.
- **Dynamic State Handling:** Includes dedicated UI views for loading states, empty inputs, and invalid search queries.
- **Condition Mapping:** Translates WMO numerical weather codes into human-readable descriptions (e.g., Clear Sky, Rain, Thunderstorm).
- **Responsive Layout:** Clean, centered card layout designed to work seamlessly on mobile and desktop screens.

---

## Technologies Used
- **HTML5:** Semantic document structuring.
- **CSS3:** Flexbox layout, gradients, card styling, and utility state classes (`.hidden`).
- **JavaScript (ES6+):** 
  - Asynchronous workflows using `async`/`await` and `fetch()`.
  - Robust error handling using `try...catch` blocks.
  - DOM selection and dynamic content updates via `textContent`.
- **API:** [Open-Meteo API](https://open-meteo.com/) (Free, keyless geocoding and weather forecast).

---

## Project Structure
```text
weather-app/
├── index.html
├── style.css
├── weather.js
└── README.md
