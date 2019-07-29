

export class Flow {
    constructor(config) {
        this.config = config;
        // Prepare flow namespaces
        window.Vaadin = window.Vaadin || {};
        window.Vaadin.Flow = window.Vaadin.Flow || {};
    }
    async load() {
        if (!this.loaded) {
            console.log("Loading flow imports");
            if (this.config && typeof this.config.imports === 'function') {
                await this.config.imports();
            }
            // FIXME: fails when converting this .js file to .ts
            await import('./flow-bootstrap');
            await import('./flow-client');
            this.loaded = true;
        }
    }
    async navigate(context, commands) {
        await this.load();
        // FIXME: for some reason this does not work in router
        return document.createElement(context.path);
    }
}