import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import schema from './schema.json';
const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: schema
  })

export default ({req, app, $config}) => {
    const token = $config.graphqlToken;
    const endpoint = $config.apiBaseUrl + $config.graphqlPath;
    console.log('endpoint: '+endpoint);
    console.log('token: '+token);
    // let headersVal = {
    //     'Accept-Language': app.i18n.locale 
    // }
    return {
        httpEndpoint: endpoint,
        getAuth: () => `Bearer ${token}`,
        cache: new InMemoryCache({ fragmentMatcher }),
    }
}

