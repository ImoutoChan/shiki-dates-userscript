// ==UserScript==
// @name         Shiki History Dates
// @namespace    http://shikimori.org/
// @version      1.3.0
// @description  Dates in history on shikimori.org
// @author       ImoutoChan
// @match        https://shikimori.org/*
// @match        http://shikimori.org/*
// @license      MIT
// @grant        none
// ==/UserScript==

var debug = false;

function log(message) {
    if (!debug) {
        return;
    }

    console.log('ShikiRating: ' + message);
}

var last = 0;

var redrawDates = function() {
    'use strict';
    log("enter");

    var dateNodes = document.querySelectorAll(".date");
    log(dateNodes.length);

    if (last === dateNodes.length) {
        log("processed!");
        return;
    }
    last = dateNodes.length;

    for (var i = 0; i < dateNodes.length; i++) {
        var dateAttribute = dateNodes[i].getAttribute("datetime");
        if (dateAttribute === null) {
            continue;
        }

        var newDate = new Date(dateAttribute).toLocaleDateString('en-GB', {
            day : 'numeric',
            month : 'short',
            year : 'numeric',
            hour : 'numeric',
            minute : 'numeric'
        });

        if (newDate != "Invalid Date") {
            dateNodes[i].textContent = newDate;
        }
    }
};

function ready(fn) {
    document.addEventListener('page:load', fn);

    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

var observeDOM = (function(){
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    var eventListenerSupported = window.addEventListener;

    return function(obj, callback){
        if(MutationObserver){
            // define a new observer
            var obs = new MutationObserver(function(mutations, observer){
                if(mutations[0].addedNodes.length || mutations[0].removedNodes.length)
                    callback();
            });
            // have the observer observe foo for changes in children
            obs.observe(obj, { childList: true, subtree: true });
        }
        else if(eventListenerSupported){
            obj.addEventListener('DOMNodeInserted', callback, false);
            obj.addEventListener('DOMNodeRemoved', callback, false);
        }
    };
})();

observeDOM(document.querySelector('html'), redrawDates);

ready(redrawDates);
