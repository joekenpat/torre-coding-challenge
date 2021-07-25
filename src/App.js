import GoogleMapReact from "google-map-react";
import React, { useEffect, useState } from "react";
import { Card, Container, ListGroup } from "react-bootstrap";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import MobileAccountList from "./components/MobileAccountList";
import SearchBox from "./components/SearchBox";
import gs from "./css/main.module.css";

const handleApiLoaded = (map, maps) => {
  // use map and maps objects
};

function App() {
  const [availAccounts, setAvailAccounts] = useState([]);
  const retrieveAvailAccounts = (accounts) => {
    setAvailAccounts([...accounts]);
  };
  const [open, setOpen] = useState(false);
  const [initLocation, setInitLocation] = useState({
    center: {
      lat: 59.955413,
      lng: 30.337844,
    },
    zoom: 11,
  });
  const prepareInitPosition = (position) => {
    setInitLocation({
      center: {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      },
      zoom: 11,
    });
  };
  if (window.navigator.geolocation) {
    window.navigator.geolocation.getCurrentPosition(prepareInitPosition);
  }

  // Ensure it animates in when loaded
  useEffect(() => {
    setOpen(true);
  }, []);
  // const onDismiss = () => setOpen(false);
  return (
    <div className={`${gs.main_app}`}>
      {/* <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        defaultCenter={initLocation.center}
        defaultZoom={initLocation.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        <Card body lat={59.955413} lng={30.337844} text="My Marker" />
      </GoogleMapReact> */}
      <BottomSheet
        open={open}
        // onDismiss={onDismiss}
        defaultSnap={({ maxHeight }) => maxHeight * 0.4}
        snapPoints={({ maxHeight }) => [
          maxHeight * 0.4,
          maxHeight * 0.6,
          maxHeight * 0.8,
        ]}
        expandOnContentDrag={true}
        header={<SearchBox sendAvailAccounts={retrieveAvailAccounts} />}
        blocking={false}
      >
        <MobileAccountList accounts={availAccounts} />
      </BottomSheet>
    </div>
  );
}

export default App;
