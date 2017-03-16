Meteor.publish('projects', function () {
	return Projects.find();
});
Meteor.publish('project', function(id) {
  check(id, String);
  return Projects.find({_id: id});
});
Meteor.publish('files.images.all', function () {
  return Images.collection.find({});
});
Meteor.publish('allUsers', function () {
	
	if(Roles.userIsInRole(this.userId, 'admin')) {
		return Meteor.users.find({});
	}
	
});
