
const {Router} = require('express');
const router = Router()

const bcrypt = require('bcryptjs')

const config = require('config')

const {check, validationResult} = require('express-validator')

const jwt = require('jsonwebtoken')

const User = require('../models/User');



router.post(
    "/register",
    
    [
        check('email', 'Invalid email').isEmail(),
        check('password', 'Password length should be minimum 6')
            .isLength({min: 6})
    ],

    async (req, res) => {
    
        try {

            const errors = validationResult(req)
        
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Invalid data'
                })
            }
            
            const { email, password } = req.body;

            const candidate = await User.findOne({ email });

            if (candidate) {
                return res.status(400).json({'message': 'User with this email is already exists...'});
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const user = new User({email: email, password: hashedPassword});

            await user.save();

            return res.status(201).json({'message': 'User have been created'})

        } catch (e) {
            res.status(500).json({"message": "Some error on server, try again..."})
        }

})


router.post(
    "/login",
    
    [
        check('email', 'Invalid email').normalizeEmail().isEmail(),
        check('password', 'Invalid password')
            .isLength({min: 6}).exists()
    ],

    async (req, res) => {

        
        try {
    
            const errors = validationResult(req)
        
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Invalid data'
                })
            }
    
            const {email, password} = req.body;

            const user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({message: "User with this email does not exists"})
            }

            const isMatch = await bcrypt.compare(password, user.password)
            
            if (!isMatch) {
                return res.status(400).json('Incorrect password')
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwt-secret'),
                { expiresIn: '1h' }
            )

            res.json({ token, userId: user.id })

        } catch (e) {
            res.status(500).json({"message": "Some error on server, try again..."})
        }

})


module.exports = router