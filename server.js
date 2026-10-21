const cl = console.log;
const app = require("./app");

const port = process.env.PORT || 8080;

if (require.main === module) {
    app.listen(port, () => {
        cl(`Server is running on port ${port}`)
    })
}

module.exports = app;