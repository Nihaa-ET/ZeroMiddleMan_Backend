const db = require('../../config/db');

class User {
    constructor(username, password, email, role, superadmin, admin, TL, editor, viewer) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
        this.superadmin = superadmin;
        this.admin = admin;
        this.TL = TL;
        this.editor = editor;
        this.viewer = viewer;
    }

    static async create(user) {
        const [rows] = await db.execute(
            'INSERT INTO users (username, password, email, role, superadmin, admin, TL, editor, viewer) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [user.username, user.password, user.email, user.role, user.superadmin, user.admin, user.TL, user.editor, user.viewer]
        );
        return rows;
    }

    static async findByUsername(username) {
        const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
        return rows[0];
    }
}

module.exports = User;