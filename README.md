# URL Shortener API

A RESTful API for URL shortening built with Express.js, TypeScript, Prisma, and MongoDB.

## Features

- ✅ Shorten long URLs to compact short codes
- ✅ Redirect from short codes to original URLs
- ✅ Track access statistics
- ✅ Update existing short URLs
- ✅ Delete short URLs
- ✅ Input validation with Joi
- ✅ Professional error handling
- ✅ TypeScript support

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB
- **ORM**: Prisma
- **Validation**: Joi

## Prerequisites

- Node.js (v16 or higher)
- MongoDB database
- npm or yarn

## Installation

1. Clone the repository:

   ```bash
   git clone <your-repo-url>
   cd url-shortener
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory:

   ```env
   PORT=4000
   DATABASE_URL="your-mongodb-connection-string"
   NODE_ENV=development
   ```

4. Generate Prisma Client:

   ```bash
   npx prisma generate
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:4000`.

## API Endpoints

### Base URL

```
http://localhost:4000/api
```

### 1. Shorten URL

**POST** `/shorten`

Create a new short URL.

**Request Body:**

```json
{
  "originalUrl": "https://www.example.com"
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "URL shortened successfully",
  "data": {
    "id": "...",
    "originalUrl": "https://www.example.com",
    "shortCode": "abc123",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "accessCount": 0
  }
}
```

### 2. Redirect to Original URL

**GET** `/:shortCode`

Redirects to the original URL and increments access count.

**Response:** 302 Redirect

### 3. Get URL Statistics

**GET** `/stats/:shortCode`

Retrieve statistics for a short URL.

**Response (200):**

```json
{
  "success": true,
  "message": "URL statistics retrieved successfully",
  "data": {
    "id": "...",
    "originalUrl": "https://www.example.com",
    "shortCode": "abc123",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "accessCount": 5
  }
}
```

### 4. Update Short URL

**PUT** `/shorten/:shortCode`

Update the original URL for an existing short code.

**Request Body:**

```json
{
  "originalUrl": "https://www.newurl.com"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "URL updated successfully",
  "data": {
    "id": "...",
    "originalUrl": "https://www.newurl.com",
    "shortCode": "abc123",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "accessCount": 5
  }
}
```

### 5. Delete Short URL

**DELETE** `/shorten/:shortCode`

Delete a short URL.

**Response (200):**

```json
{
  "success": true,
  "message": "URL deleted successfully"
}
```

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "message": "Error description"
}
```

Common status codes:

- `400` - Bad Request (validation errors)
- `404` - Not Found (URL not found)
- `500` - Internal Server Error

## Project Structure

```
url-shortener/
├── backend/
│   ├── controller/      # Request handlers
│   ├── service/         # Business logic
│   ├── routes/          # API routes
│   ├── utils/           # Utilities
│   └── main.ts          # Entry point
├── packages/
│   ├── error-handler/   # Error handling
│   ├── middleware/      # Custom middleware
│   └── prisma/          # Prisma client
├── prisma/
│   └── schema.prisma    # Database schema
├── .env                 # Environment variables
├── .gitignore
├── package.json
└── tsconfig.json
```

## Scripts

- `npm run dev` - Start development server with hot reload

## License

ISC
