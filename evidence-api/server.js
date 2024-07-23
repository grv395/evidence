const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs-extra');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 9201;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint to list available MD files
app.get('/files', async (req, res) => {
    try {
        const files = await fs.readdir('../pages');
        const mdFiles = files.filter(file => path.extname(file) === '.md');
        const fileNames = mdFiles.map(file => path.basename(file, '.md')); // Extract file name without extension
        res.json(fileNames);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to read files' });
    }
});


// Endpoint to view content of a specific MD file
app.get('/files/:filename', async (req, res) => {
    const filename = req.params.filename;
    try {
        const filePath = path.join('../pages', filename);
        const content = await fs.readFile(filePath, 'utf-8');
        res.json({ filename, content });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: `Failed to read file ${filename}` });
    }
});

// Endpoint to edit and push changes to a specific MD file
app.put('/files/:filename', async (req, res) => {
    const filename = req.params.filename;
    const content = req.body.content;

    try {
        const filePath = path.join('../pages', filename);
        await fs.writeFile(filePath, content);
        res.json({ message: `File ${filename} updated successfully` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: `Failed to update file ${filename}` });
    }
});

// Start server
// Start server and listen on all network interfaces
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});