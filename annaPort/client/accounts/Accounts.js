var logoutHook = function () {
	Session.set('login-toggle', '');
	FlowRouter.go('/');
}
AccountsTemplates.configure({
	onLogoutHook: logoutHook
});

AccountsTemplates.addFields([
  {
  	_id: 'firstName',
  	type: 'text',
  	displayName: 'First Name',
  	required: true
  },
  {
  	_id: 'emailList',
  	type: 'checkbox',
  	displayName: 'Check this box to get latest updates from me.',
  	required: true
  }
])