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
					let elm_event = $(this), elm_dropdown = elm_event.closest('.handleDropdownType'),
						elm_item_dropdown = elm_dropdown.find('.dropdown-list_item'),
						elm_item_preview = elm_dropdown.find('.dropdown-toggle span');

					if (elm_event.hasClass('active')) {
						return false;
					} else {
						elm_item_dropdown.removeClass('active');
						elm_event.addClass('active');
						elm_item_preview.text(elm_event.text());

						let elm_frm = elm_event.closest('form'), elm_frm__box = elm_frm.find('.random-box'),
							elm_ball = parseInt(elm_event.attr('data-ball'));
						if (!elm_ball.isNaN) {
							elm_frm__box.map(function () {
								let elm_this = $(this), elm_item__key = elm_this.attr('data-key'),
									elm_item__list = elm_this.find('.random-list'), htmlRender = '';

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

					if (elm_event.hasClass('active')) {
						if (elm_event.closest('.handleDropdownTime').find('.dropdown-list_item.active').length == 1) {
							return false;
						}
						elm_event.removeClass('active');
					} else {
						elm_event.addClass('active');
					}
				});

				$('.handleDropdownTime').on('click', '.handleDropdownClose', function () {
					let elm_event = $(this), elm_dropdown = elm_event.closest('.handleDropdownTime'),
						elm_active = elm_dropdown.find('.dropdown-list_item.active'),
						elm_item_preview = elm_dropdown.find('.dropdown-toggle span');

					if (elm_active.length === 1) {
						elm_item_preview.text(elm_active.text());
					} else {
						elm_item_preview.text(`Đã chọn ${elm_active.length} kỳ`);
					}

					handleFillTime(elm_dropdown);
				});
			}
		}

		let handleFillTime = function (elm) {
			let arrValueTime = [], elm_active = elm.find('.dropdown-list_item.active');
			for (let i = 0; i < elm_active.length; i++) {
				arrValueTime.push($(elm_active[i]).attr('data-time'));
			}

			arrValueTime = arrValueTime.join('-');
			elm.find('.random-time').val(arrValueTime);
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


		let handlePrice = function (elm) {
			let elm_frm = elm.closest('form'),
				ticket_length = elm_frm.find('.random-event.active').length,
				elm_price = elm_frm.find('.unit-price'),
				unit_price = elm_frm.find('.handleDropdownType .dropdown-list_item.active').attr('data-price'),
				return_price = (ticket_length * unit_price).toString();

			elm_price.html(formatPrice(return_price) + '&nbsp;<span>vnđ</span>');
		};

		/***
		 * elm: element click
		 * max_rangeNumber: số lượng bóng (45, 55...)
		 * type: create - 1, delete - 0;
		 */

		let handleRandom = function (length, max) {
			let arrNumbers = [];
			// Get được mảng number bao gồm bộ số từ 1 -> tối đa max_rangeNumber
			for (let i = 0; i < max; i++) {
				arrNumbers.push({
					number: i + 1, time: 0
				});
			}

			// Chạy n lần để tìm ra các con số xuất hiện nhiều lần
			for (let i = 0; i < 100000; i++) {
				let number = Math.floor(Math.random() * max) + 1;
				arrNumbers[number - 1].time++;
			}

			// Sắp xếp lại mảng theo thứ tự xuất hiện nhiều lần đến ít
			arrNumbers.sort(function (a, b) {
				return b.time - a.time
			});


			let arrTicket = [];

			// Bỏ vào mảng Ticket số n phần tử (n: loại vé (thường, bao 5,...))
			for (let i = 0; i < length; i++) {
				arrTicket.push(arrNumbers[i].number)
			}

			// Sắp xếp lại mảng theo giá trị số từ nhỏ đến lớn
			arrTicket.sort(function (a, b) {
				return a - b
			});

			return arrTicket;
		}

		let handleRenderRandom = function (elm, max_rangeNumber, isModal = false, type = 1) {
			let elmBox = elm.closest('.random-box'),
				childLength_elmBox = elmBox.find('.random-number');

			if (type === 1) {
				let arrTicket = handleRandom(childLength_elmBox.length, max_rangeNumber);
				// Render ra view

				for (let i = 0; i < childLength_elmBox.length; i++) {
					$(childLength_elmBox[i]).find('.random-number_preview').text(arrTicket[i]);
					$(childLength_elmBox[i]).find('.random-number_value').val(arrTicket[i]);
				}

				if (isModal) {
					$(childLength_elmBox[0]).trigger('click');
				}
			} else {
				if (!isModal) {
					elmBox.find('.random-number_preview').text('');
					elmBox.find('.random-number_value').val('');
				}
			}

			elm.toggleClass('active');
			handlePrice(elm);
		}

		let handleRandomNumber = function (elm, max_rangeNumber) {
			if (elm.length) {
				elm.on('click', '.random-event', function () {
					handleRenderRandom($(this), max_rangeNumber, false, (!$(this).hasClass('active') ? 1 : 0));
				});

				elm.on('click', '.random-event_quick', function () {
					let getRowNoActiveFirst = $(elm.find('.random-event:not(.active)').get(0));
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

		let elmTicketSlider;
		let ticketSlider = function () {
			if ($('#ticket-slider').length > 0) {
				elmTicketSlider = new Swiper('#ticket-slider .swiper', {
					loop: false, simulateTouch: true, speed: 250, spaceBetween: 15,
				});
			}
		}

		let handleCallTicketPopup = function (elm, elmModal) {
			elm.on('click', '.random-number', function () {
				let elm_event = $(this), elm_box = elm_event.closest('.random-box'),
					idx_box = elm_box.attr('data-index'),
					flag_active = false;

				$(elmModal.find('.swiper-slide')[idx_box]).find('.ticket-popup_numbers > span').removeClass('active');

				elm_box.find('.random-number_value').each(function () {
					let val_item = parseInt($(this).val());

					$(elmModal.find('.swiper-slide')[idx_box]).find('.ticket-popup_numbers > span').each(function () {
						let number = parseInt($(this).text());

						if (val_item === number) {
							$(this).addClass('active');
							flag_active = true;
							return false;
						} else {
							flag_active = false
						}
					});
				});

				if (flag_active === true) {
					elmModal.find('.ticket-popup').addClass("is-valid");
					elmModal.find('.ticket-popup').find('.ticket-popup_check').text("Hợp lệ");
				} else {
					elmModal.find('.ticket-popup').removeClass("is-valid");
					elmModal.find('.ticket-popup').find('.ticket-popup_check').text("Không hợp lệ");
				}

				elmTicketSlider.slideTo(idx_box);
				elmModal.modal('show');
			});
		}

		let handleRandomTicketPopup = function () {
			$(document).on('click', '.ticket-random', function () {
				let key = $(this).closest('.ticket-popup').find('.ticket-popup_header > .ticket-popup_seri').text().toLowerCase().trim(),
					frm = $(this).closest('.modal-ticket').attr('data-form'),
					max_rangeNumber = $(this).closest('.modal-ticket').attr('data-ball');

				handleRenderRandom($(frm).find(`.random-box[data-key=${key}]`).find('.random-event'), max_rangeNumber, true);
			});
		}

		let handleClearTicketPopup = function () {
			$(document).on('click', '.ticket-clear', function () {
				let ticket_number = $(this).closest('.ticket-popup_body').find('.ticket-popup_numbers > span');

				if (ticket_number.hasClass('active')) {
					$(this).closest('.modal-ticket').find('.ticket-popup_check').text("Không hợp lệ");
					$(this).closest('.modal-ticket').find('.ticket-popup').removeClass("is-valid");

					ticket_number.removeClass('active');
					let key = $(this).closest('.ticket-popup').find('.ticket-popup_header > .ticket-popup_seri').text().toLowerCase().trim(),
						frm = $(this).closest('.modal-ticket').attr('data-form'),
						max_rangeNumber = $(this).closest('.modal-ticket').attr('data-ball'),
						type = !$(frm).find(`.random-box[data-key=${key}]`).find('.random-event').hasClass('active') ? 1 : 0;

					handleRenderRandom($(frm).find(`.random-box[data-key=${key}]`).find('.random-event'), max_rangeNumber, false, type);
				}
			});
		}

		let handleCloseTicketPopup = function () {
			$(document).on('click', '.ticket-popup_close', function () {
				$(this).closest('.modal-ticket').modal('hide');
			});
		}

		$(function () {
			handleRandomNumber($('#random-type_655'), 55);
			handleCallTicketPopup($('#random-type_655'), $('#modalTicket-655'));

			handleRandomTicketPopup();
			handleClearTicketPopup();
			handleCloseTicketPopup();

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

			ticketSlider();
		});
	}
)
(jQuery);