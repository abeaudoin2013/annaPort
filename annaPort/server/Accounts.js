var postSignUp = function (userId, info) {
	if (info.email === "annalublina@gmail.com") {
		Roles.addUsersToRoles(userId, 'admin');
	}
	if (info.profile.emailList === true) {
		Roles.addUsersToRoles(userId, 'emailList');
	}
	FlowRouter.go('/');
}

AccountsTemplates.configure({
	postSignUpHook: postSignUp
});
