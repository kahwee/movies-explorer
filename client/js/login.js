var React = require('react');
var auth = require('./util/auth');
var _ = require('lodash');
module.exports = class Login extends React.Component {

  constructor (props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      error: false
    };
  }

  handleSubmit (ev) {
    ev.preventDefault();
    var { router } = this.context;
    var nextPath = router.getCurrentQuery().nextPath;
    var email = this.refs.email.getDOMNode().value;
    var pass = this.refs.password.getDOMNode().value;
    auth.login(email, pass, (res) => {
      console.log(res);
      if (res) {
        if (nextPath) {
          console.log(nextPath);
          router.replaceWith(nextPath);
        } else {
          console.log('about');
          router.replaceWith('/app/about');
        }
      }
      return this.setState({ error: !res });
    });
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input ref='email' className='form-control' type='text' id='email' name='email'/>
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input ref='password' type='password' className='form-control' id='password' name='password'/>
        </div>
        <button className='btn btn-primary' type='submit'>Submit</button>
        {this.state.error && (
          <p>Bad login information</p>
        )}
      </form>
    );
  }
}

module.exports.contextTypes = {
  router: React.PropTypes.func
};
