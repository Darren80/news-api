const { app, PORT } = require("./app");

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}...`)
});