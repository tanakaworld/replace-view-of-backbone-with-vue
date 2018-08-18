const bodyParser = require('body-parser');
const express = require('express');
const app = express.Router();

const MindMapsController = require('./controllers/MindMapsController');
const MindMapNodesController = require('./controllers/MindMapNodesController');
const MindMapLinksController = require('./controllers/MindMapLinksController');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// MindMap
app.get('/mindMaps', MindMapsController.index);
app.get('/mindMaps/:id', MindMapsController.detail);
app.post('/mindMaps', MindMapsController.create);
app.put('/mindMaps/:id', MindMapsController.update);
app.delete('/mindMaps/:id', MindMapsController.destroy);

// MindMapNodes
app.get('/mindMaps/:mindMapId/mindMapNodes', MindMapNodesController.index);
app.put('/mindMaps/:mindMapId/mindMapNodes/:id', MindMapNodesController.createOrUpdate);
app.delete('/mindMaps/:mindMapId/mindMapNodes/:id', MindMapNodesController.destroy);

// MindMapNodes
app.get('/mindMaps/:mindMapId/mindMapLinks', MindMapLinksController.index);
app.put('/mindMaps/:mindMapId/mindMapLinks/:id', MindMapLinksController.createOrUpdate);
app.delete('/mindMaps/:mindMapId/mindMapLinks/:id', MindMapLinksController.destroy);

module.exports = app;
