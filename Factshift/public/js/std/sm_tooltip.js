/**
 * Created by Sam Washington on 11/12/15.
 */
define(['jquery'], function ($) {

    function nextElementSibling(el) {
        do {
            el = el.nextSibling;
        } while (el && el.nodeType !== 1);
        return el;
    }


    var hidePopovers = function () {
        var popovers = document.querySelectorAll('.popover-clone');
        for (var i = 0; i < popovers.length; i++) {
            document.body.removeChild(popovers[i]);
        }
    };

    var showTooltip = function (target) {
        var originalPopover = target.nextElementSibling || nextElementSibling(target);
        var popover         = originalPopover.cloneNode(true);

        var scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
        var scrollX = window.pageXOffset || document.documentElement.scrollLeft || 0;

        var targetRect    = target.getBoundingClientRect();
        var targetWidth   = targetRect.width || (targetRect.left - targetRect.right);

        document.body.appendChild(popover);
        popover.className = popover.className + ' popover-clone';

        //Position the popup window
        popover.style.display  = 'block';
        popover.style.position = 'absolute';
        var left               = (targetWidth / 2 + targetRect.left + scrollX - popover.clientWidth / 2);
        if (left < 10) {
            left = 10;
        }
        popover.style.left = left + 'px';
        popover.style.top  = (targetRect.top + scrollY - popover.clientHeight - 5) + 'px';
        popover.className  = popover.className + ' popover-clone';

        //Position the arrow over the clicked element
        if (popover.querySelector) {
            var arrow        = popover.querySelector('.arrow');
            arrow.style.left = (targetRect.left - left + arrow.offsetWidth / 2) + 'px';
        }

        return false;
    };
    var isTip       = function (element) {
        return element.hasClass('sm-tooltip');
    };

    var isPopover = function ($element) {
        var element = $element[0];
        if (!element || element.tagName.toLowerCase() === 'body')
            return false;

        if ($element.hasClass('popover-clone')) return true;
        return isPopover(element.parentElement);
    };

    var click_listener = function (e) {
        var target = e.target;
        if (isTip(target) || isPopover(target)) {
            return;
        }
        hidePopovers();
    };

    var SmTooltip = function () {
        window.addEventListener('resize', hidePopovers);
        document.addEventListener('resize', click_listener);
    };

    return SmTooltip;
});