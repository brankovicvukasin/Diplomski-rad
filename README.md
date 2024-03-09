![Picture1](https://github.com/brankovicvukasin/FairShare-Faculty-Project/blob/main/finish1.png "pic1")

FairShare is a web application designed to simplify the process of sharing expenses among friends and groups. This application automates expense sharing, allowing users to focus on enjoying their shared experiences without the hassle of financial management. With features like group creation, expense addition, analytics, and an interactive expense map, FairShare offers a solution for managing shared expenses efficiently.

## Features

- **User Authentication**: Secure login through Google OAuth 2.0, ensuring user data protection.
- **Dashboard**: A user-friendly interface displaying overall expense statistics and quick access to main features.
- **Friend Management**: Users can add friends, see a list of friends, and manage friendships directly.
- **Group Activities**: Create groups for specific events or shared interests to manage expenses more effectively.
- **Expense Management**: Add, view, and settle expenses within groups or between friends. Supports multi-currency transactions with real-time currency conversion.
- **Analytics**: Visual representations of expenses for better insight and budget management.
- **Interactive Expense Map**: View locations of shared experiences and expenses on a map, enhancing the planning and reminiscing of shared memories.
- **Responsive Design**: Fully responsive interface, ensuring usability across various devices and screen sizes.

![Picture2](https://github.com/brankovicvukasin/FairShare-Faculty-Project/blob/main/finish2.png "pic2")

## Technologies Used

- **Frontend**: React.js, Tailwind CSS, React Leaflet, React Google Charts
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose for data modeling
- **Authentication**: Google OAuth 2.0, JWT token
- **APIs**: Giphy API for dynamic content, currency conversion API for real-time rates

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- MongoDB (local setup or MongoDB Atlas)
- Google OAuth 2.0 client ID

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-github/fairshare.git
   cd fairshare
   ```
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```
4. Setup environment variables:
   - Create a `.env` file in the backend directory.
   - Add your MongoDB URI, Google client ID, and any other required API keys.
5. Start the backend server:
   ```bash
   npm start
   ```
6. Start the frontend application:
   ```bash
   cd ../frontend
   npm start
   ```

The application should now be running and accessible at http://localhost:3000.

## Usage

- **Login**: Use your Google account to login.
- **Dashboard**: Navigate through the dashboard to access different features.
- **Friends and Groups**: Start by adding friends and creating groups.
- **Managing Expenses**: Add new expenses within a group or between friends.
- **Analytics and Map**: Use the analytics feature and expense map for insights.
