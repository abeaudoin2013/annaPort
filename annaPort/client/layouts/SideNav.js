Template.SideNav.onCreated(function () {
	var self = this;
	self.autorun(function () {
		self.subscribe('projects');
	});
});

Template.SideNav.helpers({
	projects: () => {
	  return Projects.find({});
	}
})