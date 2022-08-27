;(function ($) {
    'use strict';

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

    $(function () {
        initFromModule1();
        initCardCloneTab();
    });
})(jQuery);