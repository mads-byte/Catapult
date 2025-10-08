// public/stocks.js
(() => {
  const btn = document.getElementById('load-stocks');
  const symbolsInput = document.getElementById('symbols');
  const quotesBody = document.querySelector('#quotes tbody');
  const eodBody = document.querySelector('#eod tbody');
  const errEl = document.getElementById('stocks-error');

  const fmt = (n, d = 2) => (n == null ? '' : Number(n).toFixed(d));

  const renderQuotes = (data) => {
    quotesBody.innerHTML = '';
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
    const raw = (symbolsInput.value || 'AAPL,TSLA,MSFT').trim();
    const symbols = raw.replace(/\s+/g, '').toUpperCase();

    try {
      const [quotesRes, eodRes] = await Promise.all([
        fetch(`/api/stockdata/quotes?symbols=${encodeURIComponent(symbols)}`, { credentials: 'include' }),
        fetch(`/api/marketstack/eod?symbols=${encodeURIComponent(symbols)}&limit=1`, { credentials: 'include' })
      ]);

      const [quotesJson, eodJson] = await Promise.all([quotesRes.json(), eodRes.json()]);

      if (!quotesRes.ok) throw new Error(quotesJson?.error || `Quotes failed (${quotesRes.status})`);
      if (!eodRes.ok) throw new Error(eodJson?.error || `EOD failed (${eodRes.status})`);

      renderQuotes(quotesJson);
      renderEOD(eodJson);
    } catch (err) {
      console.error(err);
      errEl.textContent = err.message || 'Failed to load data';
    }
  };

  btn?.addEventListener('click', loadData);
  if (btn) loadData(); // auto-load on page open
})();
