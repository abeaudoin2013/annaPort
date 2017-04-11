Template.SideNav.onCreated(function () {
	var self = this;
	Session.set('projects-clicked', '');
	Session.set('nav-toggle', false);
	self.autorun(function () {
		self.subscribe('projects');
		self.subscribe('about');
	});
});

Template.SideNav.helpers({
	projects: () => {
	  return Projects.find({});
	},
	about: () => {
		return About.findOne({});
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
	isVisible: (project) => {
		if (project.isVisible === "invisible") {
			return null;
		} else if (project.isVisible === "visible" || project.isVisible === undefined) {
			return true;
		}
	},
	isInvisible: (project) => {
		if (project.isVisible === "invisible") {
			return true;
		} else {
			return null;
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
	},
	'click #about': function (e) {
		e.stopPropagation();

		if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
			Session.set('about-me', !Session.get('about-me'));
			if (Session.get('about-me')) {
				$(e.target).next(".update-about-container").show();
			} else {
				$(e.target).next(".update-about-container").hide();	
			}
		} 
	},
	'click #updateAboutForm': function (e) {
		e.stopPropagation();
	},
	'click #about-title': function (e) {
		e.stopPropagation();
	}
});