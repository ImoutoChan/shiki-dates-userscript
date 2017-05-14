// ==UserScript==
// @name         Shiki History Dates
// @namespace    http://shikimori.org/
// @version      1.0.0
// @description  Dates in history on shikimori.org
// @author       ImoutoChan
// @match        https://shikimori.org/*
// @match        http://shikimori.org/*
// @grant        none
// ==/UserScript==


var func = function() {
    'use strict';

    $(".date").text(function() {
        return $(this).attr("datetime");
    });
};

$(document).ready(func);
$(document).on('page:load', func);
$(document).on('turbolinks:load', func);
$(document).on('postloader:success', func);
