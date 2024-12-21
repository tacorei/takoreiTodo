export type UserRole = 'student' | 'worker' | 'senior' | 'parent';
export type RelationType = 'friend' | 'parent' | 'child';

export interface User {
  id: string;
  name: string;
  username: string;
  role: UserRole;
  points: number;
  relationships: Relationship[];
  tasks: Task[];
  rewards: Reward[];
}

export interface Relationship {
  userId: string;
  type: RelationType;
  username: string;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  points: number;
  dueDate?: Date;
  category: 'daily' | 'special';
  assignedTo?: string;
  assignedBy?: string;
  location?: {
    latitude: number;
    longitude: number;
    radius: number; // in meters
  };
  checklist?: ChecklistItem[];
  reminderTime?: number; // minutes before dueDate
  completionNote?: string;
  completionQuiz?: Quiz;
}

export interface ChecklistItem {
  id: string;
  title: string;
  completed: boolean;
}

export interface Quiz {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  available: boolean;
  createdBy?: string; // parent's userId
}