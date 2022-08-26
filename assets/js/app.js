;(function ($) {
	'use strict';

	let initFromModule1 = function () {
		let elmWrapper = $('#from-m1');
		$('#from-m1').on('click', '.addRow', function () {
			let rowRender = `<div class="row-item row custom-row">
							<div class="col-lg-3 col-sm-12 col-12">
								<select name="" class="form-control" id="">
									<option value="">Viettel(85,88)</option>
									<option value="">Vina(88,91)</option>
									<option value="">Mobifone(77,80)</option>
									<option value="">Vietnammobi(85,88)</option>
									<option value="">Zing</option>
									<option value="">GATE</option>
								</select>
							</div>
							<div class="col-lg-3 col-sm-6 col-12">
								<input type="text" class="form-control" placeholder="Mã thẻ">
							</div>
							<div class="col-lg-3 col-sm-6 col-12">
								<input type="text" class="form-control" placeholder="Mã seri">
							</div>
							<div class="col-lg-2 col-sm-10 col-9">
								<select name="" class="form-control" id="">
									<option value="">-- Mệnh giá --</option>
									<option value="">10,000 đ</option>
									<option value="">20,000 đ</option>
									<option value="">30,000 đ</option>
									<option value="">50,000 đ</option>
									<option value="">100,000 đ</option>
									<option value="">200,000 đ</option>
									<option value="">300,000 đ</option>
									<option value="">500,000 đ</option>
									<option value="">1,000,000 đ</option>
								</select>
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

	$(function () {
		initFromModule1();
	});
})(jQuery);