Meteor.publish('projects', function () {
	return Projects.find({author: this.userId});
});
Meteor.publish('files.images.all', function () {
  return Images.collection.find({});
});