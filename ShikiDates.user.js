// ==UserScript==
// @name         Shiki History Dates
// @namespace    http://shikimori.org/
// @version      1.2.0
// @description  Dates in history on shikimori.org
// @author       ImoutoChan
// @match        https://shikimori.org/*
// @match        http://shikimori.org/*
// @grant        none
// ==/UserScript==


var func = function() {
    'use strict';

    $(".date").text(function() {
        var newDate = (new Date($(this).attr("datetime")).toLocaleDateString('en-GB', {
            day : 'numeric',
            month : 'short',
            year : 'numeric',
            hour : 'numeric',
            minute : 'numeric'
        }));

        if (newDate != "Invalid Date")
        {
            return newDate;
        }
    });
};

$(document).ready(func);
$(document).on('page:load', func);
$(document).on('turbolinks:load', func);
$(document).on('postloader:success', func);
