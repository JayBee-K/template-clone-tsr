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
		// Xử lý dropdown chọn loại vé
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

					let elm_frm = elm_event.closest('form'),
						elm_frm_id = elm_frm.attr('id'),
						elm_frm__box = elm_frm.find('.random-box'),
						elm_ball = parseInt(elm_event.attr('data-ball'));
					if (!elm_ball.isNaN) {
						// Reset active bóng trong modal và set số bóng cần phải chọn trong mỗi vé modal
						$(`.modal-ticket[data-form="#${elm_frm_id}"]`).attr('data-length', elm_ball);
						$(`.modal-ticket[data-form="#${elm_frm_id}"]`).find('.ticket-popup_numbers > span').removeClass('active');

						elm_frm__box.map(function () {
							let elm_this = $(this), elm_item__key = elm_this.attr('data-key'),
								elm_item__list = elm_this.find('.random-list'), htmlRender = '';

							elm_this.find('.random-event').removeClass('active');
							for (let i = 0; i < elm_ball; i++) {
								htmlRender += renderHTMLBall(elm_item__key);
							}

							elm_item__list.html(htmlRender);
						});

						elm_frm.find('.unit-price').html(0 + '&nbsp;<span>vnđ</span>');
					} else {
						console.log('Có lỗi xảy ra, vui lòng thử lại!');
					}
				}
			});
		}
	}

	const renderHTMLBall = function (key) {
		// render số bóng được chọn từ loại vé: thường, bao 5, bao 7...
		return `<span class="random-circle random-number">
					<span class="random-number_preview"></span>
					<input type="hidden" class="random-number_value" name="series_${key}[]">
				</span>`
	}

	let dropdownTime = function () {
		// Xử lý dropdown chọn kỳ quay tham gia
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
				handlePrice(elm_event);
			});
		}
	}

	let handleFillTime = function (elm) {
		// Fill vào input kỳ: nối chuỗi id kỳ quay tham gia
		let arrValueTime = [], elm_active = elm.find('.dropdown-list_item.active');
		for (let i = 0; i < elm_active.length; i++) {
			arrValueTime.push($(elm_active[i]).attr('data-time'));
		}

		arrValueTime = arrValueTime.join('-');
		elm.find('.random-time').val(arrValueTime);
	}

	let popupPrice = function (elm) {
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
			handlePrice(elm_event);
		});
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
		// Xử lý và render giá tiền
		let elm_frm = elm.closest('form'), ticket_length = elm_frm.find('.random-event.active').length,
			elm_price = elm_frm.find('.unit-price'),
			elm_input_price = elm_frm.find('input[name="unit-price"]'),
			unit_price = elm_frm.find('.handleDropdownType .dropdown-list_item.active').attr('data-price'),
			number_time = elm_frm.find('.handleDropdownTime .dropdown-list_item.active').length,
			return_price = (ticket_length * unit_price * number_time).toString();

		elm_price.html(formatPrice(return_price) + '&nbsp;<span>vnđ</span>');
		elm_input_price.val(return_price);
	};

	/***
	 * elm: element click
	 * max_rangeNumber: số lượng bóng (45, 55...)
	 * type: create - 1, delete - 0;
	 */

	let arrNumbers = [];
	let handleRandom = function (length, max, start = 1) {
		// Random n số bóng
		let arrNumbers = [];
		// Get được mảng number bao gồm bộ số từ 1 -> tối đa max_rangeNumber
		for (let i = 0; i < parseInt(max); i++) {
			arrNumbers.push({
				number: i + parseInt(start), time: 0
			});
		}

		// Chạy n lần để tìm ra các con số xuất hiện nhiều lần
		for (let i = 0; i < 100000; i++) {
			let number = Math.floor(Math.random() * parseInt(max)) + 1;
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

	let handleRenderRandom = function (elm, max_rangeNumber, isModal = false, start = 1, type = 1) {
		// Render số ra view và fill vào input
		let elmBox = elm.closest('.random-box'),
			elmBox_key = elmBox.attr('data-key'),
			childLength_elmBox = elmBox.find('.random-number');

		if (type === 1) {
			let arrTicket = handleRandom(childLength_elmBox.length, max_rangeNumber, start);
			// Render ra view

			for (let i = 0; i < childLength_elmBox.length; i++) {
				$(childLength_elmBox[i]).find('.random-number_preview').text(arrTicket[i]);
				$(childLength_elmBox[i]).find('.random-number_value').val(arrTicket[i]);
			}

			if (isModal) {
				$(childLength_elmBox[0]).trigger('click');
			}

			arrNumbers[elmBox_key] = arrTicket;
		} else {
			if (!isModal) {
				elmBox.find('.random-number_preview').text('');
				elmBox.find('.random-number_value').val('');
			}

			arrNumbers[elmBox_key] = [];
		}

		elm.toggleClass('active');
		handlePrice(elm);
	}

	let handleRandomNumber = function (elm, max_rangeNumber, start = 1) {
		// Xử lý random khi click vào button chọn của từng dãy
		if (elm.length) {
			elm.on('click', '.random-event', function () {
				handleRenderRandom($(this), max_rangeNumber, false, start, (!$(this).hasClass('active') ? 1 : 0));
			});

			elm.on('click', '.random-event_quick', function () {
				let getRowNoActiveFirst = $(elm.find('.random-event:not(.active)').get(0));
				getRowNoActiveFirst.trigger('click');
			});
		}
	}

	let handleSubmitTicket = function (elm) {
		// Submit form
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
		// Gọi modal Ticket
		elm.on('click', '.random-number', function () {
			let elm_event = $(this),
				elm_box = elm_event.closest('.random-box'),
				idx_box = elm_box.attr('data-index'),
				key_box = elm_box.attr('data-key'),
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
				checkValidPopup(elmModal, key_box, true);
			} else {
				checkValidPopup(elmModal, key_box, false);
			}

			elmTicketSlider.slideTo(idx_box);
			elmModal.modal('show');
		});
	}

	let handleRandomTicketPopup = function () {
		// Random ngẫu nhiên trên modal
		$(document).on('click', '.ticket-random', function () {
			let key = $(this).closest('.ticket-popup').find('.ticket-popup_header > .ticket-popup_seri').text().toLowerCase().trim(),
				frm = $(this).closest('.modal-ticket').attr('data-form'),
				max_rangeNumber = $(this).closest('.modal-ticket').attr('data-ball'),
				start = $(this).closest('.modal-ticket').attr('data-start') ?? 1;

			handleRenderRandom($(frm).find(`.random-box[data-key=${key}]`).find('.random-event'), max_rangeNumber, true, start);
		});
	}

	let handleOnlyBall = function (arrNumbers, key, frm) {
		// X lý các số được chọn và show ra view - fill vào input
		arrNumbers[key].sort(function (a, b) {
			return a - b
		});

		let childLength_elmBox = $(frm).find(`.random-box[data-key="${key}"]`).find('.random-number');

		$(childLength_elmBox).find('.random-number_preview').text('');
		$(childLength_elmBox).find('.random-number_value').val('');

		for (let i = 0; i < arrNumbers[key].length; i++) {
			$(childLength_elmBox[i]).find('.random-number_preview').text(arrNumbers[key][i]);
			$(childLength_elmBox[i]).find('.random-number_value').val(arrNumbers[key][i]);
		}
	}

	let handleChooseNumberTicketPopup = function () {
		// Chọn từng bóng trong modal
		$(document).on('click', '.ticket-choose_number', function () {
			let elm = $(this),
				key = elm.closest('.ticket-popup').find('.ticket-popup_header > .ticket-popup_seri').text().toLowerCase().trim(),
				frm = elm.closest('.modal-ticket').attr('data-form'),
				lengthBall = elm.closest('.modal-ticket').attr('data-length');

			if (!arrNumbers.hasOwnProperty(key)) {
				arrNumbers[key] = [];
			}

			if (!elm.hasClass("active")) {
				if (arrNumbers[key].length < lengthBall) {
					arrNumbers[key].push(parseInt(elm.text()));
					elm.addClass('active');
				} else {
					return false;
				}
			} else {
				arrNumbers[key] = arrNumbers[key].filter(item => item !== parseInt(elm.text()))
				elm.removeClass('active');
			}

			if (arrNumbers[key].length > 0) {
				if (arrNumbers[key].length == lengthBall) {
					checkValidPopup(elm.closest('.modal-ticket'), key, true)
				} else {
					checkValidPopup(elm.closest('.modal-ticket'), key, false)
				}
			} else {
				checkValidPopup(elm.closest('.modal-ticket'), key, false)
			}

			handleOnlyBall(arrNumbers, key, frm);
		});
	}

	let handleClearTicketPopup = function () {
		// Clear bộ số đã chọn trong modal
		$(document).on('click', '.ticket-clear', function () {
			let ticket_key = $(this).closest('.ticket-popup').attr('data-key'),
				ticket_number = $(this).closest('.ticket-popup_body').find('.ticket-popup_numbers > span');

			if (ticket_number.hasClass('active')) {
				checkValidPopup($(this).closest('.modal-ticket'), ticket_key, false);

				ticket_number.removeClass('active');
				let key = $(this).closest('.ticket-popup').find('.ticket-popup_header > .ticket-popup_seri').text().toLowerCase().trim(),
					frm = $(this).closest('.modal-ticket').attr('data-form'),
					max_rangeNumber = $(this).closest('.modal-ticket').attr('data-ball'),
					start = $(this).closest('.modal-ticket').attr('data-start'),
					type = !$(frm).find(`.random-box[data-key=${key}]`).find('.random-event').hasClass('active') ? 1 : 0;

				handleRenderRandom($(frm).find(`.random-box[data-key=${key}]`).find('.random-event'), max_rangeNumber, false, start, type);
			}
		});
	}

	let checkValidPopup = function (elm, key = '', isValid = true) {
		let ticketPopup = elm.find(`.ticket-popup[data-key="${key}"]`);
		// Kiểm tra hợp lệ của modal
		if (isValid === true) {
			ticketPopup.addClass("is-valid");
			ticketPopup.find('.ticket-popup_check').text("Hợp lệ");
		} else {
			ticketPopup.removeClass("is-valid");
			ticketPopup.find('.ticket-popup_check').text("Không hợp lệ");
		}
	}

	$(function () {
		// Vietlott 6-55
		handleRandomNumber($('#random-type_655'), 55);
		handleCallTicketPopup($('#random-type_655'), $('#modalTicket-655'));
		handleSubmitTicket($('#random-type_655'));

		// Vietlott 6-45
		handleRandomNumber($('#random-type_645'), 45);
		handleCallTicketPopup($('#random-type_645'), $('#modalTicket-645'));
		handleSubmitTicket($('#random-type_645'));

		// Vietlott 3D Max
		handleRandomNumber($('#random-type_3dmax'), 10, 0);
		handleCallTicketPopup($('#random-type_3dmax'), $('#modalTicket-3dmax'));
		handleSubmitTicket($('#random-type_3dmax'));

		// Dùng chung
		handleRandomTicketPopup();
		handleChooseNumberTicketPopup();
		handleClearTicketPopup();


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
		popupPrice();

		ticketSlider();

		$('#modalTicket-price').modal('show');
	});
})(jQuery);