// orval.config.ts
export default {
    api: {
        input: 'backend/openapi.yaml', // your generated spec
        output: {
            mode: 'tags',
            target: 'frontend/src/api/generated.ts', // where the client will go
            client: 'react-query', // or 'axios' if you prefer plain axios
            schemas: 'frontend/src/api/schemas', // where the generated types will go
            override: {
               mutator: {
                   path: 'frontend/src/api/config.ts',
                   name: 'customInstance',
               }
            }
        },
    },
};
