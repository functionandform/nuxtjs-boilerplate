import Vue from 'vue'


Vue.filter('tidyUrl', (url) => {
	return url.replace('https://','').replace('http://','');
})