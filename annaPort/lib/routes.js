Accounts.onLogin(function () {
	FlowRouter.go('home-about');
});
Accounts.onLogout(function () {
	FlowRouter.go('home-about');
});

FlowRouter.route('/', {
  name: 'home-about',
  action() {
  	BlazeLayout.render('MainLayout', {main: 'About'});
  }
});

FlowRouter.route('/new-project', {
	name: 'new-project',
	action() {
		if (!Meteor.userId()) {
			FlowRouter.go('home-about');
		} else {
			BlazeLayout.render('MainLayout', {main: 'NewProject'})	
		}	
	}
});

FlowRouter.route('/login', {
	name: 'login',
	action() {
		BlazeLayout.render('MainLayout', {main: 'Login'})
	}
})

FlowRouter.route('/project/:id', {
	name: 'project',
	action() {
		BlazeLayout.render('MainLayout', {main: 'Project'})
	}
})