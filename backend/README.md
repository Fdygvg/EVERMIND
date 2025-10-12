# EVERMIND Backend API

This is the backend API for EVERMIND learning app, featuring MongoDB Atlas integration and Groq AI-powered question processing.

## Features

- **RESTful API** for question management
- **MongoDB Atlas** cloud database integration
- **Groq AI** for intelligent question formatting
- **CORS enabled** for frontend communication
- **Data migration** from existing JSON files
- **Admin panel** for question submission

## Setup Instructions

### 1. Environment Configuration

1. Copy `env.example` to `.env`:
   ```bash
   cp env.example .env
   ```

2. Update `.env` with your credentials:
   ```
   PORT=5000
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/
   GROQ_API_KEY=your_chat_groq_api_key_here
   GROQ_API_KEY2=your_backend_groq_api_key_here
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

### 2. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create database: `evermind`
4. Create collection: `questions`
5. Create database user with read/write permissions
6. Whitelist your IP (or use 0.0.0.0/0 for development)
7. Copy connection string to `.env`

### 3. Groq API Setup

1. Go to [Groq Console](https://console.groq.com/)
2. Create account and get API key
3. Add API key to `.env`

### 4. Install Dependencies

```bash
npm install
```

### 5. Run Migration (Optional)

To migrate existing JSON data to MongoDB:

```bash
npm run migrate
```

### 6. Start Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Questions

- `GET /api/questions` - Get all questions (with optional filtering)
- `GET /api/questions/:id` - Get single question
- `POST /api/questions/process` - Process raw text with AI
- `POST /api/questions` - Create new question
- `PUT /api/questions/:id` - Update question
- `DELETE /api/questions/:id` - Delete question

### Health Check

- `GET /api/health` - Server health status

## Usage Examples

### Process Raw Questions

```bash
curl -X POST http://localhost:5000/api/questions/process \
  -H "Content-Type: application/json" \
  -d '{
    "rawText": "What is JavaScript?\nJavaScript is a programming language...",
    "section": "programming"
  }'
```

### Get Questions by Section

```bash
curl http://localhost:5000/api/questions?section=programming
```

## Admin Panel

Open `admin.html` in your browser to use the admin panel for:
- Submitting raw questions
- AI-powered formatting
- Real-time question management

## Error Handling

The API includes comprehensive error handling:
- MongoDB connection errors
- Groq API failures
- Validation errors
- Graceful fallbacks

## Development

### Project Structure

```
backend/
├── server.js              # Main Express server
├── package.json           # Dependencies
├── .env                   # Environment variables
├── models/
│   └── Question.js        # Mongoose schema
├── routes/
│   └── questions.js       # API routes
├── controllers/
│   └── questionController.js  # Business logic
├── migrate.js             # Data migration script
└── README.md              # This file
```

### Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run migrate` - Run data migration

## Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Check connection string in `.env`
   - Verify IP whitelist in MongoDB Atlas
   - Check database user permissions

2. **Groq API Errors**
   - Verify API key in `.env`
   - Check API rate limits
   - Ensure internet connectivity

3. **CORS Issues**
   - Update `FRONTEND_URL` in `.env`
   - Check frontend URL configuration

### Logs

The server provides detailed logging:
- ✅ Success messages
- ⚠️ Warnings
- ❌ Errors
- 📊 Statistics

## Production Deployment

For production deployment:

1. Set `NODE_ENV=production`
2. Use environment variables for all secrets
3. Configure proper CORS origins
4. Set up monitoring and logging
5. Use PM2 or similar process manager

## Support

For issues or questions, check the console logs and ensure all environment variables are properly configured.
