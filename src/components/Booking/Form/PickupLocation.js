import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { Modal, Button } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { useMap } from "react-leaflet/hooks";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
const center = {
  lat: 27.2579,
  lng: 33.8116,
};
function PickupLocation({ show, onHide, setPickupData }) {
  const mapRef = useRef();
  const [selectedLocation, setSelectedLocation] = useState(null);
  //console.log("selectedLocation ", selectedLocation);
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Select Location</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ height: "300px", padding: 0 }}>
        <MapContainer
          center={center}
          zoom={6}
          style={{ height: "100%", width: "100%" }}
          //whenCreated={handleMapLoad}
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <SearchField
            onLocationSelect={(loc) => {
              setSelectedLocation(loc);
              setPickupData(loc);
            }}
            onMarkerDrag={(loc) => {
              setSelectedLocation(loc);
              setPickupData(loc);
            }}
          />
          {/* <DraggableMarker /> */}
          {/* {selectedLocation && (
            <Marker position={[selectedLocation.lat, selectedLocation.lng]} />
          )} */}
        </MapContainer>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PickupLocation;

// function MyComponent() {
//   const map = useMap();
//   const provider = new OpenStreetMapProvider();
//   const searchControl = new GeoSearchControl({
//     provider,
//     style: "bar", // search bar
//     notFoundMessage: "Sorry, that address could not be found.",
//     autoComplete: true,
//     autoCompleteDelay: 0,
//     showMarker: true,
//     showPopup: true,
//     marker: {
//       icon: new L.Icon.Default(),
//       draggable: true,
//     },
//     retainZoomLevel: false,
//   });
//   map.addControl(searchControl);
//   return null;
// }
const SearchField = ({ onLocationSelect, onMarkerDrag }) => {
  //   const provider = new MapBoxProvider({
  //     params: {
  //       access_token: apiKey,
  //     },
  //   });
  const provider = new OpenStreetMapProvider();
  // @ts-ignore
  const searchControl = new GeoSearchControl({
    provider,
    style: "bar", // search bar
    notFoundMessage: "Sorry, that address could not be found.",
    autoComplete: true,
    autoCompleteDelay: 250,
    showMarker: true,
    showPopup: false,
    marker: {
      icon: new L.Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png", // your custom image
        iconSize: [40, 40], // size of the icon
        iconAnchor: [20, 40], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -40], // where the popup should open relative to the iconAnchor
      }),
      draggable: true,
    },
    retainZoomLevel: false,
    searchLabel: "select pickup point",
    updateMap: true,
  });

  const map = useMap();
  useEffect(() => {
    map.addControl(searchControl);
    // listen for result selection
    map.on("geosearch/showlocation", (result) => {
      //console.log("result ", result);
      const { x: lng, y: lat, label } = result.location;
      onLocationSelect({ lat, lng, label });
    });
    // listen for drag end on GeoSearchControl marker
    map.on("geosearch/marker/dragend", async (e) => {
      const { lat, lng } = e.location; // contains new coords
      // optional: reverse geocode
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const data = await res.json();
      // ✅ fill the geosearch input box with the new address
      const newAddress = data?.display_name;
      const input = document.querySelector(".leaflet-control-geosearch input");
      if (input) input.value = newAddress;
      onMarkerDrag({ lat, lng, label: data.display_name });
    });
    return () => map.removeControl(searchControl);
  }, [map]);

  return null;
};

function DraggableMarker() {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(center);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? "Marker is draggable"
            : "Click here to make marker draggable"}
        </span>
      </Popup>
    </Marker>
  );
}
