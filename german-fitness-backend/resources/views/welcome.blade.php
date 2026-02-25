<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>German Fitness - API</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            background: white;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 600px;
        }
        h1 {
            color: #333;
            margin-bottom: 1rem;
        }
        p {
            color: #666;
            margin-bottom: 1.5rem;
        }
        .api-info {
            background: #f8f9fa;
            padding: 1rem;
            border-radius: 5px;
            margin: 1rem 0;
            text-align: left;
        }
        .endpoint {
            font-family: 'Courier New', monospace;
            background: #e9ecef;
            padding: 0.5rem;
            border-radius: 3px;
            margin: 0.5rem 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🏋️ German Fitness API</h1>
        <p>Welcome to the German Fitness Gym Management System API</p>
        
        <div class="api-info">
            <h3>Available Endpoints:</h3>
            <div class="endpoint">GET /api/users - List users</div>
            <div class="endpoint">POST /api/login - User login</div>
            <div class="endpoint">POST /api/register - User registration</div>
            <div class="endpoint">GET /api/classes - List fitness classes</div>
            <div class="endpoint">GET /api/trainers - List trainers</div>
            <div class="endpoint">GET /api/membership-plans - List membership plans</div>
        </div>
        
        <p><strong>Status:</strong> ✅ API Server is Running</p>
        <p><small>Frontend should connect to: http://localhost:8000/api</small></p>
    </div>
</body>
</html>
