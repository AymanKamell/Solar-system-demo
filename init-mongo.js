// init-mongo.js
db = db.getSiblingDB('solardb');

// Create dedicated user
db.createUser({
  user: 'solaruser',
  pwd: 'solarpass',
  roles: [{ role: 'readWrite', db: 'solardb' }]
});

// Insert planet data with LOCAL image filenames
db.planets.insertMany([
  { id: 0, name: "Sun", description: "Star at the center of our solar system.", image: "sun.png", velocity: "", distance: "" },
  { id: 1, name: "Mercury", description: "Smallest and innermost planet.", image: "mercury.png", velocity: "47.4 km/s", distance: "57.9 million km" },
  { id: 2, name: "Venus", description: "Hottest planet with thick toxic atmosphere.", image: "venus.png", velocity: "35.0 km/s", distance: "108.2 million km" },
  { id: 3, name: "Earth", description: "Our home planet.", image: "earth.png", velocity: "29.8 km/s", distance: "149.6 million km" },
  { id: 4, name: "Mars", description: "Red planet with dusty surface.", image: "mars.png", velocity: "24.1 km/s", distance: "227.9 million km" },
  { id: 5, name: "Jupiter", description: "Largest planet, gas giant.", image: "jupiter.png", velocity: "13.1 km/s", distance: "778.5 million km" },
  { id: 6, name: "Saturn", description: "Famous for its rings.", image: "saturn.png", velocity: "9.7 km/s", distance: "1.43 billion km" },
  { id: 7, name: "Uranus", description: "Ice giant, rotates on its side.", image: "uranus.png", velocity: "6.8 km/s", distance: "2.87 billion km" },
  { id: 8, name: "Neptune", description: "Windiest planet.", image: "neptune.png", velocity: "5.4 km/s", distance: "4.50 billion km" }
]);

print('✅ Planet data seeded!');
