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
            <li><Link to="dashboard">Dashboard</Link> (authenticated)</li>
            <li><Link to="about">About-Us</Link></li>
            <li><Link to="markets">Markets</Link></li>
            <li><Link to="trade">Trade</Link>(authenticated)</li>
            <li><Link to="account">My Account</Link>(authenticated)</li>
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
       return (
        <div>
          <h1>About Us</h1>
          <div className="banner">
            <p>We believe that you shouldnt need to go through a broker to access the stock market</p>
          </div>
          <h2>Our Values</h2>
          <p>We provide a service that is:</p>
          <ul>
            <li>Transparent</li>
            <li>Convenient</li>
            <li>Secure</li>
          </ul>
          <p>Welcome to the new way to trade</p>
          <h2>Our Story</h2>
        </div>
       );
     }
   });

  var Markets = app.components.Markets = React.createClass({
    render: function() {
      return (
        <div>
          <h1>What the Markets are Doing</h1>
          <div>
            <h2>Market Data (pulled from Yahoo Query Library YQL)</h2>
            <div>
              <p>Financial Data visualization 1</p>
              <img src="http://placehold.it/350x150"/>
            </div>
            <div>
              <p>Financial Data visualization 2</p>
              <img src="http://placehold.it/350x150"/>
            </div>
            <div>
              <p>Financial Data visualization 3</p>
              <img src="http://placehold.it/350x150"/>
            </div>
            <div>
              <p>Financial Data visualization 4</p>
              <img src="http://placehold.it/350x150"/>
            </div>
            <h2>Share Your Analysis</h2>
          </div>
        </div>
      );

    }
  });

  var Trade = app.components.Trade = React.createClass({
    mixins: [ Authentication ],

    render: function() {
     return (
      <div>
        <h1>Trade</h1>
        <div>
          <h2>Buy</h2>
            <div className="hotDeals horizontal">
              <h3>Hot Deals</h3>
              <div>
                <p>Deal 1</p>
                <img src="http://placehold.it/150x150"/>
              </div>
              <div>
                <p>Deal 2</p>
                <img src="http://placehold.it/150x150"/>
              </div>
              <div>
                <p>Deal 3</p>
                <img src="http://placehold.it/150x150"/>
              </div>
            </div>
            <div className="investmentType horizontal">
              <h3>Popular Trades</h3>
              <div>
                <h3>Munis</h3>
                <img src="http://placehold.it/150x150"/>
              </div>
              <div>
                <h3>Dow Jones</h3>
                <img src="http://placehold.it/150x150"/>
              </div>
              <div>
                <h3>Sovereign Bonds</h3>
                <img src="http://placehold.it/150x150"/>
              </div>
            </div>
        </div>
        <div>
          <h2>Sell</h2>
        </div>
      </div>
    );
    }
  });

  var Account = app.components.Account = React.createClass({
    mixins: [ Authentication ],

    render: function() {
      return (
        <div>
          <h1>My Account</h1>
          <div className="acccounts">
           <p>Your Bank Accounts</p>
             <ul>
               <li>Bank 1</li>
               <li>Bank 2</li>
               <li>Bank 3</li>
             </ul>
          </div>
          <div className="deposit">
            <h2>Deposit</h2>
            <p>You can only ever lose what you put in</p>
            <p>Add Bank Account via Stripe API</p>
            <p>Make Deposit</p>
          </div>
          <div className="withdraw">
            <h2>Withdraw</h2>
            <p>Current Balance: 200</p>
            <p>Make a withdrawl</p>
          </div>
        </div>
      );
    }
  });

  var Started = app.components.Started = React.createClass({
    render: function() {
      return (
        <div>
          <h1>Get Started</h1>
          <p>Ready to experience the future of trading?</p>
          <p>Follow these quick, simple steps to get started now</p>
          <ul className="startedSteps">
            <li>Set up an account with our authentication system</li>
            <li>Tell us about your financial goals</li>
            <li>Fund your account via our payment system</li>
            <li>Lock in your first trade</li>
          </ul>
        </div>
      );

    }
  });

})();