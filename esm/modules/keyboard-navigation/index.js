import { r, $ } from '../helpers';
var prefix = 'mm-kbdn';
var keyBindings = {
    toggleDrawer: 'm',
    closeDrawer: 'Escape',
    openSubPanel: ' ',
    backOneLevel: 'Backspace',
    firePanel: 'Enter'
};
var MmKeyboardNavigation = /** @class */ (function () {
    function MmKeyboardNavigation(node, selectedClass) {
        console.log('constructor()');
        this.node = node;
        // Disable default tab navigation for entire menu
        this.node.setAttribute('tabindex', '-1');
        this.node.querySelectorAll('a').forEach(function (anchor) {
            anchor.setAttribute('tabindex', '-1');
        });
        // Set selected panel
        var selected = $('.' + selectedClass);
        if (selected.length !== 0) {
            this.currentPanel = selected[selected.length - 1];
        }
        if (!this.currentPanel) {
            this.currentPanel = this.node.querySelector('li');
        }
        if (this.currentPanel) {
            this.currentPanel.classList.add(this.prefix + '--sel');
        }
    }
    Object.defineProperty(MmKeyboardNavigation.prototype, "prefix", {
        /**
         * Prefix for the class.
         */
        get: function () {
            return prefix;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MmKeyboardNavigation.prototype, "keyBindings", {
        get: function () {
            return keyBindings;
        },
        enumerable: false,
        configurable: true
    });
    MmKeyboardNavigation.prototype._changeCurrentPanel = function (to) {
        this.currentPanel.classList.remove(this.prefix + '--sel');
        this.currentPanel = to;
        this.currentPanel.classList.add(this.prefix + '--sel');
    };
    MmKeyboardNavigation.prototype.selectVertically = function (direction) {
        var parent = this.currentPanel.parentElement;
        var sibling = direction === 'up' ? this.currentPanel.previousElementSibling : this.currentPanel.nextElementSibling;
        if (!sibling) {
            sibling = direction === 'up' ? parent.lastElementChild : parent.firstElementChild;
        }
        this._changeCurrentPanel(sibling);
    };
    MmKeyboardNavigation.prototype.backOneLevel = function () {
        var panelToClose = this.currentPanel.parentElement.parentElement;
        if (panelToClose === this.node) {
            return null;
        }
        this._changeCurrentPanel(panelToClose);
        return panelToClose;
    };
    MmKeyboardNavigation.prototype.openSubPanel = function () {
        var subPanels = r(this.currentPanel.children).filter(function (child) { return child.matches('ul'); });
        if (subPanels.length !== 0) {
            var panelToOpen = this.currentPanel;
            this._changeCurrentPanel(subPanels[0].querySelector('li'));
            return panelToOpen;
        }
        else {
            return null;
        }
    };
    MmKeyboardNavigation.prototype.goToAnchorDestination = function () {
        var anchors = r(this.currentPanel.children).filter(function (child) { return child.matches('a'); });
        if (anchors.length !== 0) {
            window.location.href = anchors[0].getAttribute('href');
        }
    };
    return MmKeyboardNavigation;
}());
export default MmKeyboardNavigation;
