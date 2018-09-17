//Imports 
const express  = require('express');
const jwt  = require('jsonwebtoken');
const bodyParser =  require('body-parser');
const cors = require('cors')
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
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials:true
}
app.use(cors(corsOptions));

//set up jwt authentication middleware
app.use(async (req,res,next) => {
    const token = req.headers['authorization'];
    if(token !== "null" || null){
        try{
            const currentUser = jwt.verify(token, process.env.SECRET)
            req.currentUser = currentUser
        }catch(err){
            console.log(err)
        }
    }
    next();
})


//Creates GraphQL application
app.use('/graphiql', graphiqlExpress({endpointURL :'/graphql'}))

//Connects Schemas to GraphQL
app.use('/graphql',bodyParser.json(), graphqlExpress(({currentUser}) => ({
    schema,
    context:{
        Recipe,
        User,
        currentUser
    }
})))

const PORT = process.env.PORT || 4444

app.listen(PORT, () =>{
    console.log(`server listening on ${PORT}`)
});

