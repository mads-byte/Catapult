// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// tracks lessons completed
let lessonsCompleted = ['incomplete', 'incomplete', 'incomplete', 'incomplete', 'incomplete', 'incomplete'];

// load progress
async function loadProgress() {
    try {
        const res = await fetch('/api/progress', { credentials: 'include' });
        const data = await res.json();
        if (Array.isArray(data.lessons)) {
            lessonsCompleted = data.lessons.slice();
            applyProgressToUI();          // 👈 paint UI after loading
            console.log('Loaded progress:', lessonsCompleted);
        }
    } catch (e) { console.warn('progress load failed', e); }
}

async function saveProgress() {
    try {
        await fetch('/api/progress', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ lessons: lessonsCompleted })
        });
        console.log('Progress saved');
    } catch (e) { console.warn('progress save failed', e); }
}

// 
function applyProgressToUI() {
    // assumes you have IDs lesson-header1 .. lesson-header6
    for (let i = 0; i < 6; i++) {
        const header = document.getElementById(`lesson-header${i + 1}`);
        if (!header) continue;
        header.style.color = (lessonsCompleted[i] === 'complete') ? 'gray' : '';
    }
}

// loadProgress on every page
document.addEventListener('DOMContentLoaded', loadProgress);


// The following is the script for Lesson 1: Smart Spending Habits
const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')
const overlay = document.querySelector('.container .overlay');
//javascript for overlay in smart spending habits 
overlay.addEventListener('click', () => {
    overlay.classList.add('hidden');
    sessionStorage.setItem('lesson1', 'complete')
});
//javascript for smart spending habits scenario game
let state = {}
function startGame() {
    state = { money: 300, savings: 0 }
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        const button = document.createElement('button')
        button.innerText = option.text
        button.classList.add('btn')
        button.addEventListener('click', () => selectOption(option))
        optionButtonsElement.appendChild(button)
    })
}

function selectOption(option) {
    // Handle setState
    let newState = {}
    if (typeof option.setState === 'function') {
        newState = option.setState(state) || {}
    } else if (typeof option.setState === 'object') {
        newState = option.setState || {}
    }
    state = { ...state, ...newState }

    // Handle nextText
    let nextTextNodeId
    if (typeof option.nextText === 'function') {
        nextTextNodeId = option.nextText(state)
    } else {
        nextTextNodeId = option.nextText
    }

    if (nextTextNodeId <= 0) {
        return startGame()
    }

    showTextNode(nextTextNodeId)
}


const textNodes = [
    {
        id: 1,
        text: 'You just got your first paycheck of $300. What do you want to do first?',
        options: [
            {
                text: 'Save $150 and keep $150 for spending',
                setState: () => ({ money: 150, savings: 150 }),
                nextText: 2
            },
            {
                text: 'Spend it all on clothes and shoes ($300)',
                setState: () => ({ money: 0, clothes: true }),
                nextText: (state) => state.money <= 0 ? 99 : 2
            },
            {
                text: 'Put it all into savings',
                setState: () => ({ money: 0, savings: 300 }),
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: 'Your friends invite you to a concert. Tickets cost $60.',
        options: [
            {
                text: 'Buy the ticket and go',
                setState: (state) => ({ money: state.money - 60, concert: true }),
                nextText: (state) => state.money < 60 ? 99 : 3
            },
            {
                text: 'Skip the concert and save your money',
                nextText: 3
            }
        ]
    },
    {
        id: 3,
        text: 'Your phone breaks and a repair costs $100.',
        options: [
            {
                text: 'Pay for the repair',
                setState: (state) => ({ money: state.money - 100, phone: true }),
                nextText: (state) => state.money < 100 ? 99 : 4
            },
            {
                text: 'Wait and use a family computer instead',
                nextText: 4
            }
        ]
    },
    {
        id: 4,
        text: 'You see a new video game release for $70 that you really want.',
        options: [
            {
                text: 'Buy the game',
                setState: (state) => ({ money: state.money - 70, game: true }),
                nextText: (state) => state.money < 70 ? 99 : 5
            },
            {
                text: 'Hold off and save your money',
                nextText: 5
            }
        ]
    },
    {
        id: 5,
        text: 'A surprise family birthday party comes up, and a nice gift costs $40.',
        options: [
            {
                text: 'Buy the gift',
                setState: (state) => ({ money: state.money - 40, gift: true }),
                nextText: (state) => state.money < 40 ? 99 : 6
            },
            {
                text: 'Make a handmade card instead',
                nextText: 6
            }
        ]
    },
    {
        id: 6,
        text: 'Your friends want to order pizza and soda for $25 each.',
        options: [
            {
                text: 'Chip in $25 and enjoy',
                setState: (state) => ({ money: state.money - 25, pizza: true }),
                nextText: (state) => state.money < 25 ? 99 : 7
            },
            {
                text: 'Skip and eat leftovers',
                nextText: 7
            }
        ]
    },
    {
        id: 7,
        text: 'You need gas money to get to school. Filling up costs $50.',
        options: [
            {
                text: 'Fill the tank',
                setState: (state) => ({ money: state.money - 50, gas: true }),
                nextText: (state) => state.money < 50 ? 99 : 8
            },
            {
                text: 'Bike or walk instead',
                nextText: 8
            }
        ]
    },
    {
        id: 8,
        text: 'A big sale is happening: new sneakers you’ve wanted for $120.',
        options: [
            {
                text: 'Buy the sneakers',
                setState: (state) => ({ money: state.money - 120, sneakers: true }),
                nextText: (state) => state.money < 120 ? 99 : 9
            },
            {
                text: 'Pass and save the money',
                nextText: 9
            }
        ]
    },
    {
        id: 9,
        text: 'Your favorite streaming service just raised its subscription to $15.',
        options: [
            {
                text: 'Subscribe for $15',
                setState: (state) => ({ money: state.money - 15, streaming: true }),
                nextText: (state) => state.money < 15 ? 99 : 10
            },
            {
                text: 'Cancel it and use free alternatives',
                nextText: 10
            }
        ]
    },
    {
        id: 10,
        text: 'A new jacket for winter costs $80.',
        options: [
            {
                text: 'Buy the jacket',
                setState: (state) => ({ money: state.money - 80, jacket: true }),
                nextText: (state) => state.money < 80 ? 99 : 11
            },
            {
                text: 'Use your old jacket another year',
                nextText: 11
            }
        ]
    },
    {
        id: 11,
        text: 'Your car needs an oil change ($40).',
        options: [
            {
                text: 'Pay for the oil change',
                setState: (state) => ({ money: state.money - 40, car: true }),
                nextText: (state) => state.money < 40 ? 99 : 12
            },
            {
                text: 'Ignore it for now',
                nextText: 12
            }
        ]
    },
    {
        id: 12,
        text: 'Your best friend wants to split concert merch for $30.',
        options: [
            {
                text: 'Buy the merch',
                setState: (state) => ({ money: state.money - 30, merch: true }),
                nextText: (state) => state.money < 30 ? 99 : 13
            },
            {
                text: 'Say no and keep saving',
                nextText: 13
            }
        ]
    },
    {
        id: 13,
        text: 'Your cousin asks for help buying school supplies ($20).',
        options: [
            {
                text: 'Give them $20',
                setState: (state) => ({ money: state.money - 20, generous: true }),
                nextText: (state) => state.money < 20 ? 99 : 14
            },
            {
                text: 'Apologize and say you can’t',
                nextText: 14
            }
        ]
    },
    {
        id: 14,
        text: 'You’re tempted by fast food runs this week ($10).',
        options: [
            {
                text: 'Spend $10 on fast food',
                setState: (state) => ({ money: state.money - 10, fastfood: true }),
                nextText: (state) => state.money < 10 ? 99 : 15
            },
            {
                text: 'Skip and eat at home',
                nextText: 15
            }
        ]
    },
    {
        id: 15,
        text: 'At the end of the month, your parent says they’ll match whatever you saved.',
        options: [
            {
                text: 'Check your savings balance',
                nextText: 16
            }
        ]
    },
    {
        id: 16,
        text: 'Final results:',
        options: [
            {
                text: 'If you spent everything, you saved $0. No bonus. Restart?',
                requiredState: (state) => state.savings === 0,
                nextText: -1
            },
            {
                text: 'If you saved some, your savings are doubled! Smart choice!',
                requiredState: (state) => state.savings > 0 && state.savings < 300,
                nextText: -1
            },
            {
                text: 'If you saved it all, you now have $600 with the bonus! Amazing job!',
                requiredState: (state) => state.savings === 300,
                nextText: -1
            }
        ]
    },
    {
        id: 99,
        text: 'You ran out of money and can’t continue. Restart?',
        options: [
            { text: 'Restart', nextText: -1 }
        ]
    }
]

startGame()
document.addEventListener('DOMContentLoaded', loadProgress);




// The following is the script for Lesson 2: Taxes
const submit = document.getElementById('submit')
const taxQuiz = document.getElementById('tax-quiz')
const testResult = document.getElementById('result')

const lessonDiv1 = document.getElementById('lesson-div1')
const arrow1 = document.getElementById('arrow1')
const contentHide1 = document.getElementById('content-hide1')

const lessonDiv2 = document.getElementById('lesson-div2')
const arrow2 = document.getElementById('arrow2')
const contentHide2 = document.getElementById('content-hide2')


const lessonDiv3 = document.getElementById('lesson-div3')
const arrow3 = document.getElementById('arrow3')
const contentHide3 = document.getElementById('content-hide3')

const lessonDiv4 = document.getElementById('lesson-div4')
const arrow4 = document.getElementById('arrow4')
const contentHide4 = document.getElementById('content-hide4')

const lessonDiv5 = document.getElementById('lesson-div5')
const arrow5 = document.getElementById('arrow5')
const contentHide5 = document.getElementById('content-hide5')

const lessonDiv6 = document.getElementById('lesson-div6')
const arrow6 = document.getElementById('arrow6')
const contentHide6 = document.getElementById('content-hide6')


const retirementLink = document.getElementById('r-link')




function toggleLesson(div, arrow) {

    let height = getComputedStyle(div).maxHeight; //checks the height in the css instead of inline styles

    if (height === '45px') {
        arrow.innerHTML = "<i class='fa-solid fa-caret-up'></i>"
        div.style.maxHeight = '3000px'
    } else {
        arrow.innerHTML = `<i class="fa-solid fa-sort-down"></i>`
        div.style.maxHeight = '45px'
    }
}


function taxQuizScore(obj) {
    const answers = Object.values(obj);
    let correct = answers.reduce((sum, answer) => { if (answer === 'correct') { return sum + 1 } return sum }, 0)
    console.log(correct)
    let score = `${correct}/6`
    return score
}


contentHide1.addEventListener('click', () => {
    toggleLesson(lessonDiv1, arrow1)
})

contentHide2.addEventListener('click', () => {
    toggleLesson(lessonDiv2, arrow2)
})

contentHide3.addEventListener('click', () => {
    toggleLesson(lessonDiv3, arrow3)
})

contentHide4.addEventListener('click', () => {
    toggleLesson(lessonDiv4, arrow4)
})

contentHide5.addEventListener('click', () => {
    toggleLesson(lessonDiv5, arrow5)
})

contentHide6.addEventListener('click', () => {
    toggleLesson(lessonDiv6, arrow6)
})




arrow1.addEventListener('click', () => {
    toggleLesson(lessonDiv1, arrow1)
})

arrow2.addEventListener('click', () => {
    toggleLesson(lessonDiv2, arrow2)
})

arrow3.addEventListener('click', () => {
    toggleLesson(lessonDiv3, arrow3)
})

arrow4.addEventListener('click', () => {
    toggleLesson(lessonDiv4, arrow4)
})

arrow5.addEventListener('click', () => {
    toggleLesson(lessonDiv5, arrow5)
})

arrow6.addEventListener('click', () => {
    toggleLesson(lessonDiv6, arrow6)
})



submit.addEventListener('click', (e) => {
    e.preventDefault()
    let quizData = { //sets unanswered questions to incorrect by default
        question1: 'incorrect',
        question2: 'incorrect',
        question3: 'incorrect',
        question4: 'incorrect',
        question5: 'incorrect',
        question6: 'incorrect'
    }
    const formData = new FormData(taxQuiz);
    const formObject = Object.fromEntries(formData.entries());
    finalQuizData = {
        ...quizData,
        ...formObject
    }
    let finalScore = taxQuizScore(finalQuizData)
    if (finalScore === '6/6' || finalScore === '5/6') {
        testResult.innerHTML = `Lesson Complete: You Scored ${finalScore}`
        testResult.style.color = '#003D2B'
        sessionStorage.setItem('lesson2', 'complete')
    } else if (finalScore !== '6/6' || '5/6') {
        testResult.innerHTML = `Try again: You Scored ${finalScore}`
    }
    console.log(lessonsCompleted)
})

const lesson4btn = document.getElementById('lesson-link4')
lesson4btn.addEventListener('click', () => {
    sessionStorage.setItem('lesson4', 'complete')
    console.log(sessionStorage.getItem('progress'))
})


const lesson5btn = document.getElementById('lesson-link5')
lesson5btn.addEventListener('click', () => {
    sessionStorage.setItem('lesson5', 'complete')
    console.log(sessionStorage.getItem('progress'))
})


arrow6.addEventListener('click', () => {
    sessionStorage.setItem('lesson6', 'complete')
    console.log(sessionStorage.getItem('lesson1'), sessionStorage.getItem('lesson3'), sessionStorage.getItem('lesson6'))
})






// STOCK 
document.addEventListener('DOMContentLoaded', () => {
  try {
    const form         = document.getElementById('stocks-form');
    const btn          = document.getElementById('load-stocks');
    const demoBtn      = document.getElementById('load-sample');
    const symbolsInput = document.getElementById('symbols');
    const quotesBody   = document.querySelector('#quotes tbody');
    const eodBody      = document.querySelector('#eod tbody');
    const errEl        = document.getElementById('stocks-error');

    
    if (!form || !btn || !symbolsInput || !quotesBody || !eodBody || !errEl) {
      console.warn('[stocks] Widget not fully present. Missing elements:',
        { form: !!form, btn: !!btn, symbolsInput: !!symbolsInput, quotesBody: !!quotesBody, eodBody: !!eodBody, errEl: !!errEl });
      return;
    }

    const fmt = (n, d = 2) => (n == null || n === '' || Number.isNaN(n) ? '' : Number(n).toFixed(d));

    const changeCell = (value) => {
      if (value == null) return '';
      const n = Number(value);
      const cls = n > 0 ? 'up' : n < 0 ? 'down' : '';
      return `<span class="${cls}">${fmt(n)}</span>`;
    };

    const pctFrom = (q) => {
      if (q?.percent_change != null) return Number(q.percent_change);
      if (q?.change != null && q?.price != null && Number(q.price) !== 0) {
        const prev = Number(q.price) - Number(q.change);
        if (prev !== 0) return (Number(q.change) / prev) * 100;
      }
      return null;
    };

    const renderQuotes = (data) => {
      quotesBody.innerHTML = '';
      const rows = data?.data || [];
      rows.forEach((q) => {
        const pct = pctFrom(q);
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${q?.symbol ?? ''}</td>
          <td>${fmt(q?.price)}</td>
          <td>${changeCell(q?.change)}</td>
          <td>${pct == null ? '' : (pct >= 0 ? `<span class="up">${fmt(pct)}</span>` : `<span class="down">${fmt(pct)}</span>`)}</td>
          <td>${q?.timestamp ? new Date(q.timestamp * 1000).toLocaleString() : ''}</td>
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
          <td>${e?.symbol || ''}</td>
          <td>${fmt(e?.close)}</td>
          <td>${fmt(e?.high)}</td>
          <td>${fmt(e?.low)}</td>
          <td>${e?.date ? new Date(e.date).toLocaleDateString() : ''}</td>
        `;
        eodBody.appendChild(tr);
      });
    };

    const setLoading = (loading) => {
      btn.disabled = loading;
      btn.textContent = loading ? 'Loading…' : 'Search';
    };

    const sanitizeSymbols = (raw) =>
      (raw || '')
        .split(',')
        .map(s => s.trim().toUpperCase())
        .filter(Boolean)
        .join(',');

    const loadData = async (symbolsRaw) => {
      errEl.textContent = '';
      const raw = symbolsRaw ?? (symbolsInput.value || 'AAPL').trim();
      const symbols = sanitizeSymbols(raw);
      if (!symbols) {
        errEl.textContent = 'Please enter at least one ticker symbol.';
        return;
      }

      setLoading(true);
      try {
        // api and express routes
        const [quotesRes, eodRes] = await Promise.all([
          fetch(`/api/stockdata/quotes?symbols=${encodeURIComponent(symbols)}`, { credentials: 'include' }),
          fetch(`/api/marketstack/eod?symbols=${encodeURIComponent(symbols)}&limit=1`, { credentials: 'include' }),
        ]);

        const [quotesJson, eodJson] = await Promise.all([quotesRes.json(), eodRes.json()]);

        if (!quotesRes.ok) throw new Error(quotesJson?.error || `Quotes failed (${quotesRes.status})`);
        if (!eodRes.ok)   throw new Error(eodJson?.error   || `EOD failed (${eodRes.status})`);

        renderQuotes(quotesJson);
        renderEOD(eodJson);
      } catch (err) {
        console.error('[stocks] load error:', err);
        errEl.textContent = err?.message || 'Failed to load data.';
      } finally {
        setLoading(false);
      }
    };

    // Button handler
    form.addEventListener('submit', (e) => { e.preventDefault(); loadData(); });
    btn.addEventListener('click', (e) => { e.preventDefault(); loadData(); });
    
    console.log('[stocks] widget initialized');
  } catch (e) {
    console.error('[stocks] init crashed before binding handlers:', e);
  }
});
