

import '@vaadin/vaadin-lumo-styles/typography.js';
import '@vaadin/vaadin-lumo-styles/color.js';
import '@vaadin/vaadin-lumo-styles/spacing.js';

import { Router } from '@vaadin/router';
import './src/main-layout';


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
                    await import('./client-categories');
                }
            },
            {
                // fallback to Flow if no client-side routes match
                path: '(.*)',
                action: async (context) => {
                    await import('../target/frontend/generated-flow-imports');

                    // const { flow } = await import('@vaadin/flow');
                    // const app = await flow.embed();
                    // return app.render(context.pathname);
                }
            }
        ]
    }
];

const router = new Router(document.querySelector('#outlet'));
router.setRoutes(routes);