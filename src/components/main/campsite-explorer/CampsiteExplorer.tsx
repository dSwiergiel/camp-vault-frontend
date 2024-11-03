import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  LayerGroup,
  ZoomControl,
} from "react-leaflet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { useMap, useMapEvents } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { useCampsiteContext } from "@/context/CampsiteContext/CampsiteContext";
import CampsiteFilters from "./CampsiteFilters";
import SkeletonCard from "@/components/ui/skeleton-card";

// Set up default icon configuration
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

function LocationMarker() {
  const map = useMap();
  const { setIsUserLocationLoading } = useCampsiteContext();

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.setView([latitude, longitude], 12);
          setIsUserLocationLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsUserLocationLoading(false);
        }
      );
    } else {
      setIsUserLocationLoading(false);
    }
  }, [map]);

  return null;
}

function BoundsTracker({
  onBoundsChange,
}: {
  onBoundsChange: (bounds: L.LatLngBounds) => void;
}) {
  const map = useMapEvents({
    moveend: () => {
      onBoundsChange(map.getBounds());
    },
    zoomend: () => {
      onBoundsChange(map.getBounds());
    },
  });

  return null;
}

function BoundsHandler() {
  const map = useMap();
  const { mapBounds } = useCampsiteContext();

  useEffect(() => {
    if (mapBounds) {
      map.fitBounds(mapBounds);
    }
  }, [mapBounds, map]);

  return null;
}

export default function CampsiteExplorer() {
  const {
    filteredCampsites,
    isMapView,
    setMapBounds,
    isUserLocationLoading,
    isLoading,
  } = useCampsiteContext();

  const handleBoundsChange = (bounds: L.LatLngBounds) => {
    setMapBounds(bounds);
  };

  return (
    <div className="container mx-auto p-4">
      <CampsiteFilters />

      <div className={`${!isMapView && "hidden"} relative`}>
        {isUserLocationLoading && (
          <div className="absolute inset-0 z-10 bg-background">
            <div className="h-full w-full ">
              <Skeleton className="h-full w-full rounded-lg bg-muted" />
            </div>
          </div>
        )}
        <MapContainer
          center={[43.371122, -74.730233]}
          zoom={7}
          className="w-full h-[calc(100vh-14rem)] z-0 rounded-sm"
          zoomControl={false}
          attributionControl={false}
        >
          <LocationMarker />
          <BoundsHandler />
          <BoundsTracker onBoundsChange={handleBoundsChange} />
          <ZoomControl position="bottomright" />
          <LayersControl position="bottomleft">
            {/* Base layers */}
            <LayersControl.BaseLayer checked name="OpenStreetMap">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                maxZoom={25}
              />
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer name="Satellite">
              <LayerGroup>
                <TileLayer
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                  //   attribution='&copy; <a href="https://www.esri.com/">Esri</a>, Maxar, Earthstar Geographics'
                  maxZoom={25}
                  minZoom={5}
                />
              </LayerGroup>
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer name="Satellite with Labels">
              <LayerGroup>
                <TileLayer
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                  //   attribution='&copy; <a href="https://www.esri.com/">Esri</a>, Maxar, Earthstar Geographics'
                  maxZoom={25}
                  minZoom={5}
                />
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  //   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  opacity={0.5}
                  maxZoom={25}
                  minZoom={5}
                />
              </LayerGroup>
            </LayersControl.BaseLayer>
          </LayersControl>
          <MarkerClusterGroup
            chunkedLoading
            maxClusterRadius={50} // Adjust this value to control cluster size
          >
            {filteredCampsites.map((campsite, index) => (
              <Marker
                key={index}
                position={[
                  campsite.coordinates.latitude,
                  campsite.coordinates.longitude,
                ]}
              >
                <Popup>
                  <strong>
                    <a
                      href={`https://www.google.com/maps?q=${campsite.coordinates.latitude},${campsite.coordinates.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {campsite.site_name}
                    </a>
                  </strong>
                  <br />
                  Type: {campsite.type}
                  <br />
                  Location: {campsite.location_name}
                  <br />
                  Coordinates: {campsite.coordinates.latitude.toFixed(4)},{" "}
                  {campsite.coordinates.longitude.toFixed(4)}
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      </div>

      {!isMapView && (
        <div className="grid grid-cols-1">
          {isLoading ? (
            <>
              <SkeletonCard className="mb-4" />
              <SkeletonCard className="mb-4" />
              <SkeletonCard className="mb-4" />
            </>
          ) : (
            filteredCampsites.map((campsite, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{campsite.site_name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex">
                    <div className="w-1/3 mr-4">
                      <div className="bg-gray-200 h-24 w-24 flex items-center justify-center">
                        <span className="text-gray-500">Image</span>
                      </div>
                    </div>
                    <div className="w-2/3">
                      <p>
                        <strong>Type:</strong> {campsite.type}
                      </p>
                      <p>
                        <strong>Location:</strong> {campsite.location_name}
                      </p>
                      <p>
                        <strong>Coordinates:</strong>{" "}
                        {campsite.coordinates.latitude.toFixed(4)},{" "}
                        {campsite.coordinates.longitude.toFixed(4)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
}