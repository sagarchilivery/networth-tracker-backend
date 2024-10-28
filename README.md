
# Backend System with Hapi.js, Sequelize, and PostgreSQL

Welcome to the backend system built using **Hapi.js**, **Sequelize**, and **PostgreSQL**! This project allows users to securely manage their accounts with functionalities such as sign-in, sign-up, and sign-out.

## Features

- **User Authentication**: Users can create accounts and securely sign in and out.
- **Aadhaar Card Number Storage**: Users can enter their Aadhaar card numbers, which are fully encrypted using **AES-256-GCM**. The number is only decrypted during the user's API call.
- **Password Security**: User passwords are encrypted using **bcrypt.js**, ensuring maximum security.

## Getting Started

To run this project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/sagarchilivery/networth-tracker-backend.git
   cd networth-tracker-backend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory of the project with the following variables:

   ```
   POSTGRES_DB_URL=your_postgres_database_url
   JWT_SECRET=your_jwt_secret
   PORT=your_port_number
   ENCRYPTION_KEY=your_32_digit_encryption_key
   ```

   > **Note**: The `ENCRYPTION_KEY` must be exactly **32 characters** long.

4. **Run the application**:
   ```bash
   npm start
   ```

## API Endpoints

- **Sign Up**: POST `/signup`
- **Sign In**: POST `/signin`
- **Sign Out**: POST `/signout`
- **Enter Aadhaar Number**: POST `/aadhar-number`
- **Retrieve Aadhaar Number**: GET `/aadhar-number`

## Technologies Used

- **Hapi.js**: A rich framework for building applications and services.
- **Sequelize**: A promise-based Node.js ORM for Postgres.
- **PostgreSQL**: A powerful, open-source relational database system.
- **bcrypt.js**: A library to help you hash passwords.
- **AES-256-GCM**: A strong encryption standard for data security.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact Me

- **Author Name**: Sagar Chilivery
- **Email**: [chiliverysagar@gmail.com](mailto:chiliverysagar@gmail.com)
