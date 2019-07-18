import '@vaadin/vaadin-lumo-styles/typography.js';
import '@vaadin/vaadin-lumo-styles/color.js';
import '@vaadin/vaadin-lumo-styles/spacing.js';

// @ts-ignore
import { Router } from '@vaadin/router/index.js';
import { routes } from './routes';

import { flow } from '@vaadin/flow';

const router = new Router(document.querySelector('#outlet'));
router.setRoutes([
    ...routes,
    {
        // fallback to Flow if no client-side routes match
        path: '(.*)',
        action: async (context) => {
            const app = await flow.embed();
            return app.render(context.pathname);
        }
    }
]);
