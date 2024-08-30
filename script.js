// script.js

document.addEventListener("DOMContentLoaded", () => {
    loadProgress();
    loadLeaderboard();
});

function checkQuiz() {
    const quizForm = document.getElementById("quizForm");
    const userName = document.getElementById("userName").value.trim();
    if (!userName) {
        alert("Please enter your name to take the quiz.");
        return;
    }

    const answers = {
        q1: "14",
        q2: "19"
    };

    let score = 0;
    for (let [question, correctAnswer] of Object.entries(answers)) {
        const userAnswer = quizForm.querySelector(`input[name="${question}"]:checked`);
        if (userAnswer && userAnswer.value === correctAnswer) {
            score++;
        }
    }

    const resultMessage = `You scored ${score} out of ${Object.keys(answers).length}`;
    document.getElementById("quizResult").innerText = resultMessage;

    saveProgress(score);
    updateLeaderboard(userName, score);
    loadProgress();
    loadLeaderboard();
}

function saveProgress(score) {
    let progress = JSON.parse(localStorage.getItem("quizProgress")) || [];
    const date = new Date().toLocaleDateString();
    progress.push({ date, score });
    localStorage.setItem("quizProgress", JSON.stringify(progress));
}

function loadProgress() {
    const progressOverview = document.getElementById("progressOverview");
    const progress = JSON.parse(localStorage.getItem("quizProgress")) || [];

    if (progress.length === 0) {
        progressOverview.innerText = "You haven't taken any quizzes yet.";
    } else {
        let overviewHtml = "<ul>";
        progress.forEach(entry => {
            overviewHtml += `<li>${entry.date}: Scored ${entry.score} out of 2</li>`;
        });
        overviewHtml += "</ul>";
        progressOverview.innerHTML = overviewHtml;
    }
}

function resetProgress() {
    localStorage.removeItem("quizProgress");
    localStorage.removeItem("quizLeaderboard");
    loadProgress();
    loadLeaderboard();
}

function updateLeaderboard(userName, score) {
    let leaderboard = JSON.parse(localStorage.getItem("quizLeaderboard")) || [];
    leaderboard.push({ name: userName, score });
    
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 5); // Keep only top 5 scores

    localStorage.setItem("quizLeaderboard", JSON.stringify(leaderboard));
}

function loadLeaderboard() {
    const leaderboardList = document.getElementById("leaderboardList");
    const leaderboard = JSON.parse(localStorage.getItem("quizLeaderboard")) || [];

    if (leaderboard.length === 0) {
        leaderboardList.innerHTML = "<li>No scores yet. Be the first to take the quiz!</li>";
    } else {
        let leaderboardHtml = "";
        leaderboard.forEach(entry => {
            leaderboardHtml += `<li>${entry.name}: Scored ${entry.score} out of 2</li>`;
        });
        leaderboardList.innerHTML = leaderboardHtml;
    }
}

function spinWheel() {
    const topics = [
        'Preamble of the Constitution',
        'Fundamental Rights',
        'Directive Principles of State Policy',
        'Fundamental Duties',
        'Right to Constitutional Remedies'
    ];

    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    document.getElementById('wheelResult').textContent = `Learn about: ${randomTopic}`;
}

document.getElementById('spinButton').addEventListener('click', spinWheel);