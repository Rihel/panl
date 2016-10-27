import './main.scss';
import './jquery.plugin'
$(function(){
	let app=$('<div>');
	app.html('<h1>hellow world</h1>');
	app.append($('body'));
	$('h1').greenify();
})