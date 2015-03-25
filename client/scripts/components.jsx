/** @jsx React.Dom */

var app = app || {};
app.components = app.components || {};

(function() {

  var App = app.components.App = React.createClass({
    render: function() {
      return (
        <div>
          <header>
            <ul>
              <li><Link to="app">Dashboard</Link></li>
              <li><Link to="about">About</Link></li>
              <li><Link to="inbox">Inbox</Link></li>
              <li><Link to="calendar">Calendar</Link></li>
              <li><Link to="login">Login</Link></li>
              <li><Link to="logout">Logout</Link></li>
            </ul>
            Logged in as Jane
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
    render: function() {
      return (
        <ul>
          <li><Investment /></li>
          <li><Investment /></li>
          <li><Investment /></li>
          <li><Investment /></li>
          <li><Investment /></li>
          <li><Investment /></li>
        </ul>
      );
    }
  });

  var Investment = app.components.Investment = React.createClass({
    render: function() {
      return (
       <div>
         <p>Im an investment</p>
         <img src="http://placehold.it/150x150"></img>
      </div>
      );
    }
  });

  var Inbox = app.components.Inbox = React.createClass({
    render: function() {
      return (
        <p>Im the inbox page </p>
      );
    }
  });

  var Calendar = app.components.Calendar = React.createClass({
    render: function() {
      return (
        <p>Im the calendar page </p>
      );
    }
  });

  var Login = app.components.Login = React.createClass({
    render: function() {
      return (
        <p>Im the login page </p>
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

  var About = app.components.About = React.createClass({
    render: function() {
      return (
        <p>Im the about page</p>
      );
    }
  });
})();