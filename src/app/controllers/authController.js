const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const authConfig = require('../../config/auth');

const User = require('../models/User');

const router = express.Router();

function generateToken(params ={}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async (req, res) => {
    const { email } = req.body;
    try {
        if (await User.findOne({ email })) {
            return res.status(400).send({ error: 'User already exists' })
        }

        const user = await User.create(req.body);

        user.password = undefined;

        return res.send({ 
            user,
            token: generateToken({ id: user._id }),
         });
    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' });
    }
});

router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return res.status(400).send({ error: 'User not found' });
    }

    if (!await bcrypt.compare(password, user.password)) {
        return res.status(400).send({ error: 'Invalid password' });
    }

    user.password = undefined;

    return res.send({ 
        user,
        token: generateToken({ id: user._id }),
     });
});

router.post('/mock', async(req, res) => {
    const users = [];
    for (let i = 0; i < 10; i++) {
        const name = 'usuario' + i;
        const email = `teste${i}@mail.com`;
        const password = 'abcde' + i;
        const body = {name, email, password};
        // const user = await User.create(body)
        // users.push(user);
    }

    return res.send(users);
})

router.delete('/clean', async (req, res) => {
    const all_data = await User.find();
    const list_id = all_data.map((data) => data._id);
    list_id.map( async (id) =>  {
        await User.findByIdAndRemove(id);
        return
    });

    return res.send({ ok: true });
})

router.post('/forgot_password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send({ error: 'User not found' });
        }

        const token = crypto.randomBytes(20).toString('hex');

        const now = new Date();
        now.setHours(now.getHours() + 1);

        await User.findByIdAndUpdate(user.id, {
            '$set': {
                passwordResetToken: token,
                passwordResetExpires: now,
            }
        })


        return res.send({ token, now });
    } catch (err) {
        return res.status(400).send({ error: 'Erro on forgot password, try again' });
    }
})

module.exports = app => app.use('/auth', router);