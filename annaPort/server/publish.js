Meteor.publish('projects', function () {
	return Projects.find({author: this.userId});
});
Meteor.publish('project', function(id) {
  check(id, String);
  return Projects.find({_id: id});
});
Meteor.publish('files.images.all', function () {
  return Images.collection.find({});
});
