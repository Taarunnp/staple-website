const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Data file path
const DATA_FILE = path.join(__dirname, 'data', 'requests.json');

// Initialize data directory and file
async function initializeData() {
    try {
        await fs.mkdir(path.join(__dirname, 'data'), { recursive: true });
        try {
            await fs.access(DATA_FILE);
        } catch {
            await fs.writeFile(DATA_FILE, JSON.stringify([]));
        }
    } catch (error) {
        console.error('Error initializing data:', error);
    }
}

// Read requests from file
async function readRequests() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading requests:', error);
        return [];
    }
}

// Write requests to file
async function writeRequests(requests) {
    try {
        await fs.writeFile(DATA_FILE, JSON.stringify(requests, null, 2));
    } catch (error) {
        console.error('Error writing requests:', error);
        throw error;
    }
}

// API Routes

// Get all requests
app.get('/api/requests', async (req, res) => {
    try {
        const requests = await readRequests();
        res.json(requests);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch requests' });
    }
});

// Get statistics
app.get('/api/stats', async (req, res) => {
    try {
        const requests = await readRequests();
        const stats = {
            total: requests.length,
            pending: requests.filter(r => r.status === 'pending').length,
            completed: requests.filter(r => r.status === 'completed').length
        };
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch statistics' });
    }
});

// Create new request
app.post('/api/requests', async (req, res) => {
    try {
        const { name, email, phone, service, message } = req.body;

        // Validation
        if (!name || !email || !service || !message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const requests = await readRequests();
        const newRequest = {
            id: requests.length > 0 ? Math.max(...requests.map(r => r.id)) + 1 : 1,
            name,
            email,
            phone: phone || 'N/A',
            service,
            message,
            status: 'pending',
            date: new Date().toLocaleDateString(),
            createdAt: new Date().toISOString()
        };

        requests.push(newRequest);
        await writeRequests(requests);

        res.status(201).json(newRequest);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create request' });
    }
});

// Update request status
app.patch('/api/requests/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { status } = req.body;

        if (!status || !['pending', 'completed'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const requests = await readRequests();
        const requestIndex = requests.findIndex(r => r.id === id);

        if (requestIndex === -1) {
            return res.status(404).json({ error: 'Request not found' });
        }

        requests[requestIndex].status = status;
        requests[requestIndex].updatedAt = new Date().toISOString();
        
        await writeRequests(requests);
        res.json(requests[requestIndex]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update request' });
    }
});

// Delete request
app.delete('/api/requests/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const requests = await readRequests();
        const filteredRequests = requests.filter(r => r.id !== id);

        if (requests.length === filteredRequests.length) {
            return res.status(404).json({ error: 'Request not found' });
        }

        await writeRequests(filteredRequests);
        res.json({ message: 'Request deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete request' });
    }
});

// Start server
initializeData().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 STAPLE API Server running on http://localhost:${PORT}`);
        console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
    });
});
