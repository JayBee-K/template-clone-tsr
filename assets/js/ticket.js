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

					let elm_frm = elm_event.closest('form'),
						elm_frm__box = elm_frm.find('.random-box'),
						elm_ball = parseInt(elm_event.attr('data-ball'));
					if (!elm_ball.isNaN) {
						elm_frm__box.map(function () {
							let elm_this = $(this),
								elm_item__key = elm_this.find('.random-position').text().toLowerCase().trim(),
								elm_item__list = elm_this.find('.random-list'),
								htmlRender = '';

							elm_this.find('.random-event').removeClass('active');
							for (let i = 0; i < elm_ball; i++) {
								htmlRender += renderHTMLBall(elm_item__key);
							}

							elm_item__list.html(htmlRender);
						})
					} else {
						console.log('Có lỗi xảy ra, vui lòng thử lại!');
					}
				}
			});
		}
	}

	const renderHTMLBall = function (key) {
		return `<span class="random-circle random-number">
					<span class="random-number_preview"></span>
					<input type="hidden" class="random-number_value" name="series_${key}[]">
				</span>`
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

	let formatPrice = function (price, format = '.') {
		let arrayPrice = [];
		var x = price;
		x = x.replace(/[^0-9]/g, '');

		let $j = 0;
		for (let $i = x.length - 1; $i >= 0; $i--) {

			if ($j === 3) {
				arrayPrice.push(format);
				arrayPrice.push(x[$i]);
				$j = 0;
			} else {
				arrayPrice.push(x[$i]);
			}
			$j++;
		}
		let temp = '';
		for (let $i = arrayPrice.length - 1; $i >= 0; $i--) {
			temp = temp + arrayPrice[$i];
		}

		return temp;
	}

	/***
	 * elm: element click
	 * max_rangeNumber: số lượng bóng (45, 55...)
	 * type: create - 1, delete - 0;
	 */

	let handleRandom = function (elm, max_rangeNumber, type = 1) {
		let elmBox = elm.closest('.random-box'),
			childLength_elmBox = elmBox.find('.random-number');

		if (type === 1) {
			let arrNumbers = [];
			// Get được mảng number bao gồm bộ số từ 1 -> tối đa max_rangeNumber
			for (let i = 0; i < max_rangeNumber; i++) {
				arrNumbers.push({
					number: i + 1,
					time: 0
				});
			}

			// Chạy n lần để tìm ra các con số xuất hiện nhiều lần
			for (let i = 0; i < 100000; i++) {
				let number = Math.floor(Math.random() * max_rangeNumber) + 1;
				arrNumbers[number - 1].time++;
			}

			// Sắp xếp lại mảng theo thứ tự xuất hiện nhiều lần đến ít
			arrNumbers.sort(function (a, b) {
				return b.time - a.time
			});

			let arrTicket = [];

			// Bỏ vào mảng Ticket số n phần tử (n: loại vé (thường, bao 5,...))
			for (let i = 0; i < childLength_elmBox.length; i++) {
				arrTicket.push(arrNumbers[i].number)
			}

			// Sắp xếp lại mảng theo giá trị số từ nhỏ đến lớn
			arrTicket.sort(function (a, b) {
				return a - b
			});

			// Render ra view

			for (let i = 0; i < childLength_elmBox.length; i++) {
				$(childLength_elmBox[i]).find('.random-number_preview').text(arrTicket[i]);
				$(childLength_elmBox[i]).find('.random-number_value').val(arrTicket[i]);
			}
		} else {
			elmBox.find('.random-number_preview').text('');
			elmBox.find('.random-number_value').val('');
		}
	}

	let handlePrice = function (elm) {
		let ticket_length = elm.find('.random-event.active').length,
			elm_price = elm.find('.unit-price'),
			unit_price = elm.find('.handleDropdownType .dropdown-list_item.active').attr('data-price');

		elm_price.html(formatPrice((ticket_length * unit_price).toString()) + '&nbsp;<span>vnđ</span>');
	};

	let randomNumber = function (frm, max_rangeNumber) {
		let form_elmRandom = frm;

		if (form_elmRandom.length) {
			form_elmRandom.on('click', '.random-event', function () {
				handleRandom($(this), max_rangeNumber, (!$(this).hasClass('active') ? 1 : 0));
				$(this).toggleClass('active');
				handlePrice(form_elmRandom);
			});

			form_elmRandom.on('click', '.random-event_quick', function () {
				let getRowNoActiveFirst = $(form_elmRandom.find('.random-event:not(.active)').get(0));
				getRowNoActiveFirst.trigger('click');
			});
		}
	}

	let handleSubmitTicket = function (elm) {
		elm.submit(function (e) {
			console.log(elm.serializeArray());
			return false;
		});
	}

	$(function () {
		randomNumber($('#random-type_655'), 55);

		handleSubmitTicket($('#random-type_655'));

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