const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS

// Serve static files (like HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Connect to the ecademy database
const ecademyDb = mongoose.createConnection("mongodb://localhost:27017/ecademy", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

ecademyDb.on('connected', () => {
    console.log('MongoDB connected to ecademy database');
});

ecademyDb.on('error', (err) => {
    console.error('Ecademy database connection error:', err);
});

// Connect to the feedbacks database
const feedbacksDb = mongoose.createConnection("mongodb://localhost:27017/feedbacks", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
 
feedbacksDb.on('connected', () => {
    console.log('MongoDB connected to feedbacks database');
});

feedbacksDb.on('error', (err) => {
    console.error('Feedbacks database connection error:', err);
});

// Check database connection status
function checkDatabaseConnections() {
    const ecademyStatus = ecademyDb.readyState === 1 ? 'connected' : 'disconnected';
    const feedbacksStatus = feedbacksDb.readyState === 1 ? 'connected' : 'disconnected';

    console.log('Database connection statuses:');
    console.log(`Ecademy DB: ${ecademyStatus}`);
    console.log(`Feedbacks DB: ${feedbacksStatus}`);
}

// User Schema and Model
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = ecademyDb.model('User', userSchema);

// Feedback Schema and Model
const feedbackSchema = new mongoose.Schema({
    feedback: { type: String, required: true },
    email: { type: String, required: true }
});

const Feedback = feedbacksDb.model('Feedback', feedbackSchema);

// Course Interest Schema and Model
const courseInterestSchema = new mongoose.Schema({
    email: { type: String, required: true },
    course: { type: String, required: true }
});

const CourseInterest = ecademyDb.model('CourseInterest', courseInterestSchema);

// Routes

// User Registration Route
app.post('/submit', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send('Please fill in all fields.');
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).send('User already exists.');
        }

        const newUser = new User({ 
            name,
            email,
            password
        });

        await newUser.save();
        res.send('Registration successful!');
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
});

// Feedback Route
app.post('/feedback', async (req, res) => {
    const { feedback, email } = req.body;

    if (!feedback || !email) {
        return res.status(400).send('Please provide feedback and email.');
    }

    try {
        const newFeedback = new Feedback({ feedback, email });
        await newFeedback.save();
        res.send('Feedback received!');
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
});

// Course Interest Submission Route
app.post('/submit-course-interest', async (req, res) => {
    const { email, course } = req.body;

    if (!email || !course) {
        return res.status(400).send('Please provide both email and course.');
    }

    try {
        const newCourseInterest = new CourseInterest({ email, course });
        await newCourseInterest.save();
        res.send('Course interest submitted successfully!');
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
});

// Payment Schema and Model
const paymentSchema = new mongoose.Schema({
    cardHolder: { type: String, required: true },
    cardNumber: { type: String, required: true },
    expirationDate: { type: String, required: true },
    cvv: { type: String, required: true },
    amount: { type: Number, required: true }
});

const Payment = ecademyDb.model('Payment', paymentSchema);

// Payment Route
app.post('/process-payment', async (req, res) => {
    const { cardHolder, cardNumber, expirationDate, cvv, amount } = req.body;

    if (!cardHolder || !cardNumber || !expirationDate || !cvv || !amount) {
        return res.status(400).send('Please fill in all payment fields.');
    }

    try {
        const newPayment = new Payment({ 
            cardHolder,
            cardNumber, 
            expirationDate, 
            cvv, 
            amount
        });

        await newPayment.save();
        res.send('Payment successful!');
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
});

// Start Server and check database connections
app.listen(3020, () => {
    console.log('Server running on port 3020');
    checkDatabaseConnections();  // Check the connection status when the server starts
});
