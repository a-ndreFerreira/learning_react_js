import express from 'express'
import admin from './adminUserRoute.js';

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(201).json({ message: "Bem vindo ao Portifólio" });
    })
    app.use(
        express.json(),
        admin
    )
}

export default routes;