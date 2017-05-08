Images = new FilesCollection({
  collectionName: 'Images',
  storagePath: '/images',
  allowClientCode: true, // Required to let you remove uploaded file
  permissions: 0774,
	parentDirPermissions: 0774,
  onBeforeRemove: function (cursor) {
    if (this.userId) {
      var user = this.user();
      if (Roles.userIsInRole(user, 'admin')) {

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
      afFieldInput: {
        type: 'summernote',
        class: 'editor', // optional
        settings: {
        	height: 300,
        	toolbar: [
				    ['style', ['bold', 'italic', 'underline', 'clear']],
				    ['font', ['strikethrough', 'superscript', 'subscript', 'fontname']],
				    ['fontsize', ['fontsize']],
				    ['color', ['color']],
				    ['para', ['ul', 'ol', 'paragraph']],
				    ['height', ['height']]
				  ],
				  fontNames: ['Oxygen']
        }
      }
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
  },
  isVisible: {
  	type: String,
  	label: "Make invisible? *This will only hide project on navigation*",
  	allowedValues: ["visible", "invisible"]
  }
});

Meteor.methods({
	deleteProject: function (id) {
		Projects.remove(id);
	},
	deleteImage: function (id) {
		Images.remove(id);
	}
});


Projects.attachSchema(ProjectSchema);