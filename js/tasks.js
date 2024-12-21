// タスク管理機能
const Tasks = {
  tasks: [],

  loadTasks() {
    this.tasks = Storage.getTasks();
    this.renderTasks();
  },

  renderTasks() {
    const taskList = document.getElementById('task-list');
    if (!taskList) return;

    const activeList = document.querySelector('.task-buttons button.active')?.dataset.list || 'daily';
    const filteredTasks = this.tasks.filter(task => task.category === activeList);

    taskList.innerHTML = filteredTasks.map(task => `
      <div class="task-item" data-id="${task.id}">
        <input type="checkbox" ${task.completed ? 'checked' : ''}>
        <span>${task.title}</span>
        <span>${task.points}ポイント</span>
      </div>
    `).join('');

    this.attachTaskListeners();
  },

  attachTaskListeners() {
    // タスク完了のトグル
    document.querySelectorAll('.task-item input[type="checkbox"]').forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        const taskId = e.target.closest('.task-item').dataset.id;
        this.toggleTask(taskId);
      });
    });

    // タスクリストの切り替え
    document.querySelectorAll('.task-buttons button').forEach(button => {
      button.addEventListener('click', (e) => {
        document.querySelectorAll('.task-buttons button').forEach(btn => 
          btn.classList.remove('active'));
        e.target.classList.add('active');
        this.renderTasks();
      });
    });
  },

  toggleTask(taskId) {
    const task = this.tasks.find(t => t.id === taskId);
    if (!task) return;

    task.completed = !task.completed;
    if (task.completed) {
      const user = Storage.getUser();
      if (user) {
        user.points += task.points;
        Storage.updatePoints(user.points);
        document.getElementById('points').textContent = user.points;
      }
    }

    Storage.saveTasks(this.tasks);
    this.renderTasks();
  }
};