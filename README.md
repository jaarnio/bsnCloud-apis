# BSN Cloud API Project

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
4. Edit `.env` and add your credentials
5. Run the application:
   ```bash
   npm start
   ```

## Environment Variables

The following environment variables are required:

- BSN_CLIENT_ID: Your BSN.cloud client ID
- BSN_CLIENT_SECRET: Your BSN.cloud client secret
- BSN_USERNAME: Your BSN.cloud username
- BSN_PASSWORD: Your BSN.cloud password
- BSN_NETWORK: Your BSN.cloud network
- BSN_BASE_URL: BSN.cloud API base URL (https://api.bsn.cloud/2022/06/REST)
- BSN_RDWS_URL: BSN.cloud RDWS base URL (https://ws.bsn.cloud/rest/v1)

## API Endpoints

### Devices API

Base URL: ${BSN_BASE_URL}/Devices

- GET / - Get all devices
- GET /{deviceId} - Get device by serial number

### RDWS API

Base URL: ${BSN_RDWS_URL}

- GET /info - Get device information
- GET /time - Get device time
- PUT /custom - Send custom command to device
- GET /download-firmware - Download and apply firmware update

Each endpoint requires proper authentication and follows the BSN.cloud API specifications. See the source code for implementation details and usage examples.
