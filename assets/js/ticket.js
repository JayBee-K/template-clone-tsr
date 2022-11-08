;(function ($) {
    'use strict';

    let countDown = function (elm, date) {
        let endTime = (Date.parse(date) / 1000);

        let now = new Date();
        now = (Date.parse(now) / 1000);

        let timeLeft = endTime - now;

        let days = Math.floor(timeLeft / 86400);
        let hours = Math.floor((timeLeft - (days * 86400)) / 3600);
        let minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
        let seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

        if (hours < "10") {
            hours = "0" + hours;
        }
        if (minutes < "10") {
            minutes = "0" + minutes;
        }
        if (seconds < "10") {
            seconds = "0" + seconds;
        }

        elm.find(".event-countdown_days").html(days);
        elm.find(".event-countdown_hours").html(hours);
        elm.find(".event-countdown_minutes").html(minutes);
        elm.find(".event-countdown_seconds").html(seconds);
    }

    let dropdownType = function () {
        if ($('.handleDropdownType').length) {
            $('.handleDropdownType').on('click', '.dropdown-list_item', function () {
                let elm_event = $(this),
                    elm_dropdown = elm_event.closest('.handleDropdownType'),
                    elm_item_dropdown = elm_dropdown.find('.dropdown-list_item'),
                    elm_item_preview = elm_dropdown.find('.dropdown-toggle span');

                if (elm_event.hasClass('active')) {
                    return false;
                } else {
                    elm_item_dropdown.removeClass('active');
                    elm_event.addClass('active');
                    elm_item_preview.text(elm_event.text());
                }
            });
        }
    }

    let dropdownTime = function () {
        if ($('.handleDropdownTime').length) {
            $('.handleDropdownTime').on('click', '.dropdown-list_item', function (e) {
                e.stopPropagation();
                let elm_event = $(this);
                elm_event.toggleClass('active')
            });

            $('.handleDropdownTime').on('click', '.handleDropdownClose', function () {
                let elm_event = $(this),
                    elm_dropdown = elm_event.closest('.handleDropdownTime'),
                    elm_count_dropdown = elm_dropdown.find('.dropdown-list_item.active'),
                    elm_item_preview = elm_dropdown.find('.dropdown-toggle span');

                if (elm_count_dropdown.length === 1) {
                    elm_item_preview.text(elm_count_dropdown.text());
                } else {
                    elm_item_preview.text(`Đã chọn ${elm_count_dropdown.length} kỳ`);
                }
            });
        }
    }

    $(function () {
        if ($('.event-countdown').length) {
            $('.event-countdown').each(function () {
                let elm = $(this);
                setInterval(function () {
                    countDown(elm, elm.attr('data-date'));
                }, 1000);
            });
        }

        dropdownType();
        dropdownTime();
    });
})(jQuery);