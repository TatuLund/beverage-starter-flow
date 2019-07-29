import '@vaadin/vaadin-lumo-styles/icons.js';
import '@vaadin/vaadin-lumo-styles/spacing.js';
import '@vaadin/vaadin-lumo-styles/typography.js';
import '@vaadin/vaadin-lumo-styles/style.js';
import '@vaadin/vaadin-lumo-styles/color.js';
import './styles/shared-styles.js';

import { Router } from '@vaadin/router';
import './src/main-layout';

import client from './generated/connect-client.default';
import { Flow } from '@vaadin/flow';

const flow = new Flow({
    imports: () => import('../target/frontend/generated-flow-imports')
});

const routes = [
    {
        path: '/',
        component: 'main-layout',
        children: [
            {
                path: '/client-categories',
                title: 'Client Categories',
                component: 'client-categories',
                action: async () => {
                    await import('./src/client-categories');
                }
            },
            {
                path: '/client-reviews',
                title: 'Client Reviews',
                component: 'client-reviews',
                action: async () => {
                    await import('./src/client-reviews');
                }
            },
            {
                path: '/flow-category-list',
                title: 'Server Categories',
                component: 'flow-category-list',
                action: () => flow.load()
            },
            {
                path: '/flow-review-list',
                title: 'Server Categories',
                component: 'flow-review-list',
                action: () => flow.load()
            },
            // FIXME, does not work 
            {
                // fallback to Flow if no client-side routes match
                path: '(.*)',
                action: (context, commands) => flow.navigate(context, commands)
            }
        ]
    }
];



const router = new Router(document.querySelector('#outlet'));
router.setRoutes(routes);

/// Disable interactive login right now
client.credentials = function() {
    return new Promise((resolve, reject) => {
        resolve({
            username: 'user',
            password: 'user',
            stayLoggedIn: true
        })
    })
}


