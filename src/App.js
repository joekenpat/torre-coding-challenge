import GoogleMapReact from "google-map-react";
import React, { useEffect, useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import MobileAccountList from "./components/MobileAccountList";
import SearchBox from "./components/SearchBox";
import { RiMapPinUserFill } from "react-icons/ri";
import gs from "./css/main.module.css";
import GetUserDetail from "./misc/GetUserDetail";
import ContactCard from "./components/ContactCard";
import { useMediaQuery } from "react-responsive";
// import GeocodeMultipleAddress from "./misc/GeocodeMultipleAddress";

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  return isDesktop ? children : null;
};
const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  return isTablet ? children : null;
};
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};

const handleApiLoaded = (map, maps) => {
  //   // use map and maps objects
};

function App() {
  const [availAccounts, setAvailAccounts] = useState([]);
  const [open, setOpen] = useState(false);
  const [viewableAccount, setViewableAccount] = useState("");
  const [viewableAccountData, setViewableAccountData] = useState({});
  const goBack = () => {
    setViewableAccount("");
    setViewableAccountData({});
  };
  const retrieveAvailAccounts = (accounts) => {
    setAvailAccounts([...accounts]);
    // GeocodeMultipleAddress([...accounts.map((x) => x.location)]);
  };
  const retrieveViewableAccount = (username) => {
    console.log({ viewable: username });
    setViewableAccount(username);
    setViewableAccountData(GetUserDetail(username));
  };
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
      zoom: 4,
    });
  };
  if (window.navigator.geolocation) {
    window.navigator.geolocation.getCurrentPosition(prepareInitPosition);
  }

  // Ensure it animates in when loaded
  useEffect(() => {
    setOpen(true);
  }, []);
  return (
    <div className={`${gs.main_app}`}>
      <Desktop>
        <div className={`${gs.sideBarLeft}`}>
          <div className="p-2">
            <SearchBox
              hidden={viewableAccount !== ""}
              sendAvailAccounts={retrieveAvailAccounts}
            />
            {viewableAccount !== "" && (
              <a href="/#" className="nav-link nav-item" onClick={goBack}>
                Go Back
              </a>
            )}
          </div>
          <MobileAccountList
            hidden={viewableAccount !== ""}
            MobileAccountList
            accounts={availAccounts}
            onItemClick={retrieveViewableAccount}
          />
          <ContactCard
            hidden={viewableAccount === ""}
            fullname={viewableAccountData.name}
            headline={viewableAccountData.headline}
            stats={viewableAccountData.stats}
            links={viewableAccountData.links}
            remoteWorking={viewableAccountData.remoteWorking}
          />
        </div>
        <div className={`${gs.content}`}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
            defaultCenter={initLocation.center}
            defaultZoom={initLocation.zoom}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          >
            <RiMapPinUserFill body lat={43.343} lng={30.337844} size={24} />
          </GoogleMapReact>
        </div>
      </Desktop>
      <Mobile>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
          defaultCenter={initLocation.center}
          defaultZoom={initLocation.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
          <RiMapPinUserFill body lat={43.343} lng={30.337844} size={24} />
        </GoogleMapReact>
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
          header={
            <div>
              <SearchBox
                hidden={viewableAccount !== ""}
                sendAvailAccounts={retrieveAvailAccounts}
              />
              {viewableAccount !== "" && (
                <a href="/#" className="nav-link nav-item" onClick={goBack}>
                  Go Back
                </a>
              )}
            </div>
          }
          blocking={false}
        >
          <MobileAccountList
            hidden={viewableAccount !== ""}
            MobileAccountList
            accounts={availAccounts}
            onItemClick={retrieveViewableAccount}
          />
          <ContactCard
            hidden={viewableAccount === ""}
            fullname={viewableAccountData.name}
            headline={viewableAccountData.headline}
            stats={viewableAccountData.stats}
            links={viewableAccountData.links}
            remoteWorking={viewableAccountData.remoteWorking}
          />
        </BottomSheet>
      </Mobile>
    </div>
  );
}

export default App;
