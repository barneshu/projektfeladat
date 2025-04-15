// Téma váltás (világos/sötét mód)
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }

  themeToggle?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const newTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
  });

  // Kvíz értékelés
  const quizForm = document.getElementById('quiz-form');
  if (quizForm) {
    quizForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const correctAnswers = {
        q1: "B",
        q2: "B",
        q3: "hirosima",
        q4: "Szovjetúnió",
        q5: "A zsidók, romák, fogyatékosok és más kisebbségek elpusztítása"
      };
      let score = 0;
      const formData = new FormData(quizForm);
      if (formData.get('q1') === correctAnswers.q1) score++;
      if (formData.get('q2') === correctAnswers.q2) score++;
      if (formData.get('kerdes3') === correctAnswers.q3) score++;
      if (formData.get('q4')?.trim().toLowerCase() === correctAnswers.q4.toLowerCase()) score++;
      if (formData.get('q5')?.trim().toLowerCase() === correctAnswers.q5.toLowerCase()) score++;
      alert(`Az eredményed: ${score} / 5`);
    });
  }

  // Memóriajáték logika
  const board = document.getElementById('game-board');
  const restartBtn = document.getElementById('restart-btn');
  if (board) {
    const cards = [
      { name: 'tank', emoji: '🛡️' },
      { name: 'tank', emoji: '🛡️' },
      { name: 'plane', emoji: '✈️' },
      { name: 'plane', emoji: '✈️' },
      { name: 'soldier', emoji: '🎖️' },
      { name: 'soldier', emoji: '🎖️' },
      { name: 'ship', emoji: '🚢' },
      { name: 'ship', emoji: '🚢' },
      { name: 'flag-de', emoji: '🇩🇪' },
      { name: 'flag-de', emoji: '🇩🇪' },
      { name: 'flag-ru', emoji: '🇷🇺' },
      { name: 'flag-ru', emoji: '🇷🇺' }
    ];

    let flippedCards = [];
    let matchedCards = 0;

    function shuffle(array) {
      return array.sort(() => 0.5 - Math.random());
    }

    function createBoard() {
      board.innerHTML = '';
      matchedCards = 0;
      flippedCards = [];
      const shuffled = shuffle([...cards]);
      shuffled.forEach(card => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.dataset.name = card.name;
        const span = document.createElement('span');
        span.textContent = card.emoji;
        div.appendChild(span);
        div.addEventListener('click', () => flipCard(div));
        board.appendChild(div);
      });
    }

    function flipCard(card) {
      if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        flippedCards.push(card);
        if (flippedCards.length === 2) checkMatch();
      }
    }

    function checkMatch() {
      const [first, second] = flippedCards;
      if (first.dataset.name === second.dataset.name) {
        matchedCards++;
        flippedCards = [];
        if (matchedCards === cards.length / 2) {
          setTimeout(() => alert('Gratulálunk! Megnyerted a játékot!'), 500);
          restartBtn.style.display = 'inline-block';
        }
      } else {
        setTimeout(() => {
          flippedCards.forEach(card => card.classList.remove('flipped'));
          flippedCards = [];
        }, 1000);
      }
    }

    restartBtn?.addEventListener('click', () => {
      createBoard();
      restartBtn.style.display = 'none';
    });

    createBoard();
  }
});
function frissitOra() {
  const oraElem = document.getElementById('digitalis-ora');
  if (!oraElem) return;

  const most = new Date();
  const ora = String(most.getHours()).padStart(2, '0');
  const perc = String(most.getMinutes()).padStart(2, '0');
  const masodperc = String(most.getSeconds()).padStart(2, '0');
  oraElem.textContent = `${ora}:${perc}:${masodperc}`;
}

setInterval(frissitOra, 1000);
frissitOra();
