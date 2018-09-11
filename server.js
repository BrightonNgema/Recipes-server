//Imports 
const express  = require('express');
const bodyParser =  require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config({
    path:'variables.env'
})
const Recipe = require('./models/Recipe');
const User = require('./models/User');

//Brings in graphql express middleware
const {graphiqlExpress, graphqlExpress} = require('apollo-server-express');
const {makeExecutableSchema} = require('graphql-tools');
const {typeDefs} = require('./schema')
const {resolvers} = require('./resolvers')
// --------------------------------------------------------- //

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})
//Mongoose databse connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(()=> console.log('DB Connected'))
    .catch((err) => console.log('DB Err', err))

//Initializes Server Application
const app = express();

//Creates GraphQL application
app.use('/graphiql', graphiqlExpress({endpointURL :'/graphql'}))

//Connects Schemas to GraphQL
app.use('/graphql',bodyParser.json(), graphqlExpress({
    schema,
    context:{
        Recipe,
        User
    }
}))

const PORT = process.env.PORT || 4444

app.listen(PORT, () =>{
    console.log(`server listening on ${PORT}`)
});

