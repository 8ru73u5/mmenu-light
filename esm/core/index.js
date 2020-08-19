import MmToggler from '../modules/match-media-toggler/index';
import MmSlidingPanelsNavigation from '../modules/sliding-panels-navigation/index';
import MmOffCanvasDrawer from '../modules/offcanvas-drawer/index';
/**
 * Class for a lightweight mobile menu.
 */
var MmenuLight = /** @class */ (function () {
    /**
     * Create a lightweight mobile menu.
     *
     * @param {HTMLElement} menu                HTML element for the menu.
     * @param {string}      [mediaQuery='all']  Media queury to match for the menu.
     */
    function MmenuLight(menu, mediaQuery) {
        if (mediaQuery === void 0) { mediaQuery = 'all'; }
        //  Store the menu node.
        this.menu = menu;
        //  Create the toggler instance.
        this.toggler = new MmToggler(mediaQuery);
    }
    /**
     * Add navigation for the menu.
     *
     * @param {object} options Options for the navigation.
     */
    MmenuLight.prototype.navigation = function (options) {
        var _this = this;
        //  Only needs to be done ones.
        if (!this.navigator) {
            options = options || {};
            var _a = options.title, title = _a === void 0 ? 'Menu' : _a, _b = options.selectedClass, selectedClass = _b === void 0 ? 'Selected' : _b, _c = options.slidingSubmenus, slidingSubmenus = _c === void 0 ? true : _c, _d = options.theme, theme = _d === void 0 ? 'light' : _d, _e = options.keyboardNavigation, keyboardNavigation = _e === void 0 ? true : _e;
            this.navigator = new MmSlidingPanelsNavigation(this.menu, title, selectedClass, slidingSubmenus, theme, keyboardNavigation);
            // Key for opening-closing the drawer
            if (keyboardNavigation) {
                document.addEventListener('keydown', function (event) {
                    var _a, _b, _c;
                    if (event.key === 'm') {
                        if (!document.body.classList.contains(_this.drawer.prefix + "-opened")) {
                            (_a = _this.drawer) === null || _a === void 0 ? void 0 : _a.open();
                            _this.menu.focus();
                        }
                        else {
                            (_b = _this.drawer) === null || _b === void 0 ? void 0 : _b.close();
                            _this.menu.blur();
                        }
                    }
                    if (event.key === 'Escape' && document.body.classList.contains(_this.drawer.prefix + "-opened")) {
                        (_c = _this.drawer) === null || _c === void 0 ? void 0 : _c.close();
                        _this.menu.blur();
                    }
                });
            }
            //  En-/disable
            this.toggler.add(function () { return _this.menu.classList.add(_this.navigator.prefix); }, function () { return _this.menu.classList.remove(_this.navigator.prefix); });
        }
        return this.navigator;
    };
    /**
     * Add off-canvas behavior to the menu.
     *
     * @param {object} options Options for the off-canvas drawer.
     */
    MmenuLight.prototype.offcanvas = function (options) {
        var _this = this;
        //  Only needs to be done ones.
        if (!this.drawer) {
            options = options || {};
            var _a = options.position, position = _a === void 0 ? 'left' : _a;
            this.drawer = new MmOffCanvasDrawer(null, position);
            /** Original location in the DOM for the menu. */
            var orgLocation_1 = document.createComment('original menu location');
            this.menu.after(orgLocation_1);
            //  En-/disable
            this.toggler.add(function () {
                // Move the menu to the drawer.
                _this.drawer.content.append(_this.menu);
            }, function () {
                // Close the drawer.
                _this.drawer.close();
                // Move the menu to the original position.
                orgLocation_1.after(_this.menu);
            });
        }
        return this.drawer;
    };
    return MmenuLight;
}());
export default MmenuLight;
