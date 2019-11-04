const customer = {
    name: 'abc',
    crm: 'klm'
};

module.exports = (app) => {
    app.get('/customer/:id', (req, res) => {
        res.status(200).json(customer)
    });
}
