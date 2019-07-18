import './src/main-layout';

export const routes = [
    {
        path: '/',
        component: 'main-layout',
        children: [
            {
                path: '/client-reviews',
                title: 'Home',
                component: 'home-view',
                action: async () => {
                    await import('./src/views/client-reviews');
                }
            }
        ]
    }
];
