// ローカルストレージの操作を管理
const Storage = {
  get: (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },
  
  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  
  // ユーザーデータの取得
  getUser: () => Storage.get('user'),
  
  // タスクの取得
  getTasks: () => Storage.get('tasks') || [],
  
  // タスクの保存
  saveTasks: (tasks) => Storage.set('tasks', tasks),
  
  // ポイントの更新
  updatePoints: (points) => {
    const user = Storage.getUser();
    if (user) {
      user.points = points;
      Storage.set('user', user);
    }
  }
};