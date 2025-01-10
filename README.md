# Crypto Tracker

This application fetches cryptocurrency data (price, market cap, 24-hour change) for Bitcoin, Matic, and Ethereum, stores it in a MongoDB database, and provides APIs to access this data.

## Features

- **Background Job:** Fetches cryptocurrency data from the CoinGecko API every 2 hours.
- **`/stats` API:** Returns the latest data for a specific cryptocurrency.
- **`/deviation` API:** Calculates and returns the standard deviation of the price for a cryptocurrency based on the last 100 records.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- node-cron
- axios
- dotenv

## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Annany2002/Koinx_assignment.git
    ```
2.  Install dependencies:
    ```bash
    cd crypto-tracker
    npm install
    ```
3.  Configure Environment Variables:
    - Create a `.env` file in the root directory.
    - Add the following environment variables, replacing the placeholders with your actual values:
      ```
      MONGO_URI=<your_mongodb_atlas_connection_string>
      PORT=<port_number> (e.g., 3000)
      ```

## Running the Application

1.  Start the application:
    ```bash
    npm start
    ```
    The application will start fetching cryptocurrency data and store it in the database. The API will be available at `http://localhost:<port_number>`.

## API Endpoints

- **`/stats`**
  - Method: `GET`
  - Query Parameters:
    - `coin`: (required) The cryptocurrency ID (e.g., `bitcoin`, `matic-network`, `ethereum`).
  - Sample Response:
    ```json
    {
      "price": 40000,
      "marketCap": 800000000,
      "24hChange": 3.4
    }
    ```
- **`/deviation`**
  - Method: `GET`
  - Query Parameters:
    - `coin`: (required) The cryptocurrency ID (e.g., `bitcoin`, `matic-network`, `ethereum`).
  - Sample Response:
    ```json
    {
      "deviation": 4082.48
    }
    ```

## Deployment

This application can be deployed to cloud platforms like AWS, Heroku, or Google Cloud. See the deployment instructions for your chosen platform. (Include specific instructions if you have deployed the application).

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
