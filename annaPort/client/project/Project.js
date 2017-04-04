var sanitizeHtml = require('sanitize-html');

Template.Project.onCreated(function () {
	this.editMode = new ReactiveVar(false);
	var self = this;
	self.autorun(function () {
		var id = FlowRouter.getParam('id');
		self.subscribe('files.images.all');
		self.subscribe('project', id);
		
	});

});

Template.Project.helpers({
	project: () => {
		var id = FlowRouter.getParam('id');
	  return Projects.findOne({_id: id});
	},
	editMode: function () {
		return Template.instance().editMode.get();
	},
	link: function (img) {
		var image = Images.findOne({_id: img});
		return image.link();
	},
	percentage: function (pics) {  
		return (100/pics.length).toString() + "%";
  },
  previewMode: function () {
  	if (Session.get('preview-mode')) {
  		return 'active'
  	} else {
  		return 'inactive'
  	}
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
	'click .fa-pencil' : function (event, template) {
		// Session.set('editMode', !Session.get('editMode'));
		template.editMode.set(!template.editMode.get());
	},
	'click .project-picture-container' : function (e) {
		var $p = $(e.target).closest(".project-picture-container");
		console.log($p);

		if ($p.hasClass("inactive")) {
			$p.removeClass("inactive")
			  .addClass("active");
			$p.siblings(".project-picture-container").each(function (i, div) {
				if ($(div).hasClass("active")) {
					$(div).removeClass("active")
					      .addClass("inactive");
				}
			})
		} else if ($p.hasClass("active")) {
			$p.removeClass("active")
			  .addClass("in-between");
			function set () {
				var set = setTimeout(function () {
					$p.removeClass("in-between").addClass("inactive");
				}, 500);
			};
			set();

		}

		// Session.set('preview-mode', !Session.get('preview-mode'));
	}
});

SimpleSchema.debug = true;