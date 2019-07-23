
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

import client from './generated/connect-client.default';


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
                path: '/client-reviews',
                title: 'Client Reviews',
                component: 'client-reviews',
                action: async () => {
                    await import('./client-reviews');
                }
            },
            {
                path: '/flow-categories',
                title: 'Server Categories',
                component: 'flow-category-list',
                action: async () => {
                    await import('../target/frontend/generated-flow-imports');
                    loadFlowWC('flow-category-list');
                }
            },
            {
                path: '/flow-reviews',
                title: 'Server Categories',
                component: 'flow-review-list',
                action: async () => {
                    await import('../target/frontend/generated-flow-imports');
                    loadFlowWC('flow-review-list');
                }
            },
            // {
            //     // fallback to Flow if no client-side routes match
            //     path: '(.*)',
            //     title: 'Review List',
            //     component: 'flow-review-list',
            //     action: async () => {
            //         console.log(this);
            //         await import('../target/frontend/generated-flow-imports');
            //         loadFlowWC('flow-review-list');
            //         window.t = this;
            //         // const wc = window.location.pathname.replace(router.baseUrl, '');
            //         // if (/^[a-z]\w*-[\w\-]+$/.test(wc)) {
            //         //     await import('../target/frontend/generated-flow-imports');
            //         //     loadFlowWC(wc)
            //         // }
            //     }
            // }
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



