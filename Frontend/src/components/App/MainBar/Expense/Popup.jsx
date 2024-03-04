import PropTypes from 'prop-types';
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Popup as LeafletPopup,
  Marker,
} from 'react-leaflet';

Popup.propTypes = {
  onClose: PropTypes.func,
  setLocation: PropTypes.func,
  location: PropTypes.object,
};

function Popup({ onClose, setLocation, location }) {
  function LocationMarker() {
    useMapEvents({
      click(e) {
        setLocation(e.latlng);
      },
    });

    return location === null ? null : (
      <Marker position={location}>
        <LeafletPopup>Ovo je vaša lokacija.</LeafletPopup>
      </Marker>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold sm:text-lg lg:text-2xl">
            Odaberite lokaciju na mapi
          </h2>

          <button
            className="rounded bg-red-500 p-2 text-white hover:bg-red-700"
            onClick={onClose}
          >
            Zatvori
          </button>
        </div>
        <div className="mt-4 h-[400px]">
          <MapContainer
            className="h-full w-full"
            center={[43.3, 21.9]}
            zoom={11}
            scrollWheelZoom={true}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />

            <LocationMarker />
          </MapContainer>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="my-5 w-full rounded-lg bg-slate-900 p-2
         text-white transition-colors duration-300 hover:bg-slate-600"
        >
          Dodaj lokaciju
        </button>
      </div>
    </div>
  );
}

export default Popup;
