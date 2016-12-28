'use strict';

define(['crossvent', 'Emitter'], function (crossvent, Emitter) {
    var cache = {};
    var start = '(?:^|\\s)';
    var end   = '(?:\\s|$)';

    function lookupClass(className) {
        var cached = cache[className];
        if (cached) {
            cached.lastIndex = 0;
        } else {
            cache[className] = cached = new RegExp(start + className + end, 'g');
        }
        return cached;
    }

    function addClass(el, className) {
        var current = el.className;
        if (!current.length) {
            el.className = className;
        } else if (!lookupClass(className).test(current)) {
            el.className += ' ' + className;
        }
    }

    function rmClass(el, className) {
        el.className = el.className.replace(lookupClass(className), ' ').trim();
    }


    var classes = {};
    classes.add = addClass;
    classes.rm  = rmClass;


    var doc             = document;
    var documentElement = doc.documentElement;
    var body            = doc.body;

    function dragula(initialContainers, options) {
        var t      = {};
        t.elements = {
            _mirror         : undefined,    //mirror image
            _source         : undefined,    //source_container
            item            : undefined,    //item being dragged
            _initial_sibling: undefined,    //reference
            _sibling        : undefined,    //reference sibling now
            _copy           : undefined,    //item used for copying
            _lastDropTarget : null         //last container item was over
        };


        var len = arguments.length;
        if (len === 1 && Array.isArray(initialContainers) === false) {
            options           = initialContainers;
            initialContainers = [];
        }
        var _offsetX; // reference x
        var _offsetY; // reference y
        var _moveX; // reference move x
        var _moveY; // reference move y
        var _renderTimer; // timer for setTimeout renderMirrorImage
        var _grabbed; // holds mousedown context until first mousemove

        var o = options || {};


        (o.moves === undefined) && (o.moves = always);
        (o.accepts === undefined) && (o.accepts = always);
        (o.invalid === undefined) && (o.invalid = never);
        (o.containers === undefined) && (o.containers = initialContainers || []);
        (o.isContainer === undefined) && (o.isContainer = never);
        (o.copy === undefined) && (o.copy = false);
        (o.copySortSource === undefined) && (o.copySortSource = false);
        (o.removeOnSpill === undefined) && (o.removeOnSpill = false);
        (o.revertOnSpill === undefined) && (o.revertOnSpill = false);
        (o.direction === undefined) && (o.direction = 'vertical');
        (o.ignoreInputTextSelection === undefined) && (o.ignoreInputTextSelection = true);
        (o.mirrorContainer === undefined) && (o.mirrorContainer = body);

        var drake = new Emitter({
            containers: o.containers,
            start     : manualStart,
            end       : end,
            cancel    : cancel,
            remove    : remove,
            destroy   : destroy,
            dragging  : false
        });
        if (o.removeOnSpill === true) {
            drake.on('over', spillOver).on('out', spillOut);
        }

        events();

        return drake;

        function isContainer(el) {
            return drake.containers.indexOf(el) !== -1 || o.isContainer(el);
        }

        function events(remove) {
            var op = remove ? 'remove' : 'add';
            touchy(documentElement, op, 'mousedown', grab);
            touchy(documentElement, op, 'mouseup', release);
        }

        function eventualMovements(remove) {
            var op = remove ? 'remove' : 'add';
            touchy(documentElement, op, 'mousemove', startBecauseMouseMoved);
        }

        function movements(remove) {
            var op = remove ? 'remove' : 'add';
            touchy(documentElement, op, 'selectstart', preventGrabbed); // IE8
            touchy(documentElement, op, 'click', preventGrabbed);
        }

        function destroy() {
            events(true);
            release({});
        }

        function preventGrabbed(e) {
            if (_grabbed) {
                e.preventDefault();
            }
        }

        function grab(e) {
            _moveX = e.clientX;
            _moveY = e.clientY;

            var ignore = whichMouseButton(e) !== 1 || e.metaKey || e.ctrlKey;
            if (ignore) {
                console.log('ignore');
                return; // we only care about honest-to-god left clicks and touch events
            }
            var item    = e.target;
            var context = canStart(item);
            if (!context) {
                return;
            }
            _grabbed = context;
            eventualMovements();
            if (e.type === 'mousedown') {
                if (isInput(item)) { // see also: https://github.com/bevacqua/dragula/issues/208
                    item.focus(); // fixes https://github.com/bevacqua/dragula/issues/176
                } else {
                    e.preventDefault(); // fixes https://github.com/bevacqua/dragula/issues/155
                }
            }
        }

        function startBecauseMouseMoved(e) {
            if (!_grabbed) {
                return;
            }
            console.log('sbm');
            if (whichMouseButton(e) === 0) {
                release({});
                return; // when text is selected on an input and then dragged, mouseup doesn't fire. this is our only hope
            }
            // truthy check fixes #239, equality fixes #207
            if (e.clientX !== void 0 && e.clientX === _moveX && e.clientY !== void 0 && e.clientY === _moveY) {
                console.log('no');
                return;
            }
            if (o.ignoreInputTextSelection) {
                var clientX             = getCoord('clientX', e);
                var clientY             = getCoord('clientY', e);
                var elementBehindCursor = doc.elementFromPoint(clientX, clientY);
                if (isInput(elementBehindCursor)) {
                    console.log('is_input');
                    return;
                }
            }

            var grabbed = _grabbed; // call to end() unsets _grabbed
            eventualMovements(true);
            movements();
            end();
            start(grabbed);

            var offset = getOffset(t.elements.item);
            _offsetX   = getCoord('pageX', e) - offset.left;
            _offsetY   = getCoord('pageY', e) - offset.top;

            classes.add(t.elements._copy || t.elements.item, 'gu-transit');
            renderMirrorImage();
            drag(e);
        }

        function canStart(item) {
            if (drake.dragging && t.elements._mirror) {
                console.log('already dragging');
                return;
            }
            if (isContainer(item)) {
                return; // don't drag container itself
            }
            var handle = item;
            while (getParent(item) && isContainer(getParent(item)) === false) {
                if (o.invalid(item, handle)) {
                    console.log('is_invalid');
                    return;
                }
                item = getParent(item); // drag target should be a top element
                if (!item) {
                    console.log('no parent');
                    return;
                }
            }
            var source = getParent(item);
            if (!source) {
                return;
            }
            if (o.invalid(item, handle)) {
                return;
            }

            var movable = o.moves(item, source, handle, nextEl(item));
            if (!movable) {
                return;
            }

            return {
                item  : item,
                source: source
            };
        }

        function manualStart(item) {
            var context = canStart(item);
            if (context) {
                start(context);
            }
        }

        function start(context) {
            if (isCopy(context.item, context.source)) {
                t.elements._copy = context.item.cloneNode(true);
                drake.emit('cloned', t.elements._copy, context.item, 'copy');
            }
            console.log('start');

            t.elements._source          = context.source;
            console.log('set item');
            t.elements.item             = context.item;
            t.elements._initial_sibling = t.elements._sibling = nextEl(context.item);

            drake.dragging = true;
            drake.emit('drag', t.elements.item, t.elements._source);
        }


        function end() {
            if (!drake.dragging) {
                return;
            }
            var item = t.elements._copy || t.elements.item;
            !item && console.log(item);
            drop(item, getParent(item));
        }

        function ungrab() {
            _grabbed = false;
            eventualMovements(true);
            movements(true);
        }

        function release(e) {
            ungrab();

            if (!drake.dragging) {
                return;
            }
            var item                = t.elements._copy || t.elements.item;
            var clientX             = getCoord('clientX', e);
            var clientY             = getCoord('clientY', e);
            var elementBehindCursor = getElementBehindPoint(t.elements._mirror, clientX, clientY);
            var dropTarget          = findDropTarget(elementBehindCursor, clientX, clientY);
            if (dropTarget && ((t.elements._copy && o.copySortSource) || (!t.elements._copy || dropTarget !== t.elements._source))) {
                drop(item, dropTarget);
            } else if (o.removeOnSpill) {
                remove();
            } else {
                cancel();
            }
        }

        function drop(item, target) {
            !item && console.log(item);
            var parent = getParent(item);
            if (t.elements._copy && o.copySortSource && target === t.elements._source) {
                parent.removeChild(t.elements.item);
            }
            if (isInitialPlacement(target)) {
                drake.emit('cancel', item, t.elements._source, t.elements._source);
            } else {
                drake.emit('drop', item, target, t.elements._source, t.elements._sibling);
            }
            cleanup();
        }

        function remove() {
            if (!drake.dragging) {
                return;
            }
            var item   = t.elements._copy || t.elements.item;
            var parent = getParent(item);
            if (parent) {
                parent.removeChild(item);
            }
            drake.emit(t.elements._copy ? 'cancel' : 'remove', item, parent, t.elements._source);
            cleanup();
        }

        function cancel(revert) {
            if (!drake.dragging) {
                return;
            }
            var reverts = arguments.length > 0 ? revert : o.revertOnSpill;
            var item    = t.elements._copy || t.elements.item;
            var parent  = getParent(item);
            if (parent === t.elements._source && t.elements._copy) {
                parent.removeChild(t.elements._copy);
            }
            var initial = isInitialPlacement(parent);
            if ((initial === false) && (!t.elements._copy) && (reverts)) {
                t.elements._source.insertBefore(item, t.elements._initial_sibling);
            }
            if (initial || reverts) {
                drake.emit('cancel', item, t.elements._source, t.elements._source);
            } else {
                drake.emit('drop', item, parent, t.elements._source, t.elements._sibling);
            }
            cleanup();
        }

        function cleanup() {
            var item = t.elements._copy || t.elements.item;
            ungrab();
            removeMirrorImage();
            if (item) {
                classes.rm(item, 'gu-transit');
            }
            if (_renderTimer) {
                clearTimeout(_renderTimer);
            }
            drake.dragging = false;
            if (t.elements._lastDropTarget) {
                drake.emit('out', item, t.elements._lastDropTarget, t.elements._source);
            }
            drake.emit('dragend', item);
            console.log('null item');
            t.elements._source
                           = t.elements.item
                = t.elements._copy
                = t.elements._initial_sibling
                = t.elements._sibling
                = _renderTimer
                = t.elements._lastDropTarget = null;
        }

        function isInitialPlacement(target, s) {
            var sibling;
            if (s !== void 0) {
                sibling = s;
            } else if (t.elements._mirror) {
                sibling = t.elements._sibling;
            } else {
                sibling = nextEl(t.elements._copy || t.elements.item);
            }
            return target === t.elements._source && sibling === t.elements._initial_sibling;
        }

        function findDropTarget(elementBehindCursor, clientX, clientY) {
            var target = elementBehindCursor;
            while (target && !accepted()) {
                target = getParent(target);
            }
            return target;

            function accepted() {
                var droppable = isContainer(target);
                if (droppable === false) {
                    return false;
                }

                var immediate = getImmediateChild(target, elementBehindCursor);
                var reference = getReference(target, immediate, clientX, clientY);
                var initial   = isInitialPlacement(target, reference);
                if (initial) {
                    return true; // should always be able to drop it right back where it was
                }
                return o.accepts(t.elements.item, target, t.elements._source, reference);
            }
        }

        function drag(e) {
            if (!t.elements._mirror) {
                return;
            }
            e.preventDefault();

            var clientX = getCoord('clientX', e);
            var clientY = getCoord('clientY', e);
            var x       = clientX - _offsetX;
            var y       = clientY - _offsetY;

            t.elements._mirror.style.left = x + 'px';
            t.elements._mirror.style.top  = y + 'px';

            var item                = t.elements._copy || t.elements.item;
            var elementBehindCursor = getElementBehindPoint(t.elements._mirror, clientX, clientY);
            var dropTarget          = findDropTarget(elementBehindCursor, clientX, clientY);
            var changed             = dropTarget !== null && dropTarget !== t.elements._lastDropTarget;
            if (changed || dropTarget === null) {
                out();
                t.elements._lastDropTarget = dropTarget;
                over();
            }
            var parent = getParent(item);
            if (dropTarget === t.elements._source && t.elements._copy && !o.copySortSource) {
                if (parent) {
                    parent.removeChild(item);
                }
                return;
            }
            var reference;
            var immediate = getImmediateChild(dropTarget, elementBehindCursor);
            if (immediate !== null) {
                reference = getReference(dropTarget, immediate, clientX, clientY);
            } else if (o.revertOnSpill === true && !t.elements._copy) {
                reference  = t.elements._initial_sibling;
                dropTarget = t.elements._source;
            } else {
                if (t.elements._copy && parent) {
                    parent.removeChild(item);
                }
                return;
            }
            if (
                reference === null ||
                reference !== item &&
                reference !== nextEl(item) &&
                reference !== t.elements._sibling
            ) {
                t.elements._sibling = reference;
                dropTarget.insertBefore(item, reference);
                drake.emit('shadow', item, dropTarget, t.elements._source);
            }
            function moved(type) { drake.emit(type, item, t.elements._lastDropTarget, t.elements._source); }

            function over() { if (changed) { moved('over'); } }

            function out() { if (t.elements._lastDropTarget) { moved('out'); } }
        }

        function spillOver(el) {
            classes.rm(el, 'gu-hide');
        }

        function spillOut(el) {
            if (drake.dragging) { classes.add(el, 'gu-hide'); }
        }

        function renderMirrorImage() {
            if (t.elements._mirror) {
                return;
            }

            var rect                        = t.elements.item.getBoundingClientRect();
            t.elements._mirror              = t.elements.item.cloneNode(true);
            t.elements._mirror.style.width  = getRectWidth(rect) + 'px';
            t.elements._mirror.style.height = getRectHeight(rect) + 'px';
            classes.rm(t.elements._mirror, 'gu-transit');
            classes.add(t.elements._mirror, 'gu-mirror');
            console.log(t.elements._mirror);
            o.mirrorContainer.appendChild(t.elements._mirror);
            touchy(documentElement, 'add', 'mousemove', drag);
            classes.add(o.mirrorContainer, 'gu-unselectable');
            drake.emit('cloned', t.elements._mirror, t.elements.item, 'mirror');
        }

        function removeMirrorImage() {
            if (t.elements._mirror) {
                classes.rm(o.mirrorContainer, 'gu-unselectable');
                touchy(documentElement, 'remove', 'mousemove', drag);
                getParent(t.elements._mirror).removeChild(t.elements._mirror);
                t.elements._mirror = null;
            }
        }

        function getImmediateChild(dropTarget, target) {
            var immediate = target;
            while (immediate !== dropTarget && getParent(immediate) !== dropTarget) {
                immediate = getParent(immediate);
            }
            if (immediate === documentElement) {
                return null;
            }
            return immediate;
        }

        function getReference(dropTarget, target, x, y) {
            var horizontal = o.direction === 'horizontal';
            var reference  = target !== dropTarget ? inside() : outside();
            return reference;

            function outside() { // slower, but able to figure out any position
                var len = dropTarget.children.length;
                var i;
                var el;
                var rect;
                for (i = 0; i < len; i++) {
                    el   = dropTarget.children[i];
                    rect = el.getBoundingClientRect();
                    if (horizontal && rect.left > x) { return el; }
                    if (!horizontal && rect.top > y) { return el; }
                }
                return null;
            }

            function inside() { // faster, but only available if dropped inside a child element
                var rect = target.getBoundingClientRect();
                if (horizontal) {
                    return resolve(x > rect.left + getRectWidth(rect) / 2);
                }
                return resolve(y > rect.top + getRectHeight(rect) / 2);
            }

            function resolve(after) {
                return after ? nextEl(target) : target;
            }
        }

        function isCopy(item, container) {
            return typeof o.copy === 'boolean' ? o.copy : o.copy(item, container);
        }
    }

    function touchy(el, op, type, fn) {
        var touch     = {
            mouseup  : 'touchend',
            mousedown: 'touchstart',
            mousemove: 'touchmove'
        };
        var microsoft = {
            mouseup  : 'MSPointerUp',
            mousedown: 'MSPointerDown',
            mousemove: 'MSPointerMove'
        };
        if (global.navigator.msPointerEnabled) {
            crossvent[op](el, microsoft[type], fn);
        }
        crossvent[op](el, touch[type], fn);
        crossvent[op](el, type, fn);
    }

    function whichMouseButton(e) {
        if (e.touches !== void 0) { return e.touches.length; }
        if (e.buttons !== void 0) { return e.buttons; }
        if (e.which !== void 0) { return e.which; }
        var button = e.button;
        if (button !== void 0) { // see https://github.com/jquery/jquery/blob/99e8ff1baa7ae341e94bb89c3e84570c7c3ad9ea/src/event.js#L573-L575
            return button & 1 ? 1 : button & 2 ? 3 : (button & 4 ? 2 : 0);
        }
    }

    function getOffset(el) {
        var rect = el.getBoundingClientRect();
        return {
            left: rect.left + getScroll('scrollLeft', 'pageXOffset'),
            top : rect.top + getScroll('scrollTop', 'pageYOffset')
        };
    }

    function getScroll(scrollProp, offsetProp) {
        if (typeof global[offsetProp] !== 'undefined') {
            return global[offsetProp];
        }
        if (documentElement.clientHeight) {
            return documentElement[scrollProp];
        }
        return body[scrollProp];
    }

    function getElementBehindPoint(point, x, y) {
        var p       = point || {};
        var state   = p.className;
        var el;
        p.className += ' gu-hide';
        el          = doc.elementFromPoint(x, y);
        p.className = state;
        return el;
    }

    function never() { return false; }

    function always() { return true; }

    function getRectWidth(rect) { return rect.width || (rect.right - rect.left); }

    function getRectHeight(rect) { return rect.height || (rect.bottom - rect.top); }

    function getParent(el) { return el.parentNode === doc ? null : el.parentNode; }

    function isInput(el) { return el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT'; }

    function nextEl(el) {
        return el.nextElementSibling || manually();
        function manually() {
            var sibling = el;
            do {
                sibling = sibling.nextSibling;
            } while (sibling && sibling.nodeType !== 1);
            return sibling;
        }
    }

    function getEventHost(e) {
        // on touchend event, we have to use `e.changedTouches`
        // see http://stackoverflow.com/questions/7192563/touchend-event-properties
        // see https://github.com/bevacqua/dragula/issues/34
        if (e.targetTouches && e.targetTouches.length) {
            return e.targetTouches[0];
        }
        if (e.changedTouches && e.changedTouches.length) {
            return e.changedTouches[0];
        }
        return e;
    }

    function getCoord(coord, e) {
        var host    = getEventHost(e);
        var missMap = {
            pageX: 'clientX', // IE8
            pageY: 'clientY' // IE8
        };
        if (coord in missMap && !(coord in host) && missMap[coord] in host) {
            coord = missMap[coord];
        }
        return host[coord];
    }


    return dragula;
});