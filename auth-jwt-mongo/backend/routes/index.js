import express from 'express'
import users from './userAuthRoute.js'

const routes = (app) => {
    //Public route
    app.route('/').get((req, res) => {
        res.status(200).json({ message: " Welcome Public Routes" })
    });

    app.use(
        express.json(),
        users
    )
}

export default routes;