"use client";

import { UserStatsHeader } from "./components/stats/UserStatsHeader";
import { UserGrowthChart } from "./components/charts/UserGrowthChart";
import { TagManager } from "./components/tags/TagManager";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <UserStatsHeader />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <UserGrowthChart />
          <TagManager />
        </div>
      </div>
    </div>
  );
}