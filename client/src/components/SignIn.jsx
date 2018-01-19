import React from 'react';
import $ from 'jquery';
import {Input, Button, Card, Icon} from 'semantic-ui-react';
import NewUser from './NewUser.jsx'
import { Redirect, Link } from 'react-router-dom';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      userId: null,
      showSignupForm: false,
      redirect: false,
      undefinedUsername: false,
      usernameError: false,
      password: '',
      undefinedPassword: false,
    };
  }

  handleUsernameInput (e) { 
    this.setState({
      username: e.target.value,
      usernameError: false
    });
  }

  handlePasswordInput (e) { 
    this.setState({
      password: e.target.value,
    });
  }
  
  showSignUpForm(e) {
    e.preventDefault();
    this.setState({
      showSignupForm: true
    });
  }

  handleLogIn(e) {
    e.preventDefault();

    // If the user has not entered a username, show error
    if (!this.state.username || !this.state.password) {
      this.setState({
        undefinedUsername: Boolean(!this.state.username),
        undefinedPassword: Boolean(!this.state.password)
      });
    } else {
      // otherwise attempt to log user in
      this.logUserIn();
    }  
  }

  resetErrors() {
    this.setState({
      undefinedUsername: false,
      undefinedPassword: false,
    })
  }

  logUserIn() {
    var {username, password} = this.state;
    this.resetErrors();

    $.post(`/login`, {username: username, password: password}, (data) => {
      // If user successfully logs in
      if (data.length) {
        let basicUserData = data[0];


        // callback functions that populate user data in Main

        this.props.setBasicUserFields(basicUserData);
        this.props.updateLoginState(true);

        // redirect user away from login
        this.setState({
          redirect: true
        });

      } else {
        // Failed Login 
        data.type === 'username' 
        ?
        this.setState({
          showSignupForm: true,
          usernameError: true,
          redirect: false,
        })
        : 
        this.setState({
          undefinedPassword: true,
        })
      }
    })
  }


  render() {
    let feedPath = '/' + this.state.username + '/feed';
    if (this.state.redirect) {
      return <Redirect push to={feedPath} />;
    }
    return(
      <div className="signIn-page">
        <div className="left-column">
          <h1 className="signInLogoLabel">Welcome to</h1>
          <img className="signInLogo" src='/images/rebasebookblue.png' />
          <h3 className="signInTag">
            The social media for <span className="programmersLabel">&#60;programmers&#62;</span>.
          </h3>
        </div>
        <div className="right-column">
          <h3 id="sign-in"> Sign In </h3>
          <form action="/login" method="post">
            <Card className="signIn-card">

              <h5 className="signInLabel bottom aligned content">Username</h5>
              {this.state.undefinedUsername && 
                <h5 className="undefined-user-error">
                  <Icon name="warning circle"/>Please enter your username.
                </h5>
              }
              <Input 
                className="username-input"
                type="text"
                onChange={this.handleUsernameInput.bind(this)}
              />

              <h5 className="signInLabel bottom aligned content">Password</h5>
              {this.state.undefinedPassword && 
                <h5 className="undefined-user-error">
                  <Icon name="warning circle"/>Invalid password.
                </h5>
              }
              <Input 
                className="username-input"
                type="password"
                onChange={this.handlePasswordInput.bind(this)}
              />

              <Link 
                to={feedPath}
                onClick={this.handleLogIn.bind(this)} 
              >
                <Button className="login-button" id="login" type="submit"> Log In </Button>
              </Link>
              <div id="create-account-text">Don't have an account yet?</div>
              <div>
                <Button 
                  className="login-button"
                  id="create-new-account"
                  onClick={this.showSignUpForm.bind(this)}
                >
                  Sign Up
                </Button>
              </div>
            </Card>

          </form>
          {this.state.showSignupForm && 
            <NewUser 
              usernameError={this.state.usernameError}
              username={this.state.username}
              logUserIn={this.logUserIn.bind(this)}/>
          }
        </div>
      </div>  
    )
  }
}

export default SignIn;