root = typeof exports !== 'undefined' && exports !== null ? exports : this;

root.LIMIT = 10;
root.INC = 5;

//root.NOTIFIES = ['有了新的评论', '有了新的修改'];
root.NOTIFIES = {
    0: '评论了: ',
    1: '修改了: '
};
root.NOTIFIES_LIMIT = 10;

root.TOAST_INFO = {
	icon: "info",
	showHideTransition: 'slide',
	stack: 1,
	hideAfter: 2500,
	position: 'top-center',
}
