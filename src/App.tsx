import React, { useState, useEffect } from 'react';
import { Bell, Users, Gift } from 'lucide-react';
import { TaskList } from './components/TaskList';
import { PointsDisplay } from './components/PointsDisplay';
import { RewardsList } from './components/RewardsList';
import type { Task, Reward } from './types';

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Pack school bag', completed: false, points: 10, category: 'daily', dueDate: '2024-12-22', reminderTime: '2024-12-21T08:00:00' },
    { id: '2', title: 'Prepare lunch box', completed: false, points: 15, category: 'daily', dueDate: '2024-12-22', reminderTime: '2024-12-21T08:15:00' },
  ]);
  const [rewards, setRewards] = useState<Reward[]>([
    { id: '1', title: 'Extra Screen Time', description: '30 minutes of screen time', pointsCost: 50, available: true },
  ]);
  const [userPoints, setUserPoints] = useState(100);

  useEffect(() => {
    tasks.forEach(task => {
      if (task.reminderTime) {
        const now = new Date();
        const reminderTime = new Date(task.reminderTime);
        const delay = reminderTime.getTime() - now.getTime();
        if (delay > 0) {
          setTimeout(() => {
            if (Notification.permission === 'granted') {
              new Notification(`Reminder: ${task.title}`);
            }
          }, delay);
        }
      }
    });
  }, [tasks]);

  const handleTaskToggle = (taskId: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);

    const completedTask = updatedTasks.find(task => task.id === taskId && task.completed);
    if (completedTask) {
      setUserPoints(prev => prev + completedTask.points);
    }
  };

  const handleRedeemReward = (rewardId: string) => {
    const reward = rewards.find(r => r.id === rewardId);
    if (reward && userPoints >= reward.pointsCost) {
      setUserPoints(prev => prev - reward.pointsCost);
      setRewards(prev =>
        prev.map(r => (r.id === rewardId ? { ...r, available: false } : r))
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Task Master</h1>
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
