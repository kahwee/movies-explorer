var React = require('react');
var _ = require('lodash');
var postJSON = require('fetch-json/post');
module.exports = class RegisterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: ''
    };
  }

  handleSubmit(ev) {
    ev.preventDefault();
    postJSON('/api/Users/', {
      body: this.state
    }).then(function(data) {
      console.log(data, 'done');
    })
  }

  handleChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value
    })
  }

  render() {
    var state = this.state;
    return (
      <form onSubmit={this.handleSubmit.bind(this)} onChange={this.handleChange.bind(this)}>
        <div className='form-group'>
          <label htmlFor='username'>Username</label>
          <input className='form-control' type='text' id='username' name='username' value={state.username}/>
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input className='form-control' type='password' id='password' name='password' value={state.password}/>
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input className='form-control' type='text' id='email' name='email' value={state.email}/>
        </div>
        <button className='btn btn-primary' type='submit'>Submit</button>
      </form>
    )
  }
}
