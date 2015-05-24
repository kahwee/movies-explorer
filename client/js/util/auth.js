var postJSON = require('fetch-json/post');
module.exports = {
	login(email, password, cb) {
		cb = arguments[arguments.length - 1];
		if (localStorage.token) {
			if (cb) cb(true);
			this.onChange(true);
			return;
		}
		loginRequest(email, password, (res) => {
			if (res.authenticated) {
				localStorage.token = res.token;
				if (cb) cb(true);
				this.onChange(true);
			} else {
				if (cb) cb(false);
				this.onChange(false);
			}
		});
	},

	getToken: function() {
		return localStorage.token;
	},

	logout: function(cb) {
		delete localStorage.token;
		if (cb) cb();
		this.onChange(false);
	},

	loggedIn: function() {
		return !!localStorage.token;
	},

	onChange: function() {}
};



function loginRequest(email, password, cb) {
  postJSON('/api/Users/login?include=user', {
    body: {
      email: email,
      password: password
    }
  }).then((res) => {
    if (res.status !== 200) {
      throw new Error();
    }
    return res.json()
  }).then((json) => {
    cb({
      authenticated: true,
      token: json.id
    });
  }).catch((res) => {
    cb({authenticated: false});
  });
}
