import React, { Component } from 'react';
import {Route, Switch, NavLink} from 'react-router-dom';
import {withRouter} from 'react-router';
import axios from 'axios';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';


const url = 'http://localhost:3300';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loggedIn: false,
      jokes: []
    }
  }

authenticate = () => {
  const token = localStorage.getItem('secret_token')
  const options = {
    headers: {
      Authorization: token,
    }
  }
  if(token){
    axios.get(`${url}/api/jokes`, options)
    .then((res) => {
      if (res.data) {
        this.setState({ loggedIn: true, jokes: res.data})
      } else {
        throw new Error();
      }
    })
    .catch((err) => {
      console.log(err);
      this.props.history.push('/login');
    })
  } else {
    this.props.history.push('/login');
    }
}

componentDidMount(){
  this.authenticate();
}

componentDidUpdate(prevProps) {
  const {pathname} = this.props.location;
  if(pathname === '/' && pathname !== prevProps.location.pathname) {
    this.authenticate();
  }
}

  render() {
    return (
      <div className="App">
        <nav>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/login'>Log In</NavLink>
          <NavLink to='/register'>Register</NavLink>
        </nav>
        <Switch>
          <Route path = '/register' component={Register}/>
          <Route path = '/login' component={Login}/>
          <Route path = '/' render={() => {
            return (
              <React.Fragment>
              <h2>Jokes!</h2>
              <div>
                {this.state.jokes.map(joke => 
                <div key={joke.id}>
                  <h4>{joke.setup}</h4>
                  <p>{joke.punchline}</p>
                  </div>)}
              </div>
              </React.Fragment>
            )
          }}/>
          </Switch>
      </div>
    );
  }
}

export default withRouter(App);
