import express from "express";
import {generateCourse, generateStudent} from "../../data/generator.js";
import * as protoLoader from "@grpc/proto-loader"
import * as grpc from "@grpc/grpc-js"

const packageDefinition = protoLoader.loadSync("grpc/proto/schedule.proto");
const scheduleProto = grpc.loadPackageDefinition(packageDefinition);

const client = new scheduleProto.ScheduleService('127.0.0.1:9090', grpc.ChannelCredentials.createInsecure());

export const studentsRouter = express.Router();

studentsRouter.get('/:id', (req, res) => {
    client.GetStudent({studentId: '1'} , (err, response) => {
        if (err !== null) {
            console.error(err);
        }
        res.send(response);
    });
    res.send(generateStudent(req.params.id));
}).get('/:id/schedule', (req, res) => {
    const from = new Date(req.query.from);
    const to = new Date(req.query.to);
    res.send(generateCourse(req.params.id, from, to));
});