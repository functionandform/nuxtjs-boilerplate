import Vue from 'vue'


Vue.filter('truncate', (slug) => {
	let str = slug.split('-');

	for (var i = 0; i < str.length; i++) {
		str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
	}
	return str.join(' ');
})