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
import { useCampsiteContext } from "@/context/CampsiteContext/CampsiteContext";
import { Input } from "@/components/ui/input";

export default function CampsiteFilters() {
  const { setFilter, isMapView, setIsMapView, searchTerm, setSearchTerm } =
    useCampsiteContext();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="flex items-center mb-4">
      <div className="relative mr-4">
        <Input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search ..."
          className=" border rounded-lg px-2 py-1"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm("")}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        )}
      </div>
      <Select onValueChange={(value) => setFilter(value)}>
        <SelectTrigger className="w-[180px] mr-4">
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All Types</SelectItem>
          <SelectItem value="PRIMITIVE CAMPSITE">Primitive Campsite</SelectItem>
          <SelectItem value="LEAN-TO">Lean-to</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex items-center space-x-2 ml-auto">
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
