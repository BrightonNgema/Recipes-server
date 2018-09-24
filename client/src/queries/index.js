import {gql} from 'apollo-boost';

//---------------------------------------------QUERIES-------------------------------------------------------------//

export const GET_ALL_RECIPES = gql`
    query{
        getAllRecipes{
            _id
            name
            description
            instructions
            category
            likes
            createdDate
            username
        }
    }   
`;

export const GET_RECIPE = gql`
    query($id :ID!){
        getRecipe(_id:$id){
            _id
            name
            description
            instructions
            category
            likes
            createdDate
            username
        }
    }   
`;

export const SEARCH_RECIPES = gql`
    query($searchTerm :String){
        searchRecipes(searchTerm:$searchTerm){
            _id
            name
            description
            instructions
            category
            likes
            createdDate
            username
        }
    }   
`;

export const GET_CURRENT_USER = gql`
    query{
        getCurrentUser{
            username
            joinDate
            email
            favourites{
                _id
            name
            description
            instructions
            category
            likes
            createdDate
            username
            }
        }
    }   
`;




//---------------------------------------------MUTATIONS-------------------------------------------------------------//

export const SIGNIN_USER = gql `
    mutation($username:String!, $password:String!){
        signinUser(username:$username, password:$password){
            token
        }
    }
`;

export const SIGNUP_USER = gql `
    mutation($username:String!, $email:String!, $password:String!){
        signupUser(username:$username, email:$email, password:$password){
            token
        }
    }
`; 

export const ADD_RECIPE = gql`
    mutation    addRecipe($name: String!,$category: String!, $description: String!,
                        $instructions: String!,$username: String){
                addRecipe(name:$name,category: $category, description: $description,
                        instructions: $instructions,username: $username){
                            
                        _id
                        name
                        description
                        instructions
                        category
                        likes
                        createdDate
                        username
        }
    }   
`;

