import Vue from 'vue'


Vue.filter('camelToSentance', (string) => {
	const result = string.replace( /([A-Z])/g, " $1" );
	const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
	return finalResult;
})