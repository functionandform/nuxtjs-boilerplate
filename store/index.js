import Vuex from 'vuex';
import fetch from 'node-fetch';
import fs from 'fs';


const createStore = () => {
  return new Vuex.Store({
    modules: {
      
    },
    actions: {
        async nuxtServerInit({commit}, {app, $config}) {
            console.log('testing');
            const token = $config.graphqlToken;
            const uri = $config.apiBaseUrl + $config.graphqlPath;

            // only update fragements locally or while in dev mode.
            if (process.env.NODE_ENV == 'dev') {
                 
                // LOAD FRAGMENT TYPES AND STORE IN FILE
                // APOLLO READS THIS FILE LATER
                fetch(uri, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', authorization: 'Bearer ' + token, },
                    body: JSON.stringify({
                        variables: {},
                        query: `
                            {
                                __schema {
                                    types {
                                        kind
                                        name
                                        possibleTypes {
                                            name
                                        }
                                    }
                                }
                            }
                        `,
                    }),
                })
                .then(result => result.json())
                .then(result => {
                    console.info('Schame generated');
                    console.log(result);
                    // here we're filtering out any type information unrelated to unions or interfaces
                    const filteredData = result.data.__schema.types.filter(
                    type => type.possibleTypes !== null,
                    );
                    result.data.__schema.types = filteredData;
                    fs.writeFile('./apollo/client-configs/schema.json', JSON.stringify(result.data), err => {
                        if (err) {
                            console.error('Error writing fragmentTypes file', err);
                        }
                    });
                });

            }
            
        },
    }
  });
};

export default createStore