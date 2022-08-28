;(function ($) {
    'use strict';
    let windowWidth = $(window).width();


    let initFromModule1 = function () {
        let elmWrapper = $('#from-m1');
        $('#from-m1').on('click', '.addRow', function () {
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
								<input type="text" class="form-control" placeholder="Mã thẻ">
							</div>
							<div class="col-lg-3 col-sm-6 col-12">
								<input type="text" class="form-control" placeholder="Mã seri">
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

    $(function () {
        initFromModule1();
        initCardCloneTab();
        initReOrderHeader();
        initHeaderMobile();
    });
})(jQuery);