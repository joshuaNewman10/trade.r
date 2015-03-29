/** @jsx React.Dom */
var Router = ReactRouter; // or var Router = ReactRouter; in browsers
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var State = Router.State;
var app = app || {};


app.components = app.components || {};
(function() {

  var App = app.components.App = React.createClass({
    getInitialState: function () {
      return {
        loggedIn: auth.loggedIn()
      };
    },

    setStateOnAuth: function (loggedIn) {
      this.setState({
        loggedIn: loggedIn
      });
    },

    componentWillMount: function () {
      auth.onChange = this.setStateOnAuth;
      auth.login();
    },

    render: function () {
      var loginOrOut = this.state.loggedIn ?
        <Link to="logout">Log out</Link> :
        <Link to="login">Sign in</Link>;
      return (
        <div>
          <ul>
            <li>{loginOrOut}</li>
            <li><Link to="about">About</Link></li>
            <li><Link to="dashboard">Dashboard</Link> (authenticated)</li>
            <li><Link to="about">About-Us</Link></li>
            <li><Link to="markets">Markets</Link></li>
            <li><Link to="trade">Trade</Link></li>
            <li><Link to="account">My Account</Link></li>
            <li><Link to="started">Get Started</Link></li>
          </ul>
          <RouteHandler/>
        </div>
      );
    }
  });
  var Authentication = {
    statics: {
      willTransitionTo: function (transition) {
        var nextPath = transition.path;
        if (!auth.loggedIn()) {
          transition.redirect('/login', {}, { 'nextPath' : nextPath });
        }
      }
    }
  };

  var Dashboard = app.components.Dashboard = React.createClass({
    mixins: [ Authentication ],

    render: function () {
      var token = auth.getToken();
      return (
        <div>
          <h1>Dashboard</h1>
          <p>You made it!</p>
          <p>{token}</p>
        </div>
      );
    }
  });


  var Logout = app.components.Logout = React.createClass({
    componentDidMount: function () {
      auth.logout();
    },

    render: function () {
      return <p>You are now logged out</p>;
    }
  });

  var Login = app.components.Login =  React.createClass({
    mixins: [Router.Navigation, State],

    getInitialState: function () {
      return {
        error: false
      };
    },

    handleSubmit: function (event) {
      event.preventDefault();
      var nextPath = this.getQuery().nextPath;
      var email = this.refs.email.getDOMNode().value;
      var pass = this.refs.pass.getDOMNode().value;
      auth.login(email, pass, function (loggedIn) {
        if (!loggedIn)
          return this.setState({ error: true });

        if (nextPath) {
          this.replaceWith(nextPath);
        } else {
          this.replaceWith('/about');
        }
      }.bind(this));
    },

    render: function () {
      var errors = this.state.error ? <p>Bad login information</p> : '';
      return (
        <form onSubmit={this.handleSubmit}>
          <label><input ref="email" placeholder="email" defaultValue="joe@example.com"/></label>
          <label><input ref="pass" placeholder="password"/></label> (hint: password1)<br/>
          <button type="submit">login</button>
          {errors}
        </form>
      );
    }
  });

  var About = app.components.About = React.createClass({
     render: function () {
       return <h1>About</h1>;
     }
   });

  var Markets = app.components.Markets = React.createClass({
    render: function() {
      return <h1>Markets</h1>;
    }
  });

  var Trade = app.components.Trade = React.createClass({
    render: function() {
     return <h1>Trade</h1>;
    }
  });

  var Account = app.components.Account = React.createClass({
    render: function() {
      return <h1>Account</h1>;
    }
  });

  var Started = app.components.Started = React.createClass({
    render: function() {
      return <h1>Started</h1>;
    }
  });

})();