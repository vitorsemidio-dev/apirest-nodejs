const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Project = require('../models/Project');
const Task = require('../models/Task');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async(req, res) => {
    res.send({ ok: true, user: req.userId, get: 'all' });
});

router.get('/:projectId', async(req, res) => {
    res.send({ ok: true, user: req.userId, get: 'id' });
});

router.put('/:projectId', async(req, res) => {
    res.send({ ok: true, user: req.userId, put: 'put' });
});

router.post('/', async(req, res) => {
    res.send({ ok: true, user: req.userId , post: 'post' });
});

router.delete('/:projectId', async(req, res) => {
    res.send({ ok: true, user: req.userId, delete: 'delete' });
});


module.exports = app => app.use('/projects', router);