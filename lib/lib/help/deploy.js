"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEPLOY_DOMAIN = exports.DEPLOY_TRIGGER = exports.DEPLOY_FUNCTION = exports.DEPLOY_SERVICE = exports.DEPLOY_ALL = exports.DEPLOY = void 0;
exports.DEPLOY = [
    {
        header: 'Deploy',
        content: 'The ability to deploy resources\nIf executing s deploy is equivalent to s deploy all',
    },
    {
        header: 'Usage',
        content: '$ s deploy <sub-command>',
    },
    {
        header: 'SubCommand List',
        content: [
            {
                desc: 'all',
                example: 'Deploy all resources, you can get help through [s deploy all -h]',
            },
            {
                desc: 'function',
                example: 'Only deploy function resources, you can get help through [s deploy function -h]',
            },
            {
                desc: 'trigger',
                example: 'Only deploy trigger resources, you can get help through [s deploy trigger -h]',
            },
        ],
    },
];
var GLOBAL_OPTIONS = [
    {
        name: 'help',
        description: 'Help for command',
        alias: 'h',
        type: Boolean,
    },
    {
        name: 'debug',
        description: 'Output debug informations',
        type: Boolean,
    },
];
exports.DEPLOY_ALL = [
    {
        header: 'Deploy all',
        content: 'Deploy all resources',
    },
    {
        header: 'Usage',
        content: '$ s deploy all <options>',
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'type',
                description: 'Only deploy configuration or code. Value: code, config',
                type: Boolean,
            },
            {
                name: 'use-local',
                description: 'Deploy resource using local config',
                type: Boolean,
            },
            {
                name: 'assume-yes',
                description: 'Assume that the answer to any question which would be asked is yes',
                alias: 'y',
                type: Boolean,
            },
        ],
    },
    {
        header: 'Global Options',
        optionList: GLOBAL_OPTIONS,
    },
    {
        header: 'Examples with Yaml',
        content: ['$ s deploy all', '$ s deploy all --use-local'],
    },
];
exports.DEPLOY_SERVICE = [
    {
        header: 'Deploy service',
        content: 'Only deploy service resources',
    },
    {
        header: 'Usage',
        content: '$ s deploy service <options>',
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'use-local',
                description: 'Deploy resource using local config',
                type: Boolean,
            },
            {
                name: 'assume-yes',
                description: 'Assume that the answer to any question which would be asked is yes',
                alias: 'y',
                type: Boolean,
            },
        ],
    },
    {
        header: 'Global Options',
        optionList: GLOBAL_OPTIONS,
    },
    {
        header: 'Examples with Yaml',
        content: ['$ s deploy service', '$ s deploy service --use-local'],
    },
];
exports.DEPLOY_FUNCTION = [
    {
        header: 'Deploy function',
        content: 'Only deploy function resources',
    },
    {
        header: 'Usage',
        content: '$ s deploy function <options>',
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'type',
                description: 'Only deploy configuration or code Value: code, config',
                type: Boolean,
            },
            {
                name: 'use-local',
                description: 'Deploy resource using local config',
                type: Boolean,
            },
            {
                name: 'assume-yes',
                description: 'Assume that the answer to any question which would be asked is yes',
                alias: 'y',
                type: Boolean,
            },
        ],
    },
    {
        header: 'Global Options',
        optionList: GLOBAL_OPTIONS,
    },
    {
        header: 'Examples with Yaml',
        content: ['$ s deploy function', '$ s deploy function --use-local'],
    },
];
exports.DEPLOY_TRIGGER = [
    {
        header: 'Deploy trigger',
        content: 'Only deploy trigger resources',
    },
    {
        header: 'Usage',
        content: '$ s deploy trigger <options>',
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'trigger-name',
                description: 'Only deploy the specified trigger',
                type: Boolean,
            },
            {
                name: 'use-local',
                description: 'Deploy resource using local config',
                type: Boolean,
            },
            {
                name: 'assume-yes',
                description: 'Assume that the answer to any question which would be asked is yes',
                alias: 'y',
                type: Boolean,
            },
        ],
    },
    {
        header: 'Global Options',
        optionList: GLOBAL_OPTIONS,
    },
    {
        header: 'Examples with Yaml',
        content: ['$ s deploy trigger', '$ s deploy trigger --use-local'],
    },
];
exports.DEPLOY_DOMAIN = [
    {
        header: 'Deploy domain',
        content: 'Only deploy domain resources',
    },
    {
        header: 'Usage',
        content: '$ s deploy domain <options>',
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'use-local',
                description: 'Deploy resource using local config',
                type: Boolean,
            },
            {
                name: 'assume-yes',
                description: 'Assume that the answer to any question which would be asked is yes',
                alias: 'y',
                type: Boolean,
            },
        ],
    },
    {
        header: 'Global Options',
        optionList: GLOBAL_OPTIONS,
    },
    {
        header: 'Examples with Yaml',
        content: ['$ s deploy domain'],
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9oZWxwL2RlcGxveS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBYSxRQUFBLE1BQU0sR0FBRztJQUNwQjtRQUNFLE1BQU0sRUFBRSxRQUFRO1FBQ2hCLE9BQU8sRUFBRSxzRkFBc0Y7S0FDaEc7SUFDRDtRQUNFLE1BQU0sRUFBRSxPQUFPO1FBQ2YsT0FBTyxFQUFFLDBCQUEwQjtLQUNwQztJQUNEO1FBQ0UsTUFBTSxFQUFFLGlCQUFpQjtRQUN6QixPQUFPLEVBQUU7WUFDUDtnQkFDRSxJQUFJLEVBQUUsS0FBSztnQkFDWCxPQUFPLEVBQUUsa0VBQWtFO2FBQzVFO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLE9BQU8sRUFBRSxpRkFBaUY7YUFDM0Y7WUFDRDtnQkFDRSxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsK0VBQStFO2FBQ3pGO1NBQ0Y7S0FDRjtDQUNGLENBQUM7QUFFRixJQUFNLGNBQWMsR0FBRztJQUNyQjtRQUNFLElBQUksRUFBRSxNQUFNO1FBQ1osV0FBVyxFQUFFLGtCQUFrQjtRQUMvQixLQUFLLEVBQUUsR0FBRztRQUNWLElBQUksRUFBRSxPQUFPO0tBQ2Q7SUFDRDtRQUNFLElBQUksRUFBRSxPQUFPO1FBQ2IsV0FBVyxFQUFFLDJCQUEyQjtRQUN4QyxJQUFJLEVBQUUsT0FBTztLQUNkO0NBQ0YsQ0FBQztBQUVXLFFBQUEsVUFBVSxHQUFHO0lBQ3hCO1FBQ0UsTUFBTSxFQUFFLFlBQVk7UUFDcEIsT0FBTyxFQUFFLHNCQUFzQjtLQUNoQztJQUNEO1FBQ0UsTUFBTSxFQUFFLE9BQU87UUFDZixPQUFPLEVBQUUsMEJBQTBCO0tBQ3BDO0lBQ0Q7UUFDRSxNQUFNLEVBQUUsU0FBUztRQUNqQixVQUFVLEVBQUU7WUFDVjtnQkFDRSxJQUFJLEVBQUUsTUFBTTtnQkFDWixXQUFXLEVBQUUsd0RBQXdEO2dCQUNyRSxJ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