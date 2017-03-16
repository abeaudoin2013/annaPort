Template.About.onCreated(function () {
	var self = this;
	self.autorun(function () {
		self.subscribe('projects');
		self.subscribe('files.images.all');
	});
});

Template.About.helpers({
  images: function () {
    return Images.find({});
  },
  percentage: function () {
    return (100/Images.find({}).count()).toString() + "%";
  }
});