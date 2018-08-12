export default class AppView {
    constructor($renderTo) {
        this.$renderTo = $renderTo;
        this.currentView = null;
    }

    // need to switch views via this method
    // ref: https://lostechies.com/derickbailey/2011/09/15/zombies-run-managing-page-transitions-in-backbone-apps/
    render(view) {
        if (this.currentView && typeof this.currentView.close === 'function') {
            this.currentView.close();
        }

        this.currentView = view;

        if (this.currentView && typeof this.currentView.render === 'function') {
            this.currentView.render();
        }

        this.$renderTo.html(this.currentView.el);
    }
}
