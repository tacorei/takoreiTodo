// リワード管理機能
const Rewards = {
  rewards: [],

  loadRewards() {
    this.rewards = Storage.get('rewards') || [];
    this.renderRewards();
  },

  renderRewards() {
    const rewardsList = document.getElementById('rewards-list');
    if (!rewardsList) return;

    rewardsList.innerHTML = this.rewards.map(reward => `
      <div class="reward-item" data-id="${reward.id}">
        <h3>${reward.title}</h3>
        <p>${reward.description}</p>
        <p>${reward.pointsCost}ポイント</p>
        <button class="redeem-button" ${!reward.available ? 'disabled' : ''}>
          交換する
        </button>
      </div>
    `).join('');

    this.attachRewardListeners();
  },

  attachRewardListeners() {
    document.querySelectorAll('.redeem-button').forEach(button => {
      button.addEventListener('click', (e) => {
        const rewardId = e.target.closest('.reward-item').dataset.id;
        this.redeemReward(rewardId);
      });
    });
  },

  redeemReward(rewardId) {
    const reward = this.rewards.find(r => r.id === rewardId);
    const user = Storage.getUser();
    
    if (!reward || !user || user.points < reward.pointsCost) return;

    user.points -= reward.pointsCost;
    Storage.updatePoints(user.points);
    document.getElementById('points').textContent = user.points;
    
    reward.available = false;
    Storage.set('rewards', this.rewards);
    this.renderRewards();
  }
};