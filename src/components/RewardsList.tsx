import React from 'react';
import { Gift } from 'lucide-react';
import type { Reward } from '../types';

interface RewardsListProps {
  rewards: Reward[];
  userPoints: number;
  onRedeemReward: (rewardId: string) => void;
}

export function RewardsList({ rewards, userPoints, onRedeemReward }: RewardsListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {rewards.map((reward) => (
        <div
          key={reward.id}
          className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">{reward.title}</h3>
            <Gift className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-sm text-gray-600 mb-3">{reward.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-purple-500">
              {reward.pointsCost} pts
            </span>
            <button
              onClick={() => onRedeemReward(reward.id)}
              disabled={userPoints < reward.pointsCost || !reward.available}
              className="px-4 py-2 bg-purple-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-600 transition-colors"
            >
              Redeem
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}