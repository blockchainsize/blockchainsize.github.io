$(function () {
  function tick() {
    $.ajax({
      url: "https://api.blockchain.info/charts/blocks-size?timespan=1year&sampled=true&metadata=false&cors=true&format=json",
      success: parseResponse
    });
  }

  function parseResponse(data) {
    if (data.status !== "ok") {
      error();
      return;
    }

    var biggest = 0;

    $.each(data.values, function (i, sample) {
      biggest = Math.max(sample.y);
    });

    var biggest = findMax(data.values);
    $('.blockchainsize').html(formatSize(biggest));
  }

  function findMax(series) {
    var biggest = 0;
    $.each(series, function (i, sample) { biggest = Math.max(biggest, sample.y); });
    return biggest;
  }

  function formatSize(mb) {
    var gb = Number(mb) / 1000.0;
    var base = gb | 0;
    var decimals = String(Number(gb).toFixed(2) - base).substring(1, 4);
    return [
      $('<span>').text(base),
      $('<span class="blockchainsize-decimal">').text(decimals),
      $('<span class="blockchainsize-unit">').text("GB")
    ];
    //return String(Number(gb).toFixed(2)) + "<span class='blockchainsize-unit'>GB</span>";
  }

  function error() {
    $('.blockchainsize').text(":(");
  }

  tick();
});
