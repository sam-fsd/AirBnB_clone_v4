$(function () {
	let selectedAmenities = {};
	$("input").change(function () {
		const amenityId = $(this).data("data-id");
		const amenityName = $(this).data("data-name");

		if ($(this).is(":checked")) {
			selectedAmenities[amenityId] = amenityName;
		} else {
			delete selectedAmenities[amenityId];

		}

		const checkedAmenities = Object.values(selectedAmenities).join(', ');
		$(".amenities h4").text(checkedAmenities);
	});
});
