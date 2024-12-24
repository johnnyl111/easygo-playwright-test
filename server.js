const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
app.use(bodyParser.json());

const uri = "mongodb+srv://user1:easygo123@cluster0.ux0ul.mongodb.net/test-db?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const JWT_SECRET = 'easygo123';

let db;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN format
  
  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Authentication token is required'
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({
      success: false,
      error: 'Invalid token'
    });
  }
};

app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        error: 'Username and password are required'
      });
    }

    const existingUser = await db.collection('users').findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'Username already exists'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    await db.collection('users').insertOne({
      username,
      password: hashedPassword
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully'
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;


    const user = await db.collection('users').findOne({ username });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET
    );

    res.json({
      success: true,
      token
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

app.post('/add-user', verifyToken, async (req, res) => {
  try {
    const { name, age } = req.body;
    if (!name) {
      throw new Error('Name cannot be empty');
    }
    const result = await db.collection('test-collection').insertOne({ 
      name, 
      age,
      createdBy: req.user.userId 
    });
    res.status(201).send({ success: true, id: result.insertedId });
  } catch (err) {
    console.error('Error occurred:', err.message);
    res.status(500).send({ success: false, error: err.message });
  }
});

app.get('/get-user/:name', verifyToken, async (req, res) => {
  try {
    const { name } = req.params;
    const user = await db.collection('test-collection').findOne({ name });
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ success: false, message: 'User not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, error: err.message });
  }
});

async function startServer() {
  try {
    await client.connect();
    db = client.db('test-db');
    app.listen(3000, () => console.log('Server running on http://localhost:3000'));
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
  }
}

startServer();
