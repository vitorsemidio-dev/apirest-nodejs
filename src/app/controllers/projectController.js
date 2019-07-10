const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Project = require('../models/Project');
const Task = require('../models/Task');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async(req, res) => {
    try {
        const projects = await Project.find().populate('user');

        return res.send({ projects });
    } catch (err) {
        res.status(400).send({ error: 'Error on getting projects', err });
    }
});

router.get('/:projectId', async(req, res) => {
    const { projectId } = req.params;
    try {
        const project = await Project.findById(projectId);

        return res.send({ project, projectId });
    } catch (err) {
        res.status(400).send({ error: 'Error on getting project', err });
    }
});

router.put('/:projectId', async(req, res) => {
    res.send({ ok: true, user: req.userId, put: 'put' });
    // TODO - Implementar
});

router.post('/', async(req, res) => {
    const { body, userId } = req;
    try {
        const project = await Project.create({ ...body, user: userId});

        //TODO - Aceitar array e salvar as tarefas com projeto

        return res.send({ project });
    } catch (err) {
        return res.status(400).send({ error: 'Error on creating new project', err });
    }
});

router.delete('/:projectId', async(req, res) => {
    const { projectId } = req.params;
    try {
        await Project.findByIdAndRemove(projectId);

        return res.send();
    } catch (err) {
        res.status(400).send({ error: 'Error on removing project', err });
    }
});


module.exports = app => app.use('/projects', router);