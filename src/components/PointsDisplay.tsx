import React from 'react';
import { Trophy } from 'lucide-react';

interface PointsDisplayProps {
  points: number;
  rank?: number;
}

export function PointsDisplay({ points, rank }: PointsDisplayProps) {
  return (
    <div className="flex items-center space-x-4 bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-lg text-white">
      <Trophy className="w-8 h-8" />
      <div>
        <p className="text-2xl font-bold">{points} Points</p>
        {rank && <p className="text-sm">Rank #{rank}</p>}
      </div>
    </div>
  );
}