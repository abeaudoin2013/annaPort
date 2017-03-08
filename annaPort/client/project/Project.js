Template.Project.onCreated(function () {
	var self = this;
	self.autorun(function () {
		var id = FlowRouter.getParam('id');
		self.subscribe('project', id);
		self.subscribe('files.images.all');
	});
});

Template.Project.onRendered(function () {
	$(".update-project-container").hide();
})

Template.Project.helpers({
	project: () => {
		var id = FlowRouter.getParam('id');
	  return Projects.findOne({_id: id});
	}
});

Template.Project.events({
	'click #edit-project': () => {
		$(".update-project-container").show();
	},
	'submit #updateProjectForm': (e) => {
		// prevent form from submitting.
		// set jquert form, set object to send, array for pictures, and get Id
		e.preventDefault();
		var $form = $(e.target);
		var o = {};
		var p = [];
		var id = FlowRouter.getParam('id');

		o.name = $("#update-name").val();
		o.desc = $("#update-desc").val();
		var liPics = $form.find(".list-group").find(".autoform-array-item");

		liPics.each(function(i, li) {
			p.push($(li).find("input").val());
		});

		o.pics = p;
		
		Meteor.call('updateProject', id, o);
		$form.hide();
	}
});

SimpleSchema.debug = true;