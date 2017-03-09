Template.Project.onCreated(function () {
	var self = this;
	self.autorun(function () {
		var id = FlowRouter.getParam('id');
		self.subscribe('project', id);
		self.subscribe('files.images.all');
	});
});

Template.Project.helpers({
	project: () => {
		var id = FlowRouter.getParam('id');
	  return Projects.findOne({_id: id});
	}
});

Template.Project.events({
	'click .fa-trash' : function () {
		var id = FlowRouter.getParam('id');
		var p = Projects.findOne({_id: id});
		var pics = p.pictures;
		pics.forEach(function (pic, i) {
			Meteor.call('deleteImage', pic);
		})
	  Meteor.call('deleteProject', id);
	  FlowRouter.go('home-about');
	},
	'click .fa-pencil' : function () {
		Session.set('editMode', !Session.get('editMode'));
	}
});

SimpleSchema.debug = true;