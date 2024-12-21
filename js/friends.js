// 友達管理機能
const Friends = {
  friends: [],

  loadFriends() {
    this.friends = Storage.get('friends') || [];
    this.renderFriends();
  },

  renderFriends() {
    const friendsList = document.getElementById('friends-list');
    if (!friendsList) return;

    friendsList.innerHTML = this.friends.map(friend => `
      <div class="friend-item" data-id="${friend.id}">
        <h3>${friend.name}</h3>
        <p>${friend.points}ポイント</p>
        <span class="friend-type">${friend.type || '友達'}</span>
      </div>
    `).join('');

    this.attachFriendListeners();
  },

  attachFriendListeners() {
    document.getElementById('add-friend')?.addEventListener('click', () => {
      modal.show(`
        <h2>友達を追加</h2>
        <form id="add-friend-form">
          <input type="text" placeholder="ユーザー名を入力" required>
          <select>
            <option value="friend">友達</option>
            <option value="parent">親</option>
            <option value="child">子</option>
          </select>
          <button type="submit">追加</button>
        </form>
      `);

      document.getElementById('add-friend-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        // 友達追加のロジックを実装
        modal.hide();
      });
    });
  }
};