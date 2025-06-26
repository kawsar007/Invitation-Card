import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FilterState } from '@/types/event';
import { Filter, Search } from "lucide-react";
import React from 'react';

interface EventFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  loading: boolean;
}

export const EventFilters: React.FC<EventFiltersProps> = ({
  filters,
  onFiltersChange,
  onResetFilters,
  loading
}) => {
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onFiltersChange({ page: 1 });
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Search & Filters
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search events..."
                value={filters.searchQuery}
                onChange={(e) => onFiltersChange({ searchQuery: e.target.value })}
                className="pl-10"
              />
            </div>
            <Button type="submit" disabled={loading}>
              Search
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={filters.startDate}
                onChange={(e) => onFiltersChange({ startDate: e.target.value, page: 1 })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={filters.endDate}
                onChange={(e) => onFiltersChange({ endDate: e.target.value, page: 1 })}
              />
            </div>

            <div className="space-y-2">
              <Label>Location Type</Label>
              <Select
                value={filters.locationType || "all"}
                onValueChange={(value) => onFiltersChange({
                  locationType: value === "all" ? "" : value,
                  page: 1
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All locations</SelectItem>
                  <SelectItem value="virtual">Virtual</SelectItem>
                  <SelectItem value="physical">Physical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Items per page</Label>
              <Select
                value={filters.limit.toString()}
                onValueChange={(value) => onFiltersChange({
                  limit: parseInt(value, 10),
                  page: 1
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="button" variant="outline" onClick={onResetFilters}>
              Reset Filters
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};