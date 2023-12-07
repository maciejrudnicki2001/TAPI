import express from "express";

export const coursesRouter = express.Router();

coursesRouter.get('/', (req, res) => {
    res.send('courses');
}).post('/', (req, res) => {

}).put('/', (req, res) => {

});
