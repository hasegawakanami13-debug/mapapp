// 1. 地図設定
const map = L.map('map').setView([33.5600, 133.5350], 15);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

let score = 0;

// 2. クイズデータ
const questSpots = [
    {
        name: "高知城",
        pos: [33.5607, 133.5314],
        question: "高知城を築城した初代土佐藩主は？",
        options: ["坂本龍馬", "山内一豊", "長宗我部元親"],
        answer: "山内一豊"
    },
    {
        name: "はりまや橋",
        pos: [33.5594, 133.5428],
        question: "よさこい節で「坊さん何を買うた」と歌われている場所は？",
        options: ["はりまや橋", "ひろめ市場", "桂浜"],
        answer: "はりまや橋"
    }
];

// 3. マーカー（宝箱）を設置
questSpots.forEach((spot, index) => {
    const marker = L.marker(spot.pos).addTo(map);
    marker.bindTooltip("クエスト発生！");
    
    marker.on('click', () => {
        openQuiz(index);
    });
});

// 4. クイズを開く
function openQuiz(index) {
    const spot = questSpots[index];
    document.getElementById('quiz-spot-name').innerText = spot.name;
    document.getElementById('quiz-question').innerText = spot.question;
    
    const optionsDiv = document.getElementById('quiz-options');
    optionsDiv.innerHTML = ""; // クリア
    
    spot.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = "option-btn";
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(opt, spot.answer);
        optionsDiv.appendChild(btn);
    });
    
    document.getElementById('quiz-modal').classList.remove('hidden');
}

// 5. 正誤判定
function checkAnswer(select, correct) {
    if (select === correct) {
        alert("正解ぜよ！秘宝を手に入れた！");
        score++;
        document.getElementById('score').innerText = `獲得した秘宝: ${score}`;
    } else {
        alert("残念！修行が足りんちや。");
    }
    closeQuiz();
}

function closeQuiz() {
    document.getElementById('quiz-modal').classList.add('hidden');
}
