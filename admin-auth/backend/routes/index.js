import express from 'express'
import admin from './adminUserRoute.js';
import category from './categoryRoute.js'
import content from './contentRoute.js'

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(201).json({ message: "Bem vindo ao Portifólio" });
    })
    app.use(
        express.json(),
        admin,
        category,
        content,
    )
}

export default routes;