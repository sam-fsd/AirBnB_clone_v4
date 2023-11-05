$(document).ready(function () {
  let selectedAmenities = {};
  $('#amenity').change(function () {
    const amenityId = $(this).data('data-id');
    const amenityName = $(this).data('data-name');

    if ($(this).is(':checked')) {
      selectedAmenities[amenityId] = amenityName;
    } else {
      delete selectedAmenities[amenityId];
    }

    const checkedAmenities = Object.values(selectedAmenities).join(', ');
    $('.amenities h4').text(checkedAmenities);
  });
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status/',
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    },
  });
});
