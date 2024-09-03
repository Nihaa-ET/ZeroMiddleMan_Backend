const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/userModels/userModel');
const dotenv = require('dotenv')

dotenv.config()
//  User vRegsiter APi POST method
exports.register = async (req, res) => {
    console.log("********",req.body)
    const { username, password, email,role,authCode} = req.body;
    console.log("********",authCode)


    try {
        const existingUser = await User.findByUsername(username);
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        let newUser;
        switch (role) {
            case 'superadmin':
                if(authCode ==1234){
                    newUser = new User(username, hashedPassword, email, role, true, true, true, true, true);
                    break;
                }
                else{
                    res.status(400).json({ message: ' Authcode not correct pls connect admin !!!!' , });
                }
                    
            case 'Admin':
                newUser = new User(username, hashedPassword, email, role, false, true, true, true, true);
                break;
            case 'TL':
                newUser = new User(username, hashedPassword, email, role, false, false, true, true, true);
                break;
            case 'Editor':
                newUser = new User(username, hashedPassword, email, role, false, false, false, true, true);
                break;
            case 'Viewer':
                newUser = new User(username, hashedPassword, email, role, false, false, false, false, true);
                break;
            default:
                return res.status(400).json({ message: 'Invalid role' });
        }
        console.log("newUser",newUser)

        await User.create(newUser);
        res.status(201).json({ message: 'Success' ,"user":newUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findByUsername(username);
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid username or password' });
        } 

        const accessToken = jwt.sign(
            { username: user.username, role: user.role },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );

        const refreshToken = jwt.sign(
            { username: user.username, role: user.role },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).json({
            accessToken,
            refreshToken,
            role: user.role
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};