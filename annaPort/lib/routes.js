FlowRouter.route('/', {
  name: 'home-about',
  action() {
  	BlazeLayout.render('MainLayout', {main: 'About'});
  }
});

FlowRouter.route('/new-project', {
	name: 'new-project',
	action() {
		BlazeLayout.render('MainLayout', {main: 'NewProject'})
	}
});

FlowRouter.route('/login', {
	name: 'login',
	action() {
		BlazeLayout.render('MainLayout', {main: 'Login'})
	}
})