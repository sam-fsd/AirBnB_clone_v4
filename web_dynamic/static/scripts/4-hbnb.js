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
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    data: '{}',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      for (const place of data) {
        $('.places').append(
          `<article>
                <div class="title_box">
                  <h2>${place.name}</h2>
                  <div class="price_by_night">$${place.price_by_night}</div>
                </div>
                <div class="information">
                  <div class="max_guest">${place.max_guest} Guest${
            place.max_guest !== 1 ? 's' : ''
          }</div>
                  <div class="number_rooms">${place.number_rooms} Bedroom${
            place.number_rooms !== 1 ? 's' : ''
          }</div>
                  <div class="number_bathrooms">${
                    place.number_bathrooms
                  } Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                </div>
                <div class="description">
                  ${place.description}
                </div>
              </article>`
        );
      }
    },
  });
  $('button').click(function () {
    $('.places').empty();
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      data: JSON.stringify({ amenities: Object.keys(selectedAmenities) }),
      dataType: 'json',
      contentType: 'application/json',
      success: function (data) {
        for (const place of data) {
          $('.places').append(
            `<article>
                    <div class="title_box">
                      <h2>${place.name}</h2>
                      <div class="price_by_night">$${place.price_by_night}</div>
                    </div>
                    <div class="information">
                      <div class="max_guest">${place.max_guest} Guest${
              place.max_guest !== 1 ? 's' : ''
            }</div>
                      <div class="number_rooms">${place.number_rooms} Bedroom${
              place.number_rooms !== 1 ? 's' : ''
            }</div>
                      <div class="number_bathrooms">${
                        place.number_bathrooms
                      } Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                    </div>
                    <div class="description">
                      ${place.description}
                    </div>
                  </article>`
          );
        }
      },
    });
  });
});
