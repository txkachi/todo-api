# Todo API

A simple REST API for managing todos built with Express.js.

## Features

- ✅ Create, Read, Update, Delete (CRUD) operations
- ✅ JSON file-based storage
- ✅ Input validation
- ✅ Error handling
- ✅ CORS enabled
- ✅ RESTful endpoints
- ✅ Unique ID generation
- ✅ Timestamp tracking

## Installation

1. Clone the repository:

```bash
git clone https://github.com/txkachi/todo-api
cd todo-api
```

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Base URL

```
http://localhost:3000
```

### Endpoints

| Method | Endpoint         | Description                  |
| ------ | ---------------- | ---------------------------- |
| GET    | `/`              | Welcome message and API info |
| GET    | `/api/todos`     | Get all todos                |
| GET    | `/api/todos/:id` | Get a specific todo          |
| POST   | `/api/todos`     | Create a new todo            |
| PUT    | `/api/todos/:id` | Update a todo                |
| DELETE | `/api/todos/:id` | Delete a todo                |
| DELETE | `/api/todos`     | Delete all todos             |

## Usage Examples

### Get all todos

```bash
curl http://localhost:3000/api/todos
```

### Create a new todo

```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn Express.js",
    "description": "Build REST APIs with Express",
    "completed": false
  }'
```

### Get a specific todo

```bash
curl http://localhost:3000/api/todos/{todo-id}
```

### Update a todo

```bash
curl -X PUT http://localhost:3000/api/todos/{todo-id} \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn Express.js - Updated",
    "completed": true
  }'
```

### Delete a todo

```bash
curl -X DELETE http://localhost:3000/api/todos/{todo-id}
```

### Delete all todos

```bash
curl -X DELETE http://localhost:3000/api/todos
```

## Request/Response Format

### Todo Object Structure

```json
{
  "id": "unique-id",
  "title": "Todo title",
  "description": "Todo description",
  "completed": false,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

## Data Storage

Todos are stored in a `todos.json` file in the project root. The file is automatically created when the server starts.

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **Body Parser** - Request body parsing

## Development

### Scripts

- `npm start` - Start the server
- `npm run dev` - Start the server with nodemon (auto-restart on file changes)

### Environment Variables

- `PORT` - Server port (default: 3000)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
