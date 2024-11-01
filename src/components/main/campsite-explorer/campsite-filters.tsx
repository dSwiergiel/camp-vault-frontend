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
import { useCampsiteContext } from "@/context/CampsiteContext";

export default function CampsiteFilters() {
  const { setFilter, isMapView, setIsMapView } = useCampsiteContext();

  return (
    <div className="flex justify-between items-center mb-4">
      <Select onValueChange={(value) => setFilter(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All Types</SelectItem>
          <SelectItem value="PRIMITIVE CAMPSITE">Primitive Campsite</SelectItem>
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
  );
}
