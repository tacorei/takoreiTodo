// メインアプリケーションの初期化と制御
document.addEventListener('DOMContentLoaded', () => {
  // タブ切り替え
  const tabs = document.querySelectorAll('nav button');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      
      // アクティブなタブを更新
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // コンテンツを切り替え
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });
      document.getElementById(target).classList.add('active');
    });
  });

  // 通知の許可を要求
  Notifications.requestPermission();

  // 初期データの読み込み
  Tasks.loadTasks();
  Rewards.loadRewards();
  Friends.loadFriends();

  // ポイント表示の更新
  const user = Storage.getUser();
  if (user) {
    document.getElementById('points').textContent = user.points;
  }
});

// モーダル制御
const modal = {
  show: (content) => {
    const modalElement = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = content;
    modalElement.style.display = 'block';
  },
  
  hide: () => {
    document.getElementById('modal').style.display = 'none';
  }
};

// モーダルを閉じるボタン
document.querySelector('.close').addEventListener('click', modal.hide);