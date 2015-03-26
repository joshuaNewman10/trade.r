/** @jsx React.Dom */
var Router = ReactRouter; // or var Router = ReactRouter; in browsers
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var State = Router.State;
var Navigation = Router.Navigation;

var app = app || {};
app.components = app.components || {};
(function() {

  var App = app.components.App = React.createClass({
    getInitialState: function() {
     return {
      loggedIn: true
     };
    },
    setStateOnAuth: function(loggedIn) {
      this.setState({
        loggedIn: loggedIn
      });
    }, 
    componentWillMount: function() {
    },
    render: function() {
      return (
        <div>
          <header>
            <ul>
              <li><Link to="app">Dashboard</Link></li>
              <li><Link to="about">About</Link></li>
              <li><Link to="markets">Markets</Link></li>
              <li><Link to="faq">FAQ</Link></li>
              <li><Link to="login">Login</Link></li>
              <li><Link to="started">Get Started</Link></li>
            </ul>
            <p>Not Logged In</p>
          </header>
          <RouteHandler/>
        </div>
      );
    }
  });

  var Dashboard = app.components.Dashboard = React.createClass({
    render: function() {
      return (
        <div>
          <div className="banner">
            <h2>Invest your spare cash</h2>
            <h4>Play the market</h4>
            <Link to="about">Learn More</Link>
          </div>
          <div className="investments">
            <h3>Hot Investments</h3>
            <InvestmentList />
          </div>
        </div>
      );
    }
  });

  var InvestmentList = app.components.InvestmentList = React.createClass({
    getInitialState: function() {
      return {
        investments: []
      }
    },
    componentWillMount: function() {
      console.log('about to put Investment list page');
    },
    loadInvestmentsFromServer: function() {
      var data = app.loadInvestmentsFromServer();
      this.setState({investments: data});
    },
    componentDidMount: function() {
      var data = this.loadInvestmentsFromServer();
    },
    render: function() {
      return (
        <ul className="investments">
          {this.state.investments.map(function(investment, index) {
            return (
              <Investment 
                investment = {investment}
                index = {index}
              />
            );
          }.bind(this))}
        </ul>
      );
    }
  });

  var Investment = app.components.Investment = React.createClass({
    render: function() {
      return (
       <div>
         <p>{this.props.investment.title}</p>
         <img src={this.props.investment.src}></img>
      </div>
      );
    }
  });

  var Markets = app.components.Markets = React.createClass({
    render: function() {
      return (
        <p>Im the markets page, I need to pull in market data </p>
      );
    }
  });

  var FAQ = app.components.FAQ = React.createClass({
    render: function() {
      return (
        <p>Im the FAQ page </p>
      );
    }
  });

  var Login = app.components.Login = React.createClass({
    mixins: [Router.navigation, State],

    getInitialState: function() {
      return {
       error: false
      };
    },

    handleSubmit: function(event) {
      event.preventDefault();
      var nextPath = this.getQuery().nextPath; //lets us memorize where user wanted to go!
      console.log('next path', nextPath)
      var email = this.refs.email.getDOMNode().value;
      var password = this.refs.password.getDOMNode().value;
      app.auth.login(email, password, function(loggedIn) {
        console.log(loggedIn, this);
        if ( !loggedIn ) {
          return this.setState({error: true}); //login error
        } 
         
        if ( nextPath ) {
          Navigation.replaceWith(nextPath);
        } else {
          Navigation.replaceWith('/about');
        }
      }.bind(this));
    },

    render: function() {
      var errors = this.state.error ? <p>Bad login information</p> : '';
      return (
        <form onSubmit={this.handleSubmit}>
          <label><input ref="email" placeholder="email" defaultValue="email1@fake.com"/></label>
          <label><input ref="password" placeholder="password12345"/></label> (hint: password12345)<br/>
          <button type="submit">login</button>
          {errors}
        </form>
      );
    }
  });

  var Logout = app.components.Logout = React.createClass({
    render: function() {
      return (
        <p>Im the logout page </p>
      );
    }
  });

  var GetStarted = app.components.GetStarted = React.createClass({
    render: function() {
      return (
        <p>Time for you to get started</p>
      );
    }
  });

  var About = app.components.About = React.createClass({
    render: function() {
      return (
        <div>
          <p>At Trade.r we believe that stock trading should be available to everyone. This means cutting out prohibitively high brokerage fees and 
          utilizing technology to find you great investments</p>
          <p>Trade.r is:</p>
             <ul className="aboutList">
               <li>Transparent</li>
               <li>Free</li>
               <li>Secure</li>
               <li>Convenient</li>
             </ul>
        </div>
      );
    }
  });

  app.auth = {
    users: [
      {email: 'email1@fake.com', password: 'password12345', token: 'abcdefg'}
    ],

    login: function(email, password, callback) {
       this.authorizeUser(email, password, function(response) {
          if ( response.authenticated ) {
             callback(true);
          } else {
            callback(false);
          }
       });
    },

    logout: function(callback, targetEmail) {
     for(var i=0; i<this.users.length; i++) {
      if ( this.users[i].email === targetEmail ) {
        this.users[i].token = '';
        callback(true);
      }
     }
     callback(false);
    },

    getToken: function() {
    
    },

    signup : function(email, password, callback) {
      if ( checkNewUser ) {
        this.users.push({email: email, password: password, token: makeToken()});
        callback(true); //successfully created user
      }
      callback(false); //user already in db
    },

    authorizeUser : function(email, password, callback) {
      var users = this.users;
      console.log(users, email, password);
      for(var i=0; i<users.length; i++) {
        if ( users[i].email === email & users[i].password === password) {
          callback({authenticated: true, token: users[i].token});
        }
      }
      callback({authenticated: false});
    },

    makeToken : function() {
      var token = '';
      var chars = ['abcdefgkzasdzx'];
      while( token.length < 10 ) {
        token += chars[Math.floor(Math.random()*chars.length)];
      }
      return token;
    },

    checkNewUser : function(email) {
      var users = auth.users;
      for(var i=0; i<users.length; i++) {
        if ( users[i].email === email) {
          return false;
        }
      }
      return true;
    }
  };
})();