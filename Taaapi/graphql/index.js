import express from "express";
import cors from "cors";
import {ApolloServer} from '@apollo/server';
import {expressMiddleware} from "@apollo/server/express4";
import students from "../data/students.json" assert { type: "json" };
import lecturers from "../data/lecturers.json" assert { type: "json" };
import courses from "../data/courses.json" assert { type: "json" };
import rooms from "../data/rooms.json" assert { type: "json" };
import groups from "../data/groups.json" assert { type: "json" };


const typeDefs = `
    type Student {
        id: ID!
        name: String!
        surname: String!
        email: String!
        assignedGroups: [Int!]!
    }
    type Lecturer {
        id: ID!
        name: String!
        surname: String!
        email: String!
        assignedCourses: [Int!]!
    }
    type Course {
        id: ID!
        name: String!
        description: String!
        lecturer: Int!
        group: Int!
        room: String!
        date: CourseDate!
    }
    type CourseDate {
        start: String!
        end: String!
    }
    type Room {
        id: ID!
        courses: [Int!]!
    }
    type Group {
        id: ID!
        students: [Int!]!
        courses: [Int!]!
    }
    type Query {
        students: [Student!]!
        lecturers: [Lecturer!]!
        courses: [Course!]!
        rooms: [Room!]!
        groups: [Group!]!
    }
`;

const resolvers = {
    Query: {
        students: () => students
            .map(s => ({
                ...s,
                assignedGroups: groups.find(g => g.students.includes(s.id)).id
            })),
        lecturers: () => lecturers
            .map(l => ({
                ...l,
                assignedCourses: courses.filter(c => c.lecturer === l.id).map(c => c.id)
            })),
        courses: () => courses.map(c => ({
            ...c,
            date: {
                start: c.date.start,
                end: c.date.end
            }
        })),
        rooms: () => rooms,
        groups: () => groups
    }
};

const server = new ApolloServer({typeDefs, resolvers});
await server.start();

const app = express();
app.use('/graphql', cors(), express.json(), expressMiddleware(server));

app.use(cors({
    origin: '*'
}));

app.listen(8989, () => {
    console.log("Started of http://localhost:8989")
});


