var React = require('react');
var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;
var requireAuth = require('./util/require-auth');
var auth = require('./util/auth');

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      loggedIn: auth.loggedIn()
    };
  }

  setStateOnAuth (loggedIn) {
    this.setState({
      loggedIn: loggedIn
    });
  }

  componentWillMount () {
    auth.onChange = this.setStateOnAuth.bind(this);
    auth.login();
  }

  render () {
    return (
      <div className='container'>
        <ul>
          {this.state.loggedIn ? (
            <li><Link to='logout'>Log out</Link></li>
          ) : (
            <li>
              <Link to='login'>Sign in</Link>
              <Link to='register'>Register</Link>
            </li>
          )}
          <li><Link to="about">About</Link></li>
          <li><Link to="dashboard">Dashboard</Link> (authenticated)</li>
        </ul>
        <RouteHandler/>
      </div>
    );
  }
}


var Dashboard = requireAuth(class extends React.Component {
  render () {
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

class About extends React.Component {
  render () {
    return <h1>About</h1>;
  }
}

class Logout extends React.Component {
  componentDidMount () {
    auth.logout();
  }

  render () {
    return <p>You are now logged out</p>;
  }
}

var routes = (
  <Route handler={App} path='/app/'>
    <Route name='login' handler={require('./login')}/>
    <Route name='register' handler={require('./register')}/>
    <Route name="logout" handler={Logout}/>
    <Route name="about" handler={About}/>
    <Route name="dashboard" handler={Dashboard}/>
  </Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
  React.render(<Handler/>, document.getElementsByTagName('body')[0]);
});
