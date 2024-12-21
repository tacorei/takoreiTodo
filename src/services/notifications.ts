import { Task } from '../types';

export class NotificationService {
  private static instance: NotificationService;
  private permission: NotificationPermission = 'default';

  private constructor() {
    this.requestPermission();
  }

  static getInstance(): NotificationService {
    if (!this.instance) {
      this.instance = new NotificationService();
    }
    return this.instance;
  }

  private async requestPermission(): Promise<void> {
    if ('Notification' in window) {
      this.permission = await Notification.requestPermission();
    }
  }

  async sendTaskReminder(task: Task): Promise<void> {
    if (this.permission === 'granted') {
      const notification = new Notification('Task Reminder', {
        body: `Don't forget to: ${task.title}`,
        icon: '/notification-icon.png',
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };
    }
  }

  async scheduleReminder(task: Task, reminderTime: Date): Promise<void> {
    const now = new Date();
    const timeUntilReminder = reminderTime.getTime() - now.getTime();

    if (timeUntilReminder > 0) {
      setTimeout(() => {
        this.sendTaskReminder(task);
      }, timeUntilReminder);
    }
  }
}