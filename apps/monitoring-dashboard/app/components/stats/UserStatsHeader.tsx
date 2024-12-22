"use client";

import { Button } from "@/components/ui/button";
import { Users, TrendingUp } from "lucide-react";

export function UserStatsHeader() {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-4xl font-bold text-foreground">Blog Dashboard</h1>
      <div className="flex items-center space-x-4">
        <Button variant="outline">
          <Users className="mr-2 h-4 w-4" />
          Total Users: 1.5K
        </Button>
        <Button variant="outline">
          <TrendingUp className="mr-2 h-4 w-4" />
          Growth: +25%
        </Button>
      </div>
    </div>
  );
}