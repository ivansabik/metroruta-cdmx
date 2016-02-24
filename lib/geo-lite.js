var geoLite = function(options) {
  options = options || {};

  this.lat = 0;
  this.lon = 0;
  this.timeout = options.timeout || 5000;
  this.wait = options.wait ? 1 : 0;

  if (!this.wait) {
    this.locate();
  }
};

geoLite.prototype.locate = function(successCallback, failCallback) {
  document.body.addEventListener('onLocateSuccess');
  document.body.addEventListener('onLocateFail');
  // Custom events can be accessed within the body
  var _ = this;
  navigator.geolocation.getCurrentPosition(
    function(position) {
      _.lat = position.coords.latitude;
      _.lon = position.coords.longitude;
      document.body.dispatchEvent(new CustomEvent('onLocateSuccess'));
      if (successCallback) {
        successCallback(position.coords);
      }
    },
    function(e) {
      document.body.dispatchEvent(new CustomEvent('onLocateFail', {
        'detail': e.message
      }));
      if (failCallback) {
        console.log(e.message)
        failCallback(e);
      }
    }, {
      timeout: _.timeout
    }
  );
};
