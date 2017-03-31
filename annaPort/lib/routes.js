FlowRouter.route('/', {
  name: 'home-about',
  action() {
  	BlazeLayout.render('MainLayout', {main: 'About'});
  }
});

FlowRouter.route('/new-project', {
	name: 'new-project',
	action() {
		console.log(Meteor.user());
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
});

FlowRouter.route('/contact', {
	name: 'contact',
	action() {
		BlazeLayout.render('MainLayout', {main: 'Contact'})
	}
});

FlowRouter.route('/project/:id', {
	name: 'project',
	action() {
		BlazeLayout.render('MainLayout', {main: 'Project'})
	}
});

var adminRoutes = FlowRouter.group({
	prefix: '/admin',
	name: 'admin'
});

adminRoutes.route('/dashboard', {
	name: 'dashboard',
	action() {
		BlazeLayout.render('MainLayout', {main: 'Dashboard'})
	}
})

adminRoutes.route('/images-manager', {
	action() {
		BlazeLayout.render('MainLayout', {main: 'ImageManager'})
	}
})
