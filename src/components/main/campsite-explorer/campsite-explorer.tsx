import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  LayerGroup,
} from "react-leaflet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Map, List } from "lucide-react";
import "leaflet/dist/leaflet.css";
import campsitesData from "/src/assets/json/NYS_campsite_data.json";

type Campsite = {
  location_name: string;
  site_name: string;
  type: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
};

// Type check the imported data
const campsites: Campsite[] = campsitesData;

export default function CampsiteExplorer() {
  const [isMapView, setIsMapView] = useState(true);
  const [filter, setFilter] = useState("ALL");
  const [filteredCampsites, setFilteredCampsites] = useState(campsites);

  useEffect(() => {
    setFilteredCampsites(
      filter === "ALL"
        ? campsites
        : campsites.filter((campsite) => campsite.type === filter)
    );
  }, [filter]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <Select onValueChange={(value) => setFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Types</SelectItem>
            <SelectItem value="PRIMITIVE CAMPSITE">
              Primitive Campsite
            </SelectItem>
            <SelectItem value="LEAN-TO">Lean-to</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center space-x-2">
          <Switch
            id="view-toggle"
            checked={isMapView}
            onCheckedChange={setIsMapView}
          />
          <Label htmlFor="view-toggle">
            {isMapView ? (
              <Map className="h-4 w-4" />
            ) : (
              <List className="h-4 w-4" />
            )}
          </Label>
        </div>
      </div>

      {isMapView ? (
        <MapContainer
          center={[43.8, -74.5]}
          zoom={7}
          style={{ height: "600px", width: "100%" }}
        >
          <LayersControl position="topright">
            {/* Base layers */}
            <LayersControl.BaseLayer checked name="OpenStreetMap">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                maxZoom={17}
              />
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer name="Satellite">
              <LayerGroup>
                <TileLayer
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                  attribution='&copy; <a href="https://www.esri.com/">Esri</a>, Maxar, Earthstar Geographics'
                  maxZoom={25}
                  minZoom={5}
                />
              </LayerGroup>
            </LayersControl.BaseLayer>

            <LayersControl.BaseLayer name="Satellite with Labels">
              <LayerGroup>
                <TileLayer
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                  attribution='&copy; <a href="https://www.esri.com/">Esri</a>, Maxar, Earthstar Geographics'
                  maxZoom={25}
                  minZoom={5}
                />
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  opacity={0.5}
                  maxZoom={25}
                  minZoom={5}
                />
              </LayerGroup>
            </LayersControl.BaseLayer>
          </LayersControl>
          {filteredCampsites.map((campsite, index) => (
            <Marker
              key={index}
              position={[
                campsite.coordinates.latitude,
                campsite.coordinates.longitude,
              ]}
            >
              <Popup>
                <strong>{campsite.site_name}</strong>
                <br />
                Type: {campsite.type}
                <br />
                Location: {campsite.location_name}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : (
        <div className="grid grid-cols-1 ">
          {filteredCampsites.map((campsite, index) => (
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
          ))}
        </div>
      )}
    </div>
  );
}
