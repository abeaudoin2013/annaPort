Template.SideNav.onCreated(function () {
	var self = this;
	Session.set('projects-clicked', '');
	Session.set('nav-toggle', false);
	self.autorun(function () {
		self.subscribe('projects');
	});
});

Template.SideNav.helpers({
	projects: () => {
	  return Projects.find({});
	},
	admin: () => {
		return Roles.userIsInRole(Meteor.userId(), 'admin');
	},
	projectToggle: () => {
		return Session.get('projects-clicked');
	},
	slide: () => {
		if (Session.get('projects-clicked') === true) {
			return 'slideDown';
		} else if (Session.get('projects-clicked') === '') {
			return 'hide';
		} else if (Session.get('projects-clicked') === false) {
			return 'slideUp'
		}
	},
	navToggle: () => {
		if (Session.get('nav-toggle')) {
			return 'nav-open'
		} else {
			return 'nav-closed'
		}
	},
	randomColor: () => {
		var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
	},
	param: () => {
		if (FlowRouter.getRouteName() !== "home-about") {
			return true
		};
	}
});

Template.SideNav.events({
	'click .login-toggle': ()=> {
		Session.set('nav-toggle', 'open');
	},
	'click .logout': () => {
		AccountsTemplates.logout();
	},
	'click span': function(e) {
		var link = e.target.dataset.href;
		FlowRouter.go(link);
	},
	'click #projects': function(e) {
		e.stopPropagation();
		Session.set('projects-clicked', !Session.get('projects-clicked'));
		var $projects = $(e.target);
		if ($projects.hasClass("go-up")) {
			$projects.removeClass("go-up")
			         .addClass("go-down")
		} else if ($projects.hasClass("go-down")) {
      $projects.removeClass("go-down")
               .addClass("go-up")
		}
	},
	'click .close-projects': function () {
		Session.set('projects-clicked', !Session.get('projects-clicked'));
	},
	'click .side-nav': function () {
		Session.set('nav-toggle', !Session.get('nav-toggle'))
	}
});