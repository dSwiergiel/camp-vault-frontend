import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import L from "leaflet";
import campsitesData from "/src/assets/json/NYS_campsite_data.json";
import { Campsite } from "../types/campsite";

interface CampsiteContextType {
  filter: string;
  setFilter: (filter: string) => void;
  mapBounds: L.LatLngBounds | null;
  setMapBounds: (bounds: L.LatLngBounds | null) => void;
  filteredCampsites: Campsite[];
  isMapView: boolean;
  setIsMapView: (isMap: boolean) => void;
}

const CampsiteContext = createContext<CampsiteContextType | undefined>(
  undefined
);

export function CampsiteProvider({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState("ALL");
  const [mapBounds, setMapBounds] = useState<L.LatLngBounds | null>(null);
  const [isMapView, setIsMapView] = useState(true);
  const [filteredCampsites, setFilteredCampsites] = useState(campsitesData);

  useEffect(() => {
    let filtered =
      filter === "ALL"
        ? campsitesData
        : campsitesData.filter(
            (campsite: Campsite) => campsite.type === filter
          );

    if (mapBounds) {
      filtered = filtered.filter((campsite: Campsite) => {
        const latLng = L.latLng(
          campsite.coordinates.latitude,
          campsite.coordinates.longitude
        );
        return mapBounds.contains(latLng);
      });
    }

    setFilteredCampsites(filtered);
  }, [filter, mapBounds]);

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
      }}
    >
      {children}
    </CampsiteContext.Provider>
  );
}

export function useCampsiteContext() {
  const context = useContext(CampsiteContext);
  if (context === undefined) {
    throw new Error(
      "useCampsiteContext must be used within a CampsiteProvider"
    );
  }
  return context;
}
