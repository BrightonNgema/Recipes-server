import React from 'react';
import {Mutation} from 'react-apollo';
import {SIGNUP_USER} from '../../queries';
import Error from '../Error'
import {withRouter} from 'react-router-dom';

const initialState = {
    username : "",
    email: "",
    password:"",
    passwordConfirmation : ""
}
class Signup extends React.Component {
    state = {...initialState}

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]:value
        })
    }

    handleSubmit = (event, signupUser) => {
        event.preventDefault();
        signupUser().then(async({data}) => {
            console.log(data);
            localStorage.setItem('token', data.signupUser.token);
            await this.props.refetch();
            this.clearState();
            this.props.history.push('/');
        })
    }

    clearState = () => {
        this.setState({...initialState})
    }

    validateForm = () => {
        const {username , password, email, passwordConfirmation} = this.state;
        const isInvalid = !username || !password || !email ||
        password !== passwordConfirmation
        return isInvalid
    }

    render(){
        console.log(this.props)
        const {username , password, email, passwordConfirmation} = this.state
        return(
            <div className="App">
                <h2>Signup</h2>
                <Mutation mutation={SIGNUP_USER} variables={{username, email, password}}>
                    {(signupUser, {data, loading,error}) => {
                        return(
                        <form className="form" onSubmit={event => this.handleSubmit(event, signupUser)}>
                            <input type="text" name="username" placeholder="Username" onChange={this.handleChange} value={username}/>
                            <input type="text" name="email" placeholder="Email Addess" onChange={this.handleChange} value={email}/>
                            <input type="password" name="password" placeholder="Password" onChange={this.handleChange} value={password}/>
                            <input type="password" name="passwordConfirmation" placeholder="Confirm Password" onChange={this.handleChange} value={passwordConfirmation}/>
                            <button 
                                disabled={loading || this.validateForm()}
                                type="submit" 
                                className={loading || this.validateForm() ? "button-grey" : "button-primary"}>
                            Submit</button>
                            {error && <Error error={error}/>}
                        </form>
                        )
                    }}
                </Mutation>
            </div>
        )
    }
}

export default withRouter(Signup);