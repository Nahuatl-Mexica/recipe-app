# Recipe App

A full-stack recipe application with web and mobile interfaces, featuring step-by-step cooking instructions, favorites system, and offline capabilities.

## Features

- **Cross-platform compatibility**: Web application and mobile app (Android/iOS)
- **User Authentication**: Register, login, and profile management
- **Recipe Management**: Create, edit, view, and delete recipes
- **Visual Recipe Experience**: Step-by-step instructions with images
- **Interactive Features**: Swipe functionality, favorites system, ratings
- **Search & Filter**: Find recipes by category, difficulty, or keywords
- **Responsive Design**: Modern UI that works on all devices
- **Dark/Light Mode**: Toggle between themes for comfortable viewing
- **Offline Capabilities**: Access favorite recipes without internet connection

## Technology Stack

### Frontend
- React.js
- Redux for state management
- Styled Components for styling
- React Router for navigation

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- RESTful API architecture

### Mobile
- React Native
- Expo for cross-platform development
- AsyncStorage for offline data

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
```
git clone https://github.com/Nahuatl-Mexica/recipe-app.git
cd recipe-app
```

2. Install dependencies
```
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

# Install mobile dependencies
cd ../mobile
npm install
```

3. Set up environment variables
Create a `.env` file in the server directory with the following variables:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Run the application
```
# Run server (from server directory)
npm start

# Run client (from client directory)
npm start

# Run mobile app (from mobile directory)
npm start
```

## Usage

### Web Application
- Visit `http://localhost:3000` to access the web application
- Register a new account or login with existing credentials
- Browse recipes, create your own, and save favorites
- Use the search and filter functionality to find specific recipes
- Toggle between dark and light mode for comfortable viewing

### Mobile Application
- Use Expo to run the mobile application on your device or emulator
- Swipe through recipe steps for an interactive cooking experience
- Download recipes for offline access
- Manage your profile and favorites

## Project Structure

```
recipe-app/
├── client/             # React web application
│   ├── public/         # Static files
│   ├── src/            # Source files
│   │   ├── components/ # Reusable components
│   │   ├── pages/      # Page components
│   │   ├── redux/      # Redux store, actions, reducers
│   │   ├── styles/     # Global styles
│   │   └── App.js      # Main application component
│   └── tests/          # Frontend tests
│
├── server/             # Express backend
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   ├── middleware/     # Custom middleware
│   └── index.js        # Server entry point
│
├── mobile/             # React Native mobile app
│   ├── screens/        # Screen components
│   ├── components/     # Reusable components
│   ├── theme/          # Theme configuration
│   └── App.js          # Main application component
│
└── tests/              # Backend tests
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Recipe images from Unsplash
- Icons from FontAwesome
- UI inspiration from popular cooking apps
