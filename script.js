async function updateBTCPrice() {
    const btcPrice = await getBTCPrice();
    const currentTime = new Date().toLocaleTimeString();
    document.getElementById('btcPrice').innerText = `$${btcPrice}`;
    document.getElementById('time').innerText = currentTime;
}

async function getBTCPrice() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const data = await response.json();
        const btcPrice = data.bitcoin.usd;
        return btcPrice;
    } catch (error) {
        console.error('Lỗi khi lấy giá BTC:', error);
        return 'Không thể lấy giá.';
    }
}

setInterval(updateBTCPrice, 30000);
