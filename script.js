async function updateCryptoTable() {
    const cryptoData = await getCryptoData();
    const currentTime = new Date().toLocaleTimeString();
    const cryptoTable = document.getElementById('cryptoTable');
    cryptoTable.innerHTML = ''; // Clear previous data

    cryptoData.forEach((crypto, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${crypto.name}</td>
            <td>$${crypto.price}</td>
            <td><a href="${crypto.web}" target="_blank">Xem thêm</a></td>
        `;
        cryptoTable.appendChild(row);
    });

    updateClock(currentTime);
}

async function getCryptoData() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,binancecoin,dogecoin,shiba-inu,pepe-token&order=market_cap_desc&per_page=6&page=1');
        const data = await response.json();
        return data.map(crypto => ({
            name: crypto.name,
            price: crypto.current_price,
            web: crypto.links.homepage[0]
        }));
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
        return [];
    }
}

function updateClock(currentTime) {
    const secondHand = document.querySelector('.hand');
    const now = new Date();
    const seconds = now.getSeconds();
    const secondsDegrees = ((seconds / 60) * 360) + 90;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

    document.getElementById('clockTime').innerText = currentTime;
}

setInterval(updateCryptoTable, 30000);
