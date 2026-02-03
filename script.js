// 1. 地図の初期化（高知駅を中心に広めに表示）
const map = L.map('map').setView([33.5670, 133.5430], 14);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

let score = 0;

// 2. 20箇所のクエストデータ（ここを編集して増やせます！）
const questSpots = [
    { name: "高知城", pos: [33.5607, 133.5314], q: "高知城の天守は日本にいくつ残る「現存12天守」の一つ？", ops: ["はい", "いいえ"], ans: "はい" },
    { name: "はりまや橋", pos: [33.5594, 133.5428], q: "はりまや橋の色は何色？", ops: ["青", "赤", "緑"], ans: "赤" },
    { name: "桂浜", pos: [33.4971, 133.5744], q: "ここにある有名な銅像は誰？", ops: ["坂本龍馬", "中岡慎太郎", "板垣退助"], ans: "坂本龍馬" },
    { name: "高知駅", pos: [33.5672, 133.5435], q: "駅前にある3つの大きな像を何と呼ぶ？", ops: ["三志士像", "三兄弟像", "三勇士像"], ans: "三志士像" },
    { name: "牧野植物園", pos: [33.5463, 133.5775], q: "牧野富太郎博士が愛した植物は？", ops: ["バイカオウレン", "サクラ", "ヒマワリ"], ans: "バイカオウレン" },
    // --- ここに同じ形式で20個まで追加できます ---
];

// 3. マーカーを一気に立てる
questSpots.forEach((spot, index) => {
    // 宝箱っぽいアイコンにすることも可能ですが、まずは標準マーカーで
    const marker = L.marker(spot.pos).addTo(map);
    
    // マーカーをクリックした時の動き
    marker.on('click', () => {
        openQuiz(index);
    });
});

// 4. クイズ画面を開く関数
function openQuiz(index) {
    const spot = questSpots[index];
    
    // HTML側の要素にデータを流し込む
    document.getElementById('quiz-spot-name').innerText = `【 ${spot.name} の試練 】`;
    document.getElementById('quiz-question').innerText = spot.q;
    
    const optionsDiv = document.getElementById('quiz-options');
    optionsDiv.innerHTML = ""; // 前の選択肢を消す
    
    spot.ops.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = "option-btn";
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(opt, spot.ans);
        optionsDiv.appendChild(btn);
    });
    
    // モーダルを表示
    document.getElementById('quiz-modal').classList.remove('hidden');
}

// 5. 正解チェック
function checkAnswer(userAns, correctAns) {
    if (userAns === correctAns) {
        alert("✨ 正解！秘宝のかけらを手に入れた！");
        score++;
        document.getElementById('score').innerText = `獲得した秘宝: ${score}`;
    } else {
        alert("💀 残念！もう一度修行してきなさい。");
    }
    document.getElementById('quiz-modal').classList.add('hidden');
}
