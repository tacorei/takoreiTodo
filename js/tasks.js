// タスク管理機能
const Tasks = {
  tasks: [],

  loadTasks() {
    this.tasks = Storage.getTasks();
    this.renderTasks();
    this.attachAddTaskListener();
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
        <span>${task.startTime ? `開始: ${task.startTime}` : ''}</span>
        <span>${task.points}ポイント</span>
      </div>
    `).join('');

    this.attachTaskListeners();
  },

  attachAddTaskListener() {
    document.getElementById('add-task')?.addEventListener('click', () => {
      const activeList = document.querySelector('.task-buttons button.active')?.dataset.list || 'daily';
      modal.show(`
        <h2>新しいタスク</h2>
        <form id="add-task-form" class="task-form">
          <div class="form-group">
            <label for="task-title">タスク名</label>
            <input type="text" id="task-title" required>
          </div>
          <div class="form-group">
            <label for="task-start">開始時間</label>
            <input type="time" id="task-start">
          </div>
          <div class="form-group">
            <label for="task-points">ポイント</label>
            <input type="number" id="task-points" value="10" min="0" required>
          </div>
          <input type="hidden" id="task-category" value="${activeList}">
          <button type="submit" class="submit-button">追加</button>
        </form>
      `);

      document.getElementById('add-task-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const form = e.target;
        const newTask = {
          id: Date.now().toString(),
          title: form.querySelector('#task-title').value,
          startTime: form.querySelector('#task-start').value,
          points: parseInt(form.querySelector('#task-points').value),
          category: form.querySelector('#task-category').value,
          completed: false
        };

        this.tasks.push(newTask);
        Storage.saveTasks(this.tasks);
        this.renderTasks();
        modal.hide();
      });
    });
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