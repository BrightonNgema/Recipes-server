import React from 'react';
import {Mutation} from 'react-apollo';
import {SIGNIN_USER} from '../../queries';
import Error from '../Error'
import {withRouter} from 'react-router-dom';

const initialState = {
    username : "",
    password:"",
}
class Signin extends React.Component {
    state = {...initialState}

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]:value
        })
    }

    handleSubmit = (event, signinUser) => {
        event.preventDefault();
        signinUser().then(async ({data}) => {
            localStorage.setItem('token', data.signinUser.token);
            await this.props.refetch();
            this.clearState();
            this.props.history.push('/');
        })
    }

    clearState = () => {
        this.setState({...initialState})
    }

    validateForm = () => {
        const {username , password} = this.state;
        const isInvalid = !username || !password
        
        return isInvalid
    }

    render(){
        const {username , password} = this.state
        return(
            <div className="App">
                <h2>Signin</h2>
                <Mutation mutation={SIGNIN_USER} variables={{username, password}}>
                    {(signinUser, {data, loading,error}) => {
                        return(
                        <form className="form" onSubmit={event => this.handleSubmit(event, signinUser)}>
                            <input type="text" name="username" placeholder="Username" onChange={this.handleChange} value={username}/>
                            <input type="password" name="password" placeholder="Password" onChange={this.handleChange} value={password}/>
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

export default withRouter(Signin);