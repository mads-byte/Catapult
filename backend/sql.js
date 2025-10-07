const marketStackURL = `https://api.marketstack.com/v2/eod?access_key=${MS_API_KEY}&symbols=AAPL`
const stockDataURL = `https://api.stockdata.org/v1/data/quote?symbols=AAPL,TSLA,MSFT&api_token=${SD_API_KEY}`

  // public render
  (() => {
    const btn = document.getElementById('load-stocks');
    const symbolsInput = document.getElementById('symbols');
    const quotesBody = document.querySelector('#quotes tbody');
    const eodBody = document.querySelector('#eod tbody');
    const errEl = document.getElementById('stocks-error');

    const fmt = (n, d = 2) => (n == null ? '' : Number(n).toFixed(d));

    const renderQuotes = (data) => {
      quotesBody.innerHTML = '';
      // stockdata return 
      const rows = data?.data || [];
      rows.forEach((q) => {
        const tr = document.createElement('tr');
        const pct = q.percent_change ?? (q.change && q.price ? (q.change / (q.price - q.change)) * 100 : null);
        tr.innerHTML = `
        <td>${q.symbol || ''}</td>
        <td>${fmt(q.price)}</td>
        <td>${fmt(q.change)}</td>
        <td>${pct == null ? '' : fmt(pct)}</td>
        <td>${q.timestamp ? new Date(q.timestamp * 1000).toLocaleString() : ''}</td>
      `;
        quotesBody.appendChild(tr);
      });
    };

    const renderEOD = (data) => {
      eodBody.innerHTML = '';
      // marketstack return
      const rows = data?.data || [];
      rows.forEach((e) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td>${e.symbol || ''}</td>
        <td>${fmt(e.close)}</td>
        <td>${fmt(e.high)}</td>
        <td>${fmt(e.low)}</td>
        <td>${e.date ? new Date(e.date).toLocaleDateString() : ''}</td>
      `;
        eodBody.appendChild(tr);
      });
    };

    const loadData = async () => {
      errEl.textContent = '';
      const symbols = symbolsInput.value.trim().replace(/\s+/g, '');

      try {
        // Parallel fetch both APIs
        const [quotesRes, eodRes] = await Promise.all([
          fetch(`/api/stockdata/quotes?symbols=${encodeURIComponent(symbols)}`),
          fetch(`/api/marketstack/eod?symbols=${encodeURIComponent(symbols)}&limit=1`)
        ]);

        const [quotesJson, eodJson] = await Promise.all([quotesRes.json(), eodRes.json()]);

        if (!quotesRes.ok) throw new Error(quotesJson?.error || 'Quotes failed');
        if (!eodRes.ok) throw new Error(eodJson?.error || 'EOD failed');

        renderQuotes(quotesJson);
        renderEOD(eodJson);
      } catch (err) {
        console.error(err);
        errEl.textContent = err.message;
      }
    };

    btn?.addEventListener('click', loadData);
    // auto-load on page open
    if (btn) loadData();
  })();
