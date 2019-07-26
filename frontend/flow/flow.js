
window.Vaadin = window.Vaadin || {};
window.Vaadin.Flow = window.Vaadin.Flow || {};

const flow = {
    loadGwt: () => {
        import('./flow-bootstrap');
        import('./flow-client');
    },
    loadWc: (tag) => {
        const script = document.createElement('script');
        script.id = tag;
        script.type = 'module';
        script.src = `web-component/${tag}.js`;
        document.head.appendChild(script);
    }
}

export default flow;

// For debugging
window.flow = flow;

