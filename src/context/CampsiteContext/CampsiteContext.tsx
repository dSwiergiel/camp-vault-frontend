import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import L from "leaflet";
import campsitesData from "/src/assets/json/NYS_campsite_data.json";
import { Campsite } from "../../types/campsite";

interface CampsiteContextType {
  filter: string;
  setFilter: (filter: string) => void;
  mapBounds: L.LatLngBounds | null;
  setMapBounds: (bounds: L.LatLngBounds | null) => void;
  filteredCampsites: Campsite[];
  isMapView: boolean;
  setIsMapView: (isMap: boolean) => void;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  isUserLocationLoading: boolean;
  setIsUserLocationLoading: (isUserLocationLoading: boolean) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const CampsiteContext = createContext<CampsiteContextType | undefined>(
  undefined
);

function CampsiteProvider({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState("ALL");
  const [isUserLocationLoading, setIsUserLocationLoading] = useState(true);
  const [mapBounds, setMapBounds] = useState<L.LatLngBounds | null>(null);
  const [isMapView, setIsMapView] = useState(true);
  const [filteredCampsites, setFilteredCampsites] = useState(campsitesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true); // will be for when we fetch data from the API

  useEffect(() => {
    let filtered =
      filter === "ALL"
        ? campsitesData
        : campsitesData.filter(
            (campsite: Campsite) => campsite.type === filter
          );

    filtered = filtered.filter(
      (campsite: Campsite) =>
        campsite.site_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campsite.location_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (mapBounds) {
      const inBoundsCampsites = filtered.filter((campsite: Campsite) => {
        const latLng = L.latLng(
          campsite.coordinates.latitude,
          campsite.coordinates.longitude
        );
        return mapBounds.contains(latLng);
      });

      if (
        inBoundsCampsites.length === 0 &&
        filtered.length > 0 &&
        (filter !== "ALL" || searchTerm !== "")
      ) {
        const centerPoint = mapBounds.getCenter();
        let closestCampsite = filtered[0];
        let minDistance = Number.MAX_VALUE;

        filtered.forEach((campsite: Campsite) => {
          const campsitePoint = L.latLng(
            campsite.coordinates.latitude,
            campsite.coordinates.longitude
          );
          const distance = centerPoint.distanceTo(campsitePoint);

          if (distance < minDistance) {
            minDistance = distance;
            closestCampsite = campsite;
          }
        });

        const newBounds = L.latLngBounds(
          L.latLng(
            closestCampsite.coordinates.latitude - 0.1,
            closestCampsite.coordinates.longitude - 0.1
          ),
          L.latLng(
            closestCampsite.coordinates.latitude + 0.1,
            closestCampsite.coordinates.longitude + 0.1
          )
        );
        setMapBounds(newBounds);
      }

      setFilteredCampsites(inBoundsCampsites);
    } else {
      setFilteredCampsites(filtered);
    }
  }, [filter, mapBounds, searchTerm]);

  return (
    <CampsiteContext.Provider
      value={{
        filter,
        setFilter,
        mapBounds,
        setMapBounds,
        filteredCampsites,
        isMapView,
        setIsMapView,
        searchTerm,
        setSearchTerm,
        isUserLocationLoading,
        setIsUserLocationLoading,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </CampsiteContext.Provider>
  );
}

const useCampsiteContext = () => {
  const context = useContext(CampsiteContext);
  if (context === undefined) {
    throw new Error(
      "useCampsiteContext must be used within a CampsiteProvider"
    );
  }
  return context;
};

export { CampsiteProvider, useCampsiteContext };
