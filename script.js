function countdownTimer() {
    const countdownDiv = document.getElementById('countdownTimer');
    let countdown = 30;
    countdownDiv.textContent = countdown;

    const interval = setInterval(() => {
        countdown--;
        countdownDiv.textContent = countdown;

        if (countdown === 0) {
            countdown = 30;
            updateCryptoTable();
        }
    }, 1000);
}

async function updateCryptoTable() {
    const cryptoData = await getCryptoData();
    const cryptoTableBody = document.getElementById('cryptoTableBody');
    cryptoTableBody.innerHTML = ''; // Clear the table body

    for (let i = 0; i < cryptoData.length; i++) {
        const row = document.createElement('tr');
        const rankCell = document.createElement('td');
        rankCell.textContent = cryptoData[i].rank;
        const nameCell = document.createElement('td');
        nameCell.textContent = cryptoData[i].name;
        const priceCell = document.createElement('td');
        priceCell.textContent = `$${cryptoData[i].price}`;
        const webCell = document.createElement('td');
        const webLink = document.createElement('a');
        webLink.textContent = 'Xem thêm';
        webLink.href = cryptoData[i].website;
        webLink.target = '_blank';
        webCell.appendChild(webLink);

        row.appendChild(rankCell);
        row.appendChild(nameCell);
        row.appendChild(priceCell);
        row.appendChild(webCell);
        cryptoTableBody.appendChild(row);
    }
}

async function getCryptoData() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1');
        const data = await response.json();
        return data.map(item => ({
            rank: item.market_cap_rank,
            name: item.name,
            price: item.current_price,
            website: item.links.homepage[0]
        }));
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
        return [];
    }
}

// Update table and countdown timer every 30 seconds
setInterval(() => {
    updateCryptoTable();
    countdownTimer();
}, 30000);

// Initial update when page loads
updateCryptoTable();
