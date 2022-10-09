;(function ($) {
    'use strict';
    let windowWidth = $(window).width();

    let initFromModule1 = function () {
        let elmWrapper = $('#createRow');
        $('#createRow').on('click', '.addRow', function () {
            let theCaoSelect = $(this).closest('.row-item').find('#theCao'),
                theCaoIndexSelected = theCaoSelect.find('option:selected').attr('data-index'),
                theCaoRender = $(this).closest('.row-item').find('#theCao').clone();

            theCaoRender.find('option').attr('selected', false);
            theCaoRender.find('option[data-index=' + theCaoIndexSelected + ']').attr('selected', true);

            let menhGiaSelect = $(this).closest('.row-item').find('#menhGia'),
                menhGiaIndexSelected = menhGiaSelect.find('option:selected').attr('data-index'),
                menhGiaRender = $(this).closest('.row-item').find('#menhGia').clone();

            menhGiaRender.find('option').attr('selected', false);
            menhGiaRender.find('option[data-index=' + menhGiaIndexSelected + ']').attr('selected', true);

            let rowRender = `<div class="row-item row row5 rowmb3">
                            <div class="col-lg-3 col-sm-12 col-12">
							    ${theCaoRender[0].innerHTML}
							 </div>
							<div class="col-lg-3 col-sm-6 col-12">
							    <div class="position-relative form-icon form-icon_right">
								    <input type="text" class="form-control" placeholder="Mã thẻ">
                                    <button type="button" class="copy-value form-button">
                                        <i class="fas fa-paste"></i>
                                    </button>
								</div>
							</div>
							<div class="col-lg-3 col-sm-6 col-12">
							    <div class="position-relative form-icon form-icon_right">
								    <input type="text" class="form-control" placeholder="Mã seri">
                                    <button type="button" class="copy-value form-button">
                                        <i class="fas fa-paste"></i>
                                    </button>
								</div>
							</div>
							<div class="col-lg-2 col-sm-10 col-9">
							    ${menhGiaRender[0].innerHTML}
							</div>
							<div class="col-lg-1 col-sm-2 col-3 text-right">
								<button type="button" class="btn btn-small btn-danger deleteRow">
									<i class="fas fa-trash-alt"></i>
								</button>
							</div>
						</div>`;
            elmWrapper.append(rowRender);
        }).on('click', '.deleteRow', function () {
            $(this).closest('.row-item').remove();
        });
    }

    let initFormFloating = function () {
        if ($('.form-floating').length) {
            $('.form-floating .form-control').blur(function () {
                if ($(this).val() != "") {
                    $(this).addClass("valid");
                } else {
                    $(this).removeClass("valid");
                }
            });
        }
    }

    let initCardCloneTab = function () {
        $('.card-cloneTab[data-toggle=tab]').on('shown.bs.tab', function () {
            $('.card-cloneTab[data-toggle=tab]').removeClass('active');
            $(this).addClass('active');
            $(this).parent().addClass('active');
        });
    }

    /***
     * Xử lý độ rộng menu
     * Add thêm class vào để sắp xếp lại header
     */
    let initReOrderHeader = function () {
        if (windowWidth > 1024) {
            let elmHeader = $('#header-m1'),
                widthContainer = parseInt(elmHeader.children('.container').width()),
                widthNavigation = parseInt(elmHeader.children('.container').children('.header-navigation').width()),
                widthLogo = parseInt(elmHeader.children('.container').children('.header-logo').width()),
                widthUser = parseInt(elmHeader.children('.container').children('.header-user').width()),
                widthRatio = (widthNavigation - widthLogo - widthUser) / widthContainer;
            if (widthRatio > 0.5) {
                elmHeader.addClass('header-sort');
            }
        }
    }

    let initHeaderMobile = function () {
        $('#call-navigation').click(function () {
            $('#header-m1').toggleClass('is-navigation');
        });

        $('#header-m1 .header-navigation .hasSub > .sub-icon').click(function () {
            if ($(this).closest('.hasSub').hasClass('is-show')) {
                $(this).text('+');
                $(this).closest('.hasSub').removeClass('is-show')
            } else {
                $('#header-m1 .header-navigation .hasSub').removeClass('is-show');
                $('#header-m1 .header-navigation .hasSub > .sub-icon').text('+');
                $(this).text('-');
                $(this).closest('.hasSub').addClass('is-show')
            }
        });
        $('#call-userMB').click(function () {
            $('#header-m1').toggleClass('is-usermb')
        });
        $('#header-overlay').click(function () {
            $('#header-m1').removeClass('is-navigation is-usermb');
        })
    }

    let initHeaderScroll = function () {
        if ($('body').height() / $(window).height() > 1.3) {
            $(window).scroll(function () {
                if ($(document).scrollTop() > 0) {
                    $('#header-m1').addClass('is-scroll');
                } else {
                    $('#header-m1').removeClass('is-scroll');
                }
            });
        }
    }

    let initClipboardCopy = function (value) {
        let createTextarea = document.createElement('textarea');
        createTextarea.style.cssText = 'position: absolute; left: -99999px';
        createTextarea.setAttribute("id", "textareaCopy");
        document.body.appendChild(createTextarea);
        let textareaElm = document.getElementById('textareaCopy');
        textareaElm.value = value;
        textareaElm.select();
        textareaElm.setSelectionRange(0, 99999);
        document.execCommand("copy");
        textareaElm.remove();
    }

    let initUpdateInformation = function (form) {
        // form == 0 : form cập nhật thông tin tài khoản
        // form == 1 : form đổi mật khẩu
        $('.information-inner .card .loading-pure').show();
        setTimeout(function () {
            if (form == 0) {
                $('.information-inner .card .card-header .template-1-heading h4').text('Cập nhật thông tin tài khoản');
                $('#informationView').hide();
                $('#informationFrom').show();
            } else if (form == 1) {
                $('.information-inner .card .card-header .template-1-heading h4').text('Đổi mật khẩu');
                $('#informationView').hide();
                $('#passwordFrom').show();
            } else {
                $('.information-inner .card .card-header .template-1-heading h4').text('Thông tin tài khoản');
                $('#informationFrom').hide();
                $('#passwordFrom').hide();
                $('#informationView').show();
            }
            $('.information-inner .card .loading-pure').hide();
        }, 1000);
    }

    let initSlideBanner = function () {
        if ($('#slideBanner').length > 0) {
            new Swiper('#slideBanner', {
                loop: false,
                simulateTouch: false,
                speed: 250,
                navigation: {
                    nextEl: '#slideBanner .slide-button-next',
                    prevEl: '#slideBanner .slide-button-prev',
                },
                autoplay: {
                    delay: 10000,
                    disableOnInteraction: false,
                },
            });
        }

        if ($('#swiper-banner').length > 0) {
            new Swiper('#swiper-banner', {
                loop: false,
                simulateTouch: false,
                speed: 250,
                navigation: {
                    nextEl: '#swiper-banner .swiper-button-next',
                    prevEl: '#swiper-banner .swiper-button-prev',
                },
                autoplay: {
                    delay: 10000,
                    disableOnInteraction: false,
                },
            });
        }
    }

    let initSlideBanner02 = function () {
        if ($('#slideBanner_m2').length > 0) {
            new Swiper('#slideBanner_m2', {
                loop: false,
                simulateTouch: false,
                speed: 250,
                navigation: {
                    nextEl: '#slideBanner_m2 .slide-button-next',
                    prevEl: '#slideBanner_m2 .slide-button-prev',
                },
                autoplay: {
                    delay: 10000,
                    disableOnInteraction: false,
                },
            });
        }
    }

    $(function () {
        initFromModule1();
        initFormFloating();
        initCardCloneTab();
        initReOrderHeader();
        initHeaderMobile();
        initHeaderScroll();
        initSlideBanner();
        initSlideBanner02();
        $(document).on('click', '.copy-value', function () {
            if ($(this).attr('data-value') != undefined) {
                initClipboardCopy($(this).attr('data-value'));
            } else {
                initClipboardCopy($(this).parent().find('input').val());
            }
        });

        $('.updateInformation').click(function () {
            initUpdateInformation($(this).data('form'));
        });

        /****
         * Scripts Vé
         */

            // Địa điểm - Đi & đến
        let dropdownParent = ''
        $('.flight-select').each(function () {
            dropdownParent = $(this).parents('.inner');
            $(this).select2({
                dropdownParent: dropdownParent,
                placeholder: "Chọn địa điểm",
                templateResult: styleSelect,
                width: '100%',
            });
        });

        function styleSelect(attrElm) {
            if (!attrElm.id) {
                return attrElm.text;
            }
            let html = $(`<div class="d-flex align-items-center">
                        <div class="sel-icon">
                            <i class="fal ${attrElm.title.split("|")[3]} mb-0 h6"></i>
                        </div>
                        <div class="sel-content">
                            <div class="sel-title font-weight-bold">${attrElm.title.split("|")[0]}</div>
                            <div class="text-muted sel-subtitle">${attrElm.title.split("|")[1]}</div>
                        </div>
	                    <div class="sel-code text-right">
	                        ${attrElm.title.split("|")[2]}
	                    </div>
                    </div>`);

            return html;
        }

        const altFormat = "d-m-Y";
        /***
         *
         * Chuyến bay
         */
        const departureFlatpickrConfig = {
            defaultDate: [Date.now()],
            mode: "single",
            locale: "vn",
            altInput: true,
            altFormat: altFormat,
            showMonths: 2,
            minDate: "today",
            onOpen: function (selectedDates, dateStr, instance) {
                dateDeparture.set('positionElement', $("#date-departure")[0]);
                dateDeparture.set("mode", "single");
            },
        };
        const returnFlatpickrConfig = {
            defaultDate: [Date.now()],
            mode: "single",
            locale: "vn",
            altInput: true,
            altFormat: altFormat,
            showMonths: 2,
            minDate: "today",
            onOpen: function (selectedDates, dateStr, instance) {
                dateDeparture.set('positionElement', $("#date-return")[0]);
                dateReturn.set("mode", "single");
            },
            onChange: function (selectedDates, dateStr, instance) {
                const [departure_val, return_val] = selectedDates;
                if (return_val) {
                    const checkOutDate = flatpickr.formatDate(return_val, altFormat);
                }
            },
        };

        let dateDeparture = $("#date-departure").flatpickr(departureFlatpickrConfig);

        let htmlRender = '';
        let dateReturn = '';
        $('input[name="choose-flight_chuyenbay"]').change(function (e) {
            if ($('#choose-flight-02:checked').length > 0) {
                htmlRender = `<div class="col-lg col-12" id="col-mark_chuyenbay__return">
							<div class="inner position-relative trigger-flat_chuyenbay row align-items-center no-gutters rowmb5" data-calendar="2">
								<label for="" class="col-form-label col-lg-12 col-5 col-sm-4">Ngày trở về</label>
								<div class="position-relative form-icon form-icon_left col-lg-12 col-7 col-sm-8">
								    <div class="form-button">
									    <i class="fas fa-calendar-alt"></i>
									</div>
									<input type="text" placeholder="Chọn ngày trở về"
									       class="form-control form-date flatpickr flatpickr-input"
									       id="date-return"/>
								</div>
							</div>
						</div>`;

                $('#col-mark_chuyenbay').after(htmlRender);
                dateReturn = $("#date-return").flatpickr(returnFlatpickrConfig);
            } else {
                htmlRender = ``;
                $('#col-mark_chuyenbay__return').remove();
            }
        });

        $(document).on('click', '.trigger-flat_chuyenbay', function () {
            if ($(this).data('calendar') == 1)
                dateDeparture.open();
            else
                dateReturn.open();
        });

        addEventCounterActions(
            ".passenger-event_chuyenbay",
            ".value-count-baby_chuyenbay",
            "#total-people_chuyenbay",
            plusCounterHandle,
            minusCounterHandle
        );

        function checkMaxPeople(
            inputCounterElement,
            count,
            countBaby,
            totalCount,
            maxPeople,
            maxBaby
        ) {
            if (
                (inputCounterElement.hasClass("value-count-baby_chuyenbay") && count >= maxBaby) ||
                (!inputCounterElement.hasClass("value-count-baby_chuyenbay") &&
                    totalCount - countBaby >= maxPeople)
            ) {
                return true;
            }

            return false;
        }

        function plusCounterHandle(
            inputCounterElement,
            htmlCounterElement,
            plusCounterElement,
            minusCounterElement,
            counterBabyElement,
            totalCounterElement
        ) {
            let count = inputCounterElement.val();
            let countBaby = counterBabyElement.val();
            let countText = htmlCounterElement.html();
            let totalCount = totalCounterElement.html();
            totalCount = Number(totalCount);
            count = Number(count);
            countBaby = Number(countBaby);

            if (
                checkMaxPeople(inputCounterElement, count, countBaby, totalCount, 9, 4)
            ) {
                return;
            }

            totalCount += 1;
            count += 1;
            countText = count;

            minusCounterElement.removeClass("disabled");

            inputCounterElement.val(count);
            htmlCounterElement.html(countText);
            totalCounterElement.html(totalCount);

            if (
                checkMaxPeople(inputCounterElement, count, countBaby, totalCount, 9, 4)
            ) {
                plusCounterElement.addClass("disabled");
            }
        }

        function minusCounterHandle(
            inputCounterElement,
            htmlCounterElement,
            plusCounterElement,
            minusCounterElement,
            counterBabyElement,
            totalCounterElement
        ) {
            let count = inputCounterElement.val();
            let countBaby = counterBabyElement.val();
            let countText = htmlCounterElement.html();
            let totalCount = totalCounterElement.html();
            totalCount = Number(totalCount);
            count = Number(count);
            countBaby = Number(countBaby);

            if (count <= 0 || totalCount <= 1) {
                return;
            }

            if (
                checkMaxPeople(inputCounterElement, count, countBaby, totalCount, 9, 4)
            ) {
                plusCounterElement.removeClass("disabled");
            }

            count -= 1;
            countText = count;
            totalCount -= 1;

            inputCounterElement.val(count);
            htmlCounterElement.html(countText);
            totalCounterElement.html(totalCount);

            if (count <= 0) {
                minusCounterElement.addClass("disabled");
            }
        }

        function prepareCounterElements(
            parentCounterElement,
            counterBabyElement,
            totalCounterElement,
            handleCounter
        ) {
            const inputCounterElement = parentCounterElement.find(
                ".value-passenger-counter_chuyenbay"
            );
            const htmlCounterElement = parentCounterElement.find(
                ".passenger-counter_chuyenbay"
            );

            const minusCounterElement = parentCounterElement.find(
                ".passenger-minus_chuyenbay"
            );

            const plusCounterElement = parentCounterElement.find(
                ".passenger-plus_chuyenbay"
            );

            return handleCounter(
                inputCounterElement,
                htmlCounterElement,
                plusCounterElement,
                minusCounterElement,
                counterBabyElement,
                totalCounterElement
            );
        }

        function addEventCounterActions(
            counterClass,
            counterBabyClass,
            totalCounterId,
            plusCounterHandle,
            minusCounterHandle
        ) {
            const totalCounterElement = $(totalCounterId);
            $(counterClass).on("click", ".passenger-plus_chuyenbay", function () {
                const parentCounterElement = $(this).parents(counterClass);
                const counterBabyElement = parentCounterElement
                    .parents(".passenger-dropdown-container")
                    .find(counterBabyClass);
                prepareCounterElements(
                    parentCounterElement,
                    counterBabyElement,
                    totalCounterElement,
                    plusCounterHandle
                );
            });
            $(counterClass).on("click", ".passenger-minus_chuyenbay", function () {
                const parentCounterElement = $(this).parents(counterClass);
                const counterBabyElement = parentCounterElement
                    .parents(".passenger-dropdown-container")
                    .find(counterBabyClass);
                prepareCounterElements(
                    parentCounterElement,
                    counterBabyElement,
                    totalCounterElement,
                    minusCounterHandle
                );
            });
        }

        /***
         * End Chuyến bay
         */

        $(".passenger-dropdown").click(function () {
            $(".passenger-dropdown-content").fadeIn();
        });

        $(".passenger-close").click(function (e) {
            e.stopPropagation();
            $(".passenger-dropdown-content").fadeOut();
        });

        $(document).on("mouseup", function (e) {
            var o = $(".form-choose-people");
            o.is(e.target) || 0 !== o.has(e.target).length || (
                $(".passenger-dropdown .passenger-dropdown-content").fadeOut())
        });

        $('.trigger-select').on("click", function () {
            $(this).find('.box-inner select').select2('open');
        });

        $('.handlePrevent').each(function () {
            $(this).click(function (e) {
                e.preventDefault();
            })
        });
    });
})(jQuery);