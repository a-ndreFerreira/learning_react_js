import express from 'express';
import memoryRoutes from './memoryRoutes.js'

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({ title: 'Welcome to Memories' })
    });

    app.use(
        express.json(),
        memoryRoutes
    )
}

export default routes;