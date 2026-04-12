// Bu kod cüzdan bağlantısını və balansın avtomatik artmasını təmin edir
let balance = 0;
const balanceElement = document.getElementById('balance');
const connectBtn = document.getElementById('connectBtn');

// 1. Cüzdanı Bağlamaq (Simulyasiya)
connectBtn.addEventListener('click', async () => {
    alert("Trust Wallet-ə bağlanılır...");
    connectBtn.innerText = "Bağlandı: 0x71...4a2";
    connectBtn.classList.remove('bg-yellow-500');
    connectBtn.classList.add('bg-green-500');
    
    // Balansın artmağa başlaması
    startEarning();
});

// 2. Balansın saniyəbəsaniyə artması (Uduzmaq yoxdur!)
function startEarning() {
    setInterval(() => {
        balance += Math.random() * 0.5; // Hər saniyə balans təsadüfi artır
        balanceElement.innerText = balance.toFixed(2);
    }, 2000);
}
