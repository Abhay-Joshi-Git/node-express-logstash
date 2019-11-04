const users = {
    1: {
        name: 'ABC',
        role: 'admin',
        activeStatus: 'active'
    },
    2: {
        name: 'XYZ',
        role: 'basic',
        activeStatus: 'in-active'
    },
}

const defaultUser = {
    name: 'AAA',
    role: 'basic',
    activeStatus: 'in-active'
}

module.exports = (app) => {
    app.get('/user/:id', (req, res) => {
        let user = users[req.params.id] || defaultUser;
        res.status(200).json(user);
    });
}
