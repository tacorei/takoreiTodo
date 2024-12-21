// 通知機能を管理
const Notifications = {
  async requestPermission() {
    if (!("Notification" in window)) {
      console.log("このブラウザは通知をサポートしていません");
      return;
    }
    
    const permission = await Notification.requestPermission();
    return permission === "granted";
  },

  async sendReminder(task) {
    if (Notification.permission !== "granted") return;
    
    new Notification("タスクリマインダー", {
      body: `${task.title}の時間です！`,
      icon: "/icon.png"
    });
  },

  scheduleReminder(task) {
    if (!task.reminderTime) return;
    
    const now = new Date();
    const reminderTime = new Date(task.reminderTime);
    const timeUntilReminder = reminderTime.getTime() - now.getTime();
    
    if (timeUntilReminder > 0) {
      setTimeout(() => {
        this.sendReminder(task);
      }, timeUntilReminder);
    }
  }
};