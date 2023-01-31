const listen = (app, PORT) => {
    app.listen(PORT, () => {
        console.log(`Listening on ${PORT}...`)
    });
}

module.exports = listen;