
const div = document.createElement('div');
div.innerHTML = '<custom-style><style include="lumo-color lumo-typography"></style></custom-style>';
document.head.insertBefore(div.firstElementChild, document.head.firstChild);

import '@vaadin/vaadin-lumo-styles/icons.js';
import '@vaadin/vaadin-lumo-styles/spacing.js';
import '@vaadin/vaadin-lumo-styles/typography.js';
import '@vaadin/vaadin-lumo-styles/style.js';
import '@vaadin/vaadin-lumo-styles/color.js';
import 'Frontend/styles/shared-styles.js';

import '@vaadin/vaadin-lumo-styles/typography.js';
import '@vaadin/vaadin-lumo-styles/color.js';
import '@vaadin/vaadin-lumo-styles/spacing.js';


import { Router } from '@vaadin/router';
import './src/main-layout';


function loadFlowWC(tag) {
    const s = document.createElement('script');
    s.id = tag;
    s.type = 'module';
    s.src = `web-component/${tag}.js`;
    document.head.appendChild(s);
}

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
                title: 'Review List',
                component: 'flow-review-list',
                action: async () => {
                    await import('../target/frontend/generated-flow-imports');
                    loadFlowWC('flow-review-list')
                }                
            }
        ]
    }
];

const router = new Router(document.querySelector('#outlet'));
router.setRoutes(routes);
window.router  = router;