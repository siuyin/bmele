var sats = document.getElementById("sats");
sats.style.visibility="hidden";
var wwd = new WorldWind.WorldWindow("canvasOne");

wwd.addLayer(new WorldWind.BMNGOneImageLayer());
wwd.addLayer(new WorldWind.BMNGLandsatLayer());

//wwd.addLayer(new WorldWind.CompassLayer());
wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(wwd));
wwd.addLayer(new WorldWind.ViewControlsLayer(wwd));


wwd.goTo(new WorldWind.Position(1.34,103.8,300000.0)); // Singapore at 10,000 km altitude.

// Keep track of the DOM element we'll use to show what's selected.
var pickResult = document.getElementById("pick-result");

// The common pick-handling function.
var handlePick = function(o) {
  // unhide sats panel
  // The input argument is either an Event or a TapRecognizer. Both have the same properties for determining
  // the mouse or tap location.
  var x = o.clientX,
      y = o.clientY;

  // Perform the pick. Must first convert from window coordinates to canvas coordinates, which are
  // relative to the upper left corner of the canvas rather than the upper left corner of the page.
  var pickList = wwd.pick(wwd.canvasCoordinates(x, y));

  // Report the top picked object, if any.
  var topPickedObject = pickList.topPickedObject();
  if (topPickedObject && topPickedObject.isTerrain) {
    //pickResult.textContent = topPickedObject.position;
    o = topPickedObject.position;
    pickResult.textContent = "Latitude: "+o.latitude.toFixed(4)+", Longitude: "+o.longitude.toFixed(4)+", Altitude: "+o.altitude.toFixed(0) +" m";
    sats.style.visibility="visible";

  } else if (topPickedObject) {
    pickResult.textContent = topPickedObject.userObject.displayName;
  } else {
    pickResult.textContent = "Nothing selected, click map to select.";
  }
};

// Listen for mouse moves and touch taps.
//wwd.addEventListener("mousemove", handlePick);
wwd.addEventListener("click", handlePick);
