Images = new FilesCollection({
  collectionName: 'Images',
  allowClientCode: true, // Required to let you remove uploaded file
  onBeforeRemove: function (cursor) {
    if (this.userId) {
      var user = this.user();
      if (Roles.userIsInRole(user, 'admin')) {
        // Allow removal only if
        // current user is signed-in
        // and has role is `admin`

        // FIND PROJECT COLLECTION BY IMAGE ID
        // UPDATE PICTURES ARRAY IN PROJECT COLLECTION
        // TO PULL DELETED PICTURE
        var imgId = cursor._selector;
        var project = Projects.findOne({pictures: {$in: [imgId]}});
        var p_id = project._id;
        Projects.update({"_id": p_id}, {"$pull": {"pictures": imgId}});
        return true;
        
      }
    }
    return false;
  }
});

Projects = new Mongo.Collection('projects');

Projects.allow({
	// who is allowed to insert into this recipes function
	// if user Id exists
	insert: function (userId, doc) {
		return !!userId;
	},
	update: function (userId, doc) {
		return !!userId
	}
});

ProjectSchema = new SimpleSchema({
	name: {
		type: String,
		label: "Name"
	},
	desc: {
		type: String,
		label: "Description",
		autoform: {
			rows: 5
		}
	},
	author: {
		type: String,
		label: "Author",
		autoValue: function () {
			return this.userId
		},
		autoform: {
			type: "hidden"
		}
	},
	pictures: {
    type: [String],
    label: 'Add Pictures'
  },
  "pictures.$": {
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Images'
      }
    }
  }
});

Meteor.methods({
	deleteProject: function (id) {
		Projects.remove(id);
	},
	deleteImage: function (id) {
		Images.remove(id);
	}
})


Projects.attachSchema(ProjectSchema);