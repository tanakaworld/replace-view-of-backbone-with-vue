const bodyParser = require('body-parser');
const express = require('express');
const app = express.Router();

const MindMapNodesController = require('./controllers/MindMapNodesController');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/mindMapNodes', MindMapNodesController.index);
app.get('/mindMapNodes/:id', MindMapNodesController.show);
app.post('/mindMapNodes', MindMapNodesController.create);
app.put('/mindMapNodes/:id', MindMapNodesController.update);
app.delete('/mindMapNodes/:id', MindMapNodesController.destroy);

module.exports = app;
