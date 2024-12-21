import React, { useState } from 'react';
import { Bell, Users, Gift } from 'lucide-react';
import { TaskList } from './components/TaskList';
import { PointsDisplay } from './components/PointsDisplay';
import { RewardsList } from './components/RewardsList';
import type { Task, Reward } from './types';

function App() {
  const [tasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Pack school bag',
      completed: false,
      points: 10,
      category: 'daily',
    },
    {
      id: '2',
      title: 'Prepare lunch box',
      completed: false,
      points: 15,
      category: 'daily',
    },
    {
      id: '3',
      title: 'Clean room',
      completed: false,
      points: 20,
      category: 'special',
    },
  ]);

  const [rewards] = useState<Reward[]>([
    {
      id: '1',
      title: 'Extra Screen Time',
      description: '30 minutes of additional screen time',
      pointsCost: 50,
      available: true,
    },
    {
      id: '2',
      title: 'Special Treat',
      description: 'Choose a special snack or treat',
      pointsCost: 75,
      available: true,
    },
  ]);

  const [userPoints] = useState(100);

  const handleTaskToggle = (taskId: string) => {
    // Implementation for task toggle and points management
    console.log('Toggle task:', taskId);
  };

  const handleRedeemReward = (rewardId: string) => {
    // Implementation for reward redemption
    console.log('Redeem reward:', rewardId);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Task Master
          </h1>
          <PointsDisplay points={userPoints} rank={1} />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <section>
              <div className="flex items-center space-x-2 mb-4">
                <Bell className="w-6 h-6 text-blue-500" />
                <h2 className="text-xl font-semibold">Today's Tasks</h2>
              </div>
              <TaskList tasks={tasks} onTaskToggle={handleTaskToggle} />
            </section>

            <section>
              <div className="flex items-center space-x-2 mb-4">
                <Users className="w-6 h-6 text-green-500" />
                <h2 className="text-xl font-semibold">Leaderboard</h2>
              </div>
              {/* Leaderboard implementation */}
            </section>
          </div>

          <div>
            <section>
              <div className="flex items-center space-x-2 mb-4">
                <Gift className="w-6 h-6 text-purple-500" />
                <h2 className="text-xl font-semibold">Rewards</h2>
              </div>
              <RewardsList
                rewards={rewards}
                userPoints={userPoints}
                onRedeemReward={handleRedeemReward}
              />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;