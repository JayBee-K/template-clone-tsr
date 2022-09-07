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

            let rowRender = `<div class="row-item row row5">
                            <div class="col-lg-3 col-sm-12 col-12">
							    ${theCaoRender[0].innerHTML}
							 </div>
							<div class="col-lg-3 col-sm-6 col-12">
							    <div class="position-relative form-icon">
								    <input type="text" class="form-control" placeholder="Mã thẻ">
                                    <button type="button" class="copy-value form-button">
                                        <i class="fas fa-paste"></i>
                                    </button>
								</div>
							</div>
							<div class="col-lg-3 col-sm-6 col-12">
							    <div class="position-relative form-icon">
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
        if (windowWidth > 991) {
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
        if ($('body').height() / $(window).height() > 1.2) {
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

    $(function () {
        initFromModule1();
        initFormFloating();
        initCardCloneTab();
        initReOrderHeader();
        initHeaderMobile();
        initHeaderScroll();
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
    });
})(jQuery);