var defaultData = {
    games: [
        { id: 1, name: "Rocket League" },
        { id: 2, name: "League of Legends" }
    ],
    teams: [
        { id: 1, name: "Team Vitality", gameId: 1, logo: '../assets/team_vitality.png' },
        { id: 2, name: "Karmine Corp", gameId: 1, logo: '../assets/karmine.png' },
        { id: 3, name: "G2 Esports", gameId: 2, logo: '../assets/g2.png' },
        { id: 4, name: "FaZe Clan", gameId: 1, logo: '../assets/faze.png' },
        { id: 5, name: "Natus Vincere", gameId: 2, logo: '../assets/Navi.png' },
        { id: 6, name: "Cloud9", gameId: 1, logo: '../assets/cloud9.png' },
        { id: 7, name: "NRG Esports", gameId: 1, logo: '../assets/nrg.png' },
        { id: 8, name: "Team BDS", gameId: 1, logo: '../assets/bds.png' },
        { id: 9, name: "Dignitas", gameId: 1, logo: '../assets/dig.png' }
    ],
    players: [
        {
            id: 1,
            nickname: "Zen",
            country: "France",
            teamId: 1,
            avatar: '../assets/zen.png',
            tournaments: ["RLCS 2023", "RLCS 2024"],
            earnings: 450000
        },
        {
            id: 2,
            nickname: "Caps",
            country: "Denmark",
            teamId: 3,
            avatar: '../assets/caps.png',
            tournaments: ["Worlds 2022", "MSI 2023"],
            earnings: 1700000
        },
        {
            id: 3,
            nickname: "Riptide",
            country: "USA",
            teamId: 4,
            avatar: '../assets/riptide.png',
            tournaments: ["RLCS 2024"],
            earnings: 120000
        },
        {
            id: 4,
            nickname: "Ayyjayy",
            country: "USA",
            teamId: 4,
            avatar: '../assets/ayyjay.png',
            tournaments: ["LCS 2023"],
            earnings: 369000
        },
        {
            id: 5,
            nickname: "Appjack",
            country: "UK",
            teamId: 9,
            avatar: '../assets/appjack.png',
            tournaments: ["Regional Cup 2022"],
            earnings: 387000
        },
        {
            id: 6,
            nickname: "Dralii",
            country: "Morocco",
            teamId: 1,
            avatar: '../assets/dralii_avatar.png',
            tournaments: ["RLCS 2024"],
            earnings: 95000
        },
        {
            id: 7,
            nickname: 'JSTN', 
            country: 'USA', 
            teamId: 7, 
            avatar: '../assets/jstn.png', 
            tournaments: ['RLCS'], 
            earnings: 120000
        },
        {
            id: 8,
            nickname: 'SquishyMuffinz', 
            country: 'Canada', 
            teamId: 6, 
            avatar: '../assets/squish.png', 
            tournaments: ['RLCS'], 
            earnings: 200000
        },
        {
            id: 9,
            nickname: 'Kaydop', 
            country: 'France', 
            teamId: 3, 
            avatar: '../assets/kaydop.png', 
            tournaments: ['RLCS'], 
            earnings: 500000
        },
        {
            id: 10,
            nickname: 'Turbopolsa', 
            country: 'Sweden', 
            teamId: 9, 
            avatar: '../assets/tb.png', 
            tournaments: ['RLCS'], 
            earnings: 450000
        },
        {
            id: 11,
            nickname: 'Fairy Peak!', 
            country: 'France', 
            teamId: 2, 
            avatar: '../assets/fp.png', 
            tournaments: ['RLCS'], 
            earnings: 380000
        }
    ]
};

var data = JSON.parse(localStorage.getItem("liquipediaData"));
if (!data) {
    data = defaultData;
    localStorage.setItem("liquipediaData", JSON.stringify(data));
}

if (typeof imageMap !== 'undefined' && imageMap) {
    data.teams.forEach(function (t) {
        if (imageMap[t.name]) t.logo = imageMap[t.name];
    });
    data.players.forEach(function (p) {
        if (imageMap[p.nickname]) p.avatar = imageMap[p.nickname];
    });
}

function ensureFeaturedPresent() {
    var changed = false;
    var featuredTeams = ['NRG Esports', 'Team BDS', 'Dignitas'];
    featuredTeams.forEach(function (name) {
        if (!data.teams.find(function (t) { return t.name === name; })) {
            var nextId = data.teams.length ? Math.max.apply(null, data.teams.map(function(x){return x.id;})) + 1 : 1;
            var logo = (typeof imageMap !== 'undefined' && imageMap && imageMap[name]) ? imageMap[name] : '../assets/team.svg';
            data.teams.push({ id: nextId, name: name, gameId: 1, logo: logo });
            changed = true;
        }
    });

    var featuredPlayers = [
        { nickname: 'JSTN', country: 'USA', teamName: 'NRG Esports', tournaments: ['RLCS'], earnings: 120000 },
        { nickname: 'SquishyMuffinz', country: 'Canada', teamName: 'Cloud9', tournaments: ['RLCS'], earnings: 200000 },
        { nickname: 'Kaydop', country: 'France', teamName: 'G2 Esports', tournaments: ['RLCS'], earnings: 500000 },
        { nickname: 'Turbopolsa', country: 'Sweden', teamName: 'Dignitas', tournaments: ['RLCS'], earnings: 450000 },
        { nickname: 'Fairy Peak!', country: 'France', teamName: 'Team BDS', tournaments: ['RLCS'], earnings: 380000 }
    ];

    featuredPlayers.forEach(function (fp) {
        if (!data.players.find(function (p) { return p.nickname === fp.nickname; })) {
            var nextPid = data.players.length ? Math.max.apply(null, data.players.map(function(x){return x.id;})) + 1 : 1;
            var team = data.teams.find(function (t) { return t.name === fp.teamName; });
            var teamId = team ? team.id : (data.teams.length ? data.teams[0].id : 1);
            var avatar = (typeof imageMap !== 'undefined' && imageMap && imageMap[fp.nickname]) ? imageMap[fp.nickname] : '../assets/player.svg';
            data.players.push({ id: nextPid, nickname: fp.nickname, country: fp.country, teamId: teamId, avatar: avatar, tournaments: fp.tournaments, earnings: fp.earnings });
            changed = true;
        }
    });

    if (changed) saveData();
}

ensureFeaturedPresent();

var content = document.getElementById('content');

function saveData() {
    localStorage.setItem("liquipediaData", JSON.stringify(data));
}

function getGameName(id) {
    var g = data.games.find(function (x) { return x.id === id; });
    return g ? g.name : '';
}

function getTeamName(id) {
    var t = data.teams.find(function (x) { return x.id === id; });
    return t ? t.name : '';
}

var AUTH_KEY = "jordropAuth";
var AUTH_USER = "Jordrop";
var AUTH_PASS = "1234";

function isLoggedIn() {
    return localStorage.getItem(AUTH_KEY) === "true";
}

function setNavEnabled(enabled) {
    var ids = ["btnTournaments", "btnEarnings", "btnTeams", "btnPlayers", "btnAddTeam", "btnAddPlayer", "btnLogout", "searchInput"];
    ids.forEach(function (id) {
        var el = document.getElementById(id);
        if (!el) return;
        el.disabled = !enabled;
        if (enabled) {
            el.classList.remove('is-disabled');
        } else {
            el.classList.add('is-disabled');
        }
    });
    document.body.classList.toggle('logged-out', !enabled);
}

function requireAuth() {
    if (!isLoggedIn()) {
        showLogin();
        return false;
    }
    return true;
}

function showLogin(message) {
    setNavEnabled(false);
    content.innerHTML = `
        <div class="login-wrap">
            <div class="login-card">
                <div class="login-badge">J</div>
                <h2>Jordrop Portal</h2>
                <p class="muted">Sign in to access teams, players, and stats.</p>
                <form id="loginForm">
                    <label>Username</label>
                    <input id="loginUser" type="text" placeholder="Jordrop" autocomplete="username" required>
                    <label>Password</label>
                    <input id="loginPass" type="password" placeholder="****" autocomplete="current-password" required>
                    <button type="submit" class="primary-btn">Log in</button>
                    <div class="login-hint">${message || 'Use Jordrop / 1234'}</div>
                </form>
            </div>
        </div>
    `;

    var form = document.getElementById('loginForm');
    if (!form) return;
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var user = document.getElementById('loginUser').value.trim();
        var pass = document.getElementById('loginPass').value.trim();
        if (user === AUTH_USER && pass === AUTH_PASS) {
            localStorage.setItem(AUTH_KEY, "true");
            setNavEnabled(true);
            showHome();
        } else {
            showLogin('Invalid login. Use Jordrop / 1234.');
        }
    });
}

function formatCurrency(value) {
    var safe = typeof value === 'number' && !isNaN(value) ? value : 0;
    return '$' + Math.round(safe).toLocaleString('en-US');
}

function buildTournamentStats() {
    var map = {};
    data.players.forEach(function (p) {
        (p.tournaments || []).forEach(function (tournament) {
            var name = (tournament || '').trim();
            if (!name) return;
            if (!map[name]) {
                map[name] = { name: name, players: 0, earnings: 0 };
            }
            map[name].players += 1;
            map[name].earnings += (p.earnings || 0);
        });
    });
    var list = Object.keys(map).map(function (key) { return map[key]; });
    list.sort(function (a, b) {
        if (b.players !== a.players) return b.players - a.players;
        if (b.earnings !== a.earnings) return b.earnings - a.earnings;
        return a.name.localeCompare(b.name);
    });
    return list;
}

function showHome(skipPush) {
    if (!requireAuth()) return;
     content.innerHTML = "";

    // Hero Section
    var hero = document.createElement('div'); hero.className = 'hero';
    hero.innerHTML = `
        <video class="panel-video" autoplay muted loop playsinline preload="auto" poster="../assets/trophy1.png">
            <source src="../assets/vitality_rlcs2023.mp4" type="video/mp4">
        </video>
        <div class="hero-inner">
            <h1>Jordrop Esports</h1>
            <p class="muted">Simple esports reference for players and teams</p>
        </div>
    `;
    content.appendChild(hero);

    var totalEarningsForInfo = data.players.reduce((acc, p) => acc + p.earnings, 0);
    var infoBar = document.createElement('div'); infoBar.className = 'info-bar';
    infoBar.innerHTML = `
        <video class="panel-video" autoplay muted loop playsinline preload="auto" poster="../assets/trophy1.png">
            <source src="../assets/vitality_rlcs2023.mp4" type="video/mp4">
        </video>
        <div class="info-item"><span class="pill">Updated</span><strong>RLCS Worlds</strong> season wrap-up</div>
        <div class="info-item"><strong>${data.teams.length}</strong> teams tracked</div>
        <div class="info-item"><strong>${data.players.length}</strong> players tracked</div>
        <div class="info-item"><strong>${formatCurrency(totalEarningsForInfo)}</strong> total earnings</div>
    `;
    content.appendChild(infoBar);

    // Stats Dashboard
    var statsGrid = document.createElement('div'); statsGrid.className = 'stats-grid';
    
    // Tournaments Card
    var tournamentsCard = document.createElement('div'); tournamentsCard.className = 'stat-card image-card tournaments-card';
    tournamentsCard.innerHTML = `
        <div class="card-media" style="background-image:url('../assets/trophy1.png')"></div>
        <div class="stat-content">
            <h3>Tournaments</h3>
            <div class="stat-value">${data.players.reduce((acc, p) => acc + p.tournaments.length, 0)}</div>
            <p class="stat-label">Total tournaments tracked</p>
        </div>
    `;
    tournamentsCard.onclick = showTournaments;    
    // Statistics Card
    var statsCard = document.createElement('div'); statsCard.className = 'stat-card image-card earnings-card';
    var totalEarnings = data.players.reduce((acc, p) => acc + p.earnings, 0);
    statsCard.innerHTML = `
        <div class="card-media" style="background-image:url('../assets/rlcs.png')"></div>
        <div class="stat-content">
            <h3>Prize Pool</h3>
            <div class="stat-value">$${(totalEarnings / 1000).toFixed(0)}K</div>
            <p class="stat-label">Total earnings tracked</p>
        </div>
    `;
    statsCard.onclick = showEarnings;
    
    // Players Card
    var playersCard = document.createElement('div'); playersCard.className = 'stat-card image-card players-card';
    playersCard.innerHTML = `
        <div class="card-media" style="background-image:url('../assets/player.png')"></div>
        <div class="stat-content">
            <h3>Players</h3>
            <div class="stat-value">${data.players.length}</div>
            <p class="stat-label">Active players</p>
        </div>
    `;
    playersCard.onclick = showPlayers;    
    // Teams Card
    var teamsCard = document.createElement('div'); teamsCard.className = 'stat-card image-card teams-card';
    teamsCard.innerHTML = `
        <div class="card-media" style="background-image:url('../assets/teams.png')"></div>
        <div class="stat-content">
            <h3>Teams</h3>
            <div class="stat-value">${data.teams.length}</div>
            <p class="stat-label">Professional teams</p>
        </div>
    `;
    teamsCard.onclick = showTeams;    
    statsGrid.appendChild(tournamentsCard);
    statsGrid.appendChild(statsCard);
    statsGrid.appendChild(playersCard);
    statsGrid.appendChild(teamsCard);
    content.appendChild(statsGrid);

    // Quick Actions Section
    var quickActions = document.createElement('div'); quickActions.className = 'quick-actions';
    quickActions.innerHTML = `
        <h2>Quick Actions</h2>
        <div class="action-buttons">
            <button class="action-btn" onclick="showTournaments()">
                <span>TOUR</span>
                <span>Browse Tournaments</span>
            </button>
            <button class="action-btn" onclick="showEarnings()">
                <span>EARN</span>
                <span>Earnings Leaderboard</span>
            </button>
            <button class="action-btn" onclick="showTeams()">
                <span>TEAM</span>
                <span>View All Teams</span>
            </button>
            <button class="action-btn" onclick="showPlayers()">
                <span>PLAY</span>
                <span>View All Players</span>
            </button>
            <button class="action-btn" onclick="addTeam()">
                <span>ADD</span>
                <span>Add New Team</span>
            </button>
            <button class="action-btn" onclick="addPlayer()">
                <span>ADD</span>
                <span>Add New Player</span>
            </button>
        </div>
    `;
    content.appendChild(quickActions);

    // Sidebar with Featured Content
    var mainGrid = document.createElement('div'); mainGrid.className = 'home-grid';
    var mainCol = document.createElement('div'); mainCol.className = 'main-col';
    var sidebar = document.createElement('aside'); sidebar.className = 'sidebar';
    
    // Featured Players
    var featuredPlayers = document.createElement('div'); featuredPlayers.className = 'featured-card';
    featuredPlayers.innerHTML = `
        <h3>Featured Players</h3>
        <div id="featuredPlayersList">
            ${data.players.slice(0, 3).map(p => `
                <div class="featured-item" onclick="showPlayerDetails(${data.players.indexOf(p)})">
                    <img src="${p.avatar || '../assets/player.svg'}" alt="${p.nickname}">
                    <div>
                        <strong>${p.nickname}</strong>
                        <small>${p.country} - ${getTeamName(p.teamId)}</small>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    sidebar.appendChild(featuredPlayers);

    var topEarners = document.createElement('div'); topEarners.className = 'featured-card';
    var earningsLeaders = data.players.slice().sort(function (a, b) { return b.earnings - a.earnings; }).slice(0, 3);
    topEarners.innerHTML = `
        <h3>Top Earners</h3>
        <div id="topEarnersList">
            ${earningsLeaders.map(p => `
                <div class="featured-item" onclick="showPlayerDetails(${data.players.indexOf(p)})">
                    <img src="${p.avatar || '../assets/player.svg'}" alt="${p.nickname}">
                    <div>
                        <strong>${p.nickname}</strong>
                        <small>${formatCurrency(p.earnings)}</small>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    sidebar.appendChild(topEarners);
    // News Card
    var newsCard = document.createElement('div'); newsCard.className = 'news-card';
    newsCard.innerHTML = `
        <h3>Latest News</h3>
        <div id="newsList" class="news-list">
            <div class="news-item-row">
                <span class="news-pill">Breaking</span>
                <strong>Team Vitality locks in roster for RLCS 2024</strong>
                <small>2h ago</small>
            </div>
            <div class="news-item-row">
                <span class="news-pill">Event</span>
                <strong>Worlds venue announced for next season</strong>
                <small>1d ago</small>
            </div>
            <div class="news-item-row">
                <span class="news-pill">Patch</span>
                <strong>Meta shifts after latest Rocket League update</strong>
                <small>3d ago</small>
            </div>
        </div>
    `;
    sidebar.appendChild(newsCard);

    var voteCard = document.createElement('div'); voteCard.className = 'featured-card';
    var voteChoice = localStorage.getItem('playerVote');
    var voteMessage = voteChoice ? 'Thanks for voting for ' + voteChoice + '.' : 'Vote once for your Player of the Year.';
    voteCard.innerHTML = `
        <h3>Player of the Year</h3>
        <p class="muted">${voteMessage}</p>
        <div class="vote-list">
            ${data.players.slice(0, 5).map(p => `
                <label class="vote-option">
                    <input type="radio" name="playerVote" value="${p.nickname}" ${voteChoice ? 'disabled' : ''}>
                    <span>${p.nickname}</span>
                </label>
            `).join('')}
        </div>
        <div class="vote-actions">
            <button class="primary-btn vote-btn" ${voteChoice ? 'disabled' : ''}>Submit Vote</button>
            <button class="ghost-btn vote-reset" ${voteChoice ? '' : 'disabled'}>Reset</button>
        </div>
    `;
    sidebar.appendChild(voteCard);

    var voteBtn = voteCard.querySelector('.vote-btn');
    if (voteBtn) {
        voteBtn.addEventListener('click', function () {
            if (localStorage.getItem('playerVote')) return;
            var selected = voteCard.querySelector('input[name=\"playerVote\"]:checked');
            if (!selected) return;
            localStorage.setItem('playerVote', selected.value);
            showHome(true);
        });
    }

    var resetBtn = voteCard.querySelector('.vote-reset');
    if (resetBtn) {
        resetBtn.addEventListener('click', function () {
            localStorage.removeItem('playerVote');
            showHome(true);
        });
    }

    var matchupsCard = document.createElement('div'); matchupsCard.className = 'featured-card matchups-card';
    var matchups = [];
    for (var i = 0; i < data.teams.length && matchups.length < 3; i += 2) {
        if (data.teams[i + 1]) {
            matchups.push({ left: data.teams[i], right: data.teams[i + 1] });
        }
    }
    function teamScore(team) {
        return data.players.filter(function (p) { return p.teamId === team.id; })
            .reduce(function (acc, p) { return acc + (p.earnings || 0); }, 0);
    }
    matchupsCard.innerHTML = `
        <h3>Featured Matchups</h3>
        <div>
            ${matchups.map(m => {
                var leftScore = teamScore(m.left);
                var rightScore = teamScore(m.right);
                var favorite = leftScore === rightScore ? 'Even' : (leftScore > rightScore ? m.left.name : m.right.name);
                return `
                <div class="matchup-item">
                    <div class="matchup-teams">
                        <span class="matchup-team">
                            <img src="${m.left.logo || '../assets/team.svg'}" alt="${m.left.name} logo">
                            <span>${m.left.name}</span>
                        </span>
                        <span class="matchup-vs">VS</span>
                        <span class="matchup-team">
                            <img src="${m.right.logo || '../assets/team.svg'}" alt="${m.right.name} logo">
                            <span>${m.right.name}</span>
                        </span>
                    </div>
                    <div class="matchup-meta-wrap">
                        <span class="matchup-pick">${favorite} favored</span>
                        <span class="matchup-meta">Bo7</span>
                    </div>
                </div>
            `;
            }).join('')}
        </div>
    `;

    mainCol.appendChild(quickActions);
    mainCol.appendChild(matchupsCard);
    mainGrid.appendChild(mainCol);
    mainGrid.appendChild(sidebar);
    content.appendChild(mainGrid);

    if (typeof fetchLiveData === 'function') {
        try { fetchLiveData(); } catch (e) { console.warn('fetchLiveData error', e); }
    }

    if (!skipPush && history && history.pushState) {
        try { history.pushState({view:'home'}, '', '#home'); } catch (e) { }
    }
}

function showTournaments(skipPush) {
    if (!requireAuth()) return;
    content.innerHTML = "<h2>Tournaments</h2>";

    var list = buildTournamentStats();
    if (!list.length) {
        content.innerHTML += '<p class="muted">No tournaments available.</p>';
        return;
    }

    var table = document.createElement("table");
    table.className = "table";
    table.innerHTML = "<tr><th>Name</th><th>Players</th><th>Total Earnings</th><th>Avg Earnings</th></tr>";

    list.forEach(function (t) {
        var avg = t.players ? Math.round(t.earnings / t.players) : 0;
        var row = document.createElement("tr");
        row.innerHTML =
            "<td>" + t.name + "</td>" +
            "<td>" + t.players + "</td>" +
            "<td>" + formatCurrency(t.earnings) + "</td>" +
            "<td>" + formatCurrency(avg) + "</td>";
        table.appendChild(row);
    });

    content.appendChild(table);
    if (!skipPush && history && history.pushState) {
        try { history.pushState({view:'tournaments'}, '', '#tournaments'); } catch (e) { }
    }
}

function showEarnings(skipPush) {
    if (!requireAuth()) return;
    content.innerHTML = "<h2>Earnings</h2>";

    var sorted = data.players.slice().sort(function (a, b) { return b.earnings - a.earnings; });
    if (!sorted.length) {
        content.innerHTML += '<p class="muted">No earnings available.</p>';
        return;
    }

    var table = document.createElement("table");
    table.className = "table";
    table.innerHTML = "<tr><th>Rank</th><th>Player</th><th>Team</th><th>Earnings</th><th>Tournaments</th><th>Action</th></tr>";

    sorted.forEach(function (p, i) {
        var row = document.createElement("tr");
        row.innerHTML =
            "<td>" + (i + 1) + "</td>" +
            "<td>" + p.nickname + "</td>" +
            "<td>" + getTeamName(p.teamId) + "</td>" +
            "<td>" + formatCurrency(p.earnings) + "</td>" +
            "<td>" + ((p.tournaments || []).length) + "</td>";

        var action = document.createElement("td");
        var view = document.createElement("button");
        view.textContent = "View";
        view.onclick = (function (index) {
            return function () {
                showPlayerDetails(index);
            };
        })(data.players.indexOf(p));

        action.appendChild(view);
        row.appendChild(action);
        table.appendChild(row);
    });

    content.appendChild(table);
    if (!skipPush && history && history.pushState) {
        try { history.pushState({view:'earnings'}, '', '#earnings'); } catch (e) { }
    }
}

function fetchLiveData() {
    var featured = [
        'JSTN', 'SquishyMuffinz', 'Kaydop', 'Turbopolsa', 'Fairy Peak!',
        'Team Vitality', 'Team BDS', 'NRG Esports', 'G2 Esports', 'Dignitas'
    ];

    var api = 'https://liquipedia.net/rocketleague/api.php';
    var q = api + '?action=query&format=json&formatversion=2&prop=pageimages|extracts&piprop=thumbnail&pithumbsize=800&exintro=1&explaintext=1&titles=' + encodeURIComponent(featured.join('|'));

    fetch(q).then(function (res) {
        if (!res.ok) throw new Error('Network response not ok');
        return res.json();
    }).then(function (json) {
        if (!json.query || !json.query.pages) return;
        json.query.pages.forEach(function (page) {
            if (!page || !page.title) return;
            var p = data.players.find(function (x) { return x.nickname === page.title || page.title.indexOf(x.nickname) !== -1; });
            if (p) {
                if (page.thumbnail && page.thumbnail.source) p.avatar = page.thumbnail.source;
                if (page.extract) p.extract = page.extract;
                return;
            }
            var t = data.teams.find(function (x) { return x.name === page.title || page.title.indexOf(x.name) !== -1; });
            if (t) {
                if (page.thumbnail && page.thumbnail.source) t.logo = page.thumbnail.source;
                if (page.extract) t.extract = page.extract;
            }
        });

        try {
            var heroSlides = document.querySelectorAll('.hero-slide');
            var featuredTeams = data.teams.filter(function (x) { return x.logo; }).slice(0, 3);
            featuredTeams.forEach(function (ft, i) {
                var slide = heroSlides[i];
                if (slide) {
                    slide.style.backgroundImage = 'linear-gradient(90deg, rgba(0,0,0,0.35), rgba(0,0,0,0.25)), url("' + ft.logo + '")';
                    slide.innerHTML = '<div style="background:rgba(0,0,0,0.5);padding:18px;border-radius:8px;max-width:60%">' +
                        '<h2 style="color:var(--accent);">' + ft.name + '</h2>' +
                        '<p class="muted">' + (ft.extract ? ft.extract.substring(0,180) + '...' : '') + '</p>' +
                        '</div>';
                }
            });
        } catch (e) { }
    }).catch(function (err) {
        console.warn('Live Liquipedia fetch failed (may be blocked by CORS or network):', err);
        if (typeof imageMap !== 'undefined' && imageMap) {
            data.players.forEach(function (p) { if (imageMap[p.nickname]) p.avatar = imageMap[p.nickname]; });
            data.teams.forEach(function (t) { if (imageMap[t.name]) t.logo = imageMap[t.name]; });
        }
    });
}

window.addEventListener('popstate', function (ev) {
    if (!isLoggedIn()) { showLogin(); return; }
    var s = ev.state;
    if (!s) {
        showHome(true);
        return;
    }
    switch (s.view) {
        case 'home': showHome(true); break;
        case 'teams': showTeams(true); break;
        case 'players': showPlayers(true); break;
        case 'tournaments': showTournaments(true); break;
        case 'earnings': showEarnings(true); break;
        case 'team': showTeamDetails(s.index, true); break;
        case 'player': showPlayerDetails(s.index, true); break;
        case 'game': showGameDetails(s.index, true); break;
        default: showHome(true);
    }
});

function showTeams(skipPush) {
    if (!requireAuth()) return;
    content.innerHTML = "<h2>Teams</h2>";

    var table = document.createElement("table");
    table.className = "table";
    table.innerHTML =
        "<tr><th>Logo</th><th>Name</th><th>Game</th><th>Action</th></tr>";

    for (var i = 0; i < data.teams.length; i++) {
        var t = data.teams[i];
        var row = document.createElement("tr");

        row.innerHTML =
            "<td><img src='" + (t.logo || '../assets/team.svg') + "' alt='logo' style='width:48px;height:48px;object-fit:contain;border-radius:6px' /></td>" +
            "<td>" + t.name + "</td>" +
            "<td>" + getGameName(t.gameId) + "</td>";

        var action = document.createElement("td");
        var del = document.createElement("button");
        del.textContent = "Delete";
        del.onclick = (function (index) {
            return function () {
                data.teams.splice(index, 1);
                saveData();
                showTeams();
            };
        })(i);

        action.appendChild(del);
        row.appendChild(action);
        table.appendChild(row);
    }

    content.appendChild(table);
    if (!skipPush && history && history.pushState) {
        try { history.pushState({view:'teams'}, '', '#teams'); } catch (e) { }
    }
}

function showTeamDetails(index, skipPush) {
    if (!requireAuth()) return;
    var t = data.teams[index];
    var playersOfTeam = data.players.filter(function (p) { return p.teamId === t.id; });
    content.innerHTML = "<h2>" + t.name + "</h2>" +
        "<img src='" + (t.logo || '../assets/team.svg') + "' alt='Team Logo' style='width:100px;height:100px;object-fit:contain;margin-bottom:20px' />" +
        "<p><strong>Game:</strong> " + getGameName(t.gameId) + "</p>";

    var list = document.createElement('div');
    list.innerHTML = "<h3>Players:</h3>";
    playersOfTeam.forEach(function (p) {
        var item = document.createElement('div');
        item.innerHTML = "<strong>" + p.nickname + "</strong> - " + p.country;
        list.appendChild(item);
    });
    content.appendChild(list);
    content.appendChild(document.createElement('hr'));
    var back = document.createElement('button'); back.textContent = 'Back'; back.onclick = showTeams;
    content.appendChild(back);
    if (!skipPush && history && history.pushState) {
        try { history.pushState({view:'team', index: index}, '', '#team-' + index); } catch (e) { }
    }
}

function showGameDetails(index, skipPush) {
    if (!requireAuth()) return;
    var g = data.games[index];
    var teamsOfGame = data.teams.filter(function (t) { return t.gameId === g.id; });
    content.innerHTML = "<h2>" + g.name + "</h2>";
    var list = document.createElement('div');
    teamsOfGame.forEach(function (t) {
        var item = document.createElement('div');
        item.innerHTML = "<strong>" + t.name + "</strong>";
        list.appendChild(item);
    });
    content.appendChild(list);
    content.appendChild(document.createElement('hr'));
    var back = document.createElement('button'); back.textContent = 'Back'; back.onclick = showHome;
    content.appendChild(back);
    if (!skipPush && history && history.pushState) {
        try { history.pushState({view:'game', index: index}, '', '#game-' + index); } catch (e) { }
    }
}

function addTeam() {
    if (!requireAuth()) return;
    var name = prompt("Team name:");
    var gameId = prompt("Game ID (1 = Rocket League, 2 = LoL):");

    if (name && gameId) {
        data.teams.push({
            id: data.teams.length + 1,
            name: name,
            gameId: parseInt(gameId),
            logo: '../assets/team.svg'
        });
        saveData();
        showTeams();
    }
}

function showPlayers(skipPush) {
    if (!requireAuth()) return;
    content.innerHTML = "<h2>Players</h2>";

    var table = document.createElement("table");
    table.className = "table";
    table.innerHTML =
        "<tr><th>Nickname</th><th>Country</th><th>Team</th><th>Earnings ($)</th><th>Actions</th></tr>";

    for (var i = 0; i < data.players.length; i++) {
        var p = data.players[i];
        var row = document.createElement("tr");

        row.innerHTML =
            "<td>" + p.nickname + "</td>" +
            "<td>" + p.country + "</td>" +
            "<td>" + getTeamName(p.teamId) + "</td>" +
            "<td>" + p.earnings + "</td>";

        var actions = document.createElement("td");

        var view = document.createElement("button");
        view.textContent = "View";
        view.onclick = (function (index) {
            return function () {
                showPlayerDetails(index);
            };
        })(i);

        var del = document.createElement("button");
        del.textContent = "Delete";
        del.onclick = (function (index) {
            return function () {
                data.players.splice(index, 1);
                saveData();
                showPlayers();
            };
        })(i);

        actions.appendChild(view);
        actions.appendChild(del);

        row.appendChild(actions);
        table.appendChild(row);
    }

    content.appendChild(table);
    if (!skipPush && history && history.pushState) {
        try { history.pushState({view:'players'}, '', '#players'); } catch (e) { }
    }
}

function showPlayerDetails(index, skipPush) {
    if (!requireAuth()) return;
    var p = data.players[index];
    var team = data.teams.find(function (t) { return t.id === p.teamId; });

    content.innerHTML = '';
    var header = document.createElement('div');
    header.style.display = 'flex';
    header.style.alignItems = 'center';
    header.style.gap = '16px';

    var avatar = document.createElement('img');
    avatar.src = p.avatar || '../assets/player.svg';
    avatar.style.width = '120px';
    avatar.style.height = '120px';
    avatar.style.objectFit = 'cover';
    avatar.style.borderRadius = '10px';

    var info = document.createElement('div');
    info.innerHTML = "<h2>" + p.nickname + "</h2>" +
        "<p><strong>Country:</strong> " + p.country + "</p>" +
        "<p><strong>Team:</strong> " + (team ? team.name : '') + "</p>";

    header.appendChild(avatar);
    header.appendChild(info);
    content.appendChild(header);

    var stats = document.createElement('div');
    stats.style.marginTop = '12px';
    stats.innerHTML = "<p><strong>Earnings:</strong> $" + p.earnings + "</p>" +
        "<p><strong>Tournaments:</strong> " + p.tournaments.join(", ") + "</p>";
    content.appendChild(stats);

    if (team && team.logo) {
        var logo = document.createElement('img');
        logo.src = team.logo;
        logo.style.width = '84px';
        logo.style.height = '84px';
        logo.style.objectFit = 'contain';
        logo.style.marginTop = '12px';
        content.appendChild(logo);
    }

    var back = document.createElement('button'); back.textContent = 'Back'; back.style.marginTop = '16px'; back.onclick = showPlayers;
    content.appendChild(back);
    if (!skipPush && history && history.pushState) {
        try { history.pushState({view:'player', index: index}, '', '#player-' + index); } catch (e) { }
    }
}

function addPlayer() {
    if (!requireAuth()) return;
    var nickname = prompt("Nickname:");
    var country = prompt("Country:");
    var teamId = prompt("Team ID:");
    var earnings = prompt("Earnings:");
    var tournaments = prompt("Tournaments (comma separated):");

    if (nickname && country && teamId && earnings) {
        data.players.push({
            id: data.players.length + 1,
            nickname: nickname,
            country: country,
            teamId: parseInt(teamId),
            avatar: '../assets/player.svg',
            earnings: parseInt(earnings),
            tournaments: tournaments ? tournaments.split(",") : []
        });
        saveData();
        showPlayers();
    }
}

function attachAutocomplete(input) {
    if (!input) return;
    var wrapper = input.parentElement;
    wrapper.style.position = wrapper.style.position || 'relative';

    var box = document.createElement('div');
    box.className = 'suggestions';
    box.style.display = 'none';
    box.style.minWidth = '220px';
    box.style.maxWidth = '480px';
    box.style.right = '0';
    box.style.left = '0';

    wrapper.appendChild(box);

    function render(items) {
        box.innerHTML = '';
        if (!items || items.length === 0) {
            box.style.display = 'none';
            return;
        }
        var lastType = null;
        items.forEach(function (it) {
            if (it.type !== lastType) {
                var cat = document.createElement('div');
                cat.className = 'suggestion-category';
                cat.textContent = it.type.charAt(0).toUpperCase() + it.type.slice(1);
                box.appendChild(cat);
                lastType = it.type;
            }
            var row = document.createElement('div');
            row.className = 'suggestion-item';
            row.innerHTML = "<span>" + it.label + "</span>" +
                "<small>" + it.extra + "</small>";
            row.addEventListener('click', function () {
                box.style.display = 'none';
                input.value = it.label;
                if (it.type === 'player') {
                    showPlayerDetails(it.index);
                } else if (it.type === 'team') {
                    showTeamDetails(it.index);
                } else if (it.type === 'game') {
                    showGameDetails(it.index);
                }
            });
            box.appendChild(row);
        });
        box.style.display = 'block';
    }

    function query(val) {
        val = (val || '').toLowerCase().trim();
        if (!val) { render([]); return; }
        var results = [];
        for (var i = 0; i < data.players.length; i++) {
            var p = data.players[i];
            if (p.nickname.toLowerCase().includes(val)) {
                results.push({ type: 'player', label: p.nickname, extra: p.country, index: i });
            }
        }
        for (var j = 0; j < data.teams.length; j++) {
            var t = data.teams[j];
            if (t.name.toLowerCase().includes(val)) {
                results.push({ type: 'team', label: t.name, extra: getGameName(t.gameId), index: j });
            }
        }
        for (var k = 0; k < data.games.length; k++) {
            var g = data.games[k];
            if (g.name.toLowerCase().includes(val)) {
                results.push({ type: 'game', label: g.name, extra: '', index: k });
            }
        }

        results.sort(function (a, b) {
            var order = { player: 0, team: 1, game: 2 };
            if (order[a.type] !== order[b.type]) return order[a.type] - order[b.type];
            return a.label.localeCompare(b.label);
        });
        render(results.slice(0, 10));
    }

    input.addEventListener('input', function (e) {
        query(this.value);
    });

    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            var val = this.value.trim().toLowerCase();
            if (!val) { showHome(); return; }
            content.innerHTML = '<h2>Search Results</h2>';
            var found = false;
            for (var i = 0; i < data.players.length; i++) {
                if (data.players[i].nickname.toLowerCase().includes(val)) {
                    var p = data.players[i];
                    var div = document.createElement('div');
                    div.innerHTML = "<p><strong>Player:</strong> " + p.nickname + " (" + p.country + ")</p>";
                    content.appendChild(div);
                    found = true;
                }
            }
            for (var j = 0; j < data.teams.length; j++) {
                if (data.teams[j].name.toLowerCase().includes(val)) {
                    var t = data.teams[j];
                    var d2 = document.createElement('div');
                    d2.innerHTML = "<p><strong>Team:</strong> " + t.name + "</p>";
                    content.appendChild(d2);
                    found = true;
                }
            }
            if (!found) content.innerHTML += '<p>No results found.</p>';
            box.style.display = 'none';
        }
    });

    document.addEventListener('click', function (ev) {
        if (!wrapper.contains(ev.target)) box.style.display = 'none';
    });
}
attachAutocomplete(document.getElementById('searchInput'));

document.getElementById("btnTournaments").addEventListener("click", showTournaments);
document.getElementById("btnEarnings").addEventListener("click", showEarnings);
document.getElementById("btnTeams").addEventListener("click", showTeams);
document.getElementById("btnPlayers").addEventListener("click", showPlayers);
document.getElementById("btnAddTeam").addEventListener("click", addTeam);
document.getElementById("btnAddPlayer").addEventListener("click", addPlayer);

document.getElementById("btnLogout").addEventListener("click", function () {
    localStorage.setItem(AUTH_KEY, "false");
    showLogin("Signed out.");
    if (history && history.replaceState) {
        try { history.replaceState({view:'login'}, '', '#login'); } catch (e) { }
    }
});


document.getElementById("homeLink").addEventListener("click", showHome);

if (isLoggedIn()) {
    setNavEnabled(true);
    showHome(true);
    if (history && history.replaceState) {
        try { history.replaceState({view:'home'}, '', '#home'); } catch (e) { }
    }
} else {
    setNavEnabled(false);
    showLogin();
    if (history && history.replaceState) {
        try { history.replaceState({view:'login'}, '', '#login'); } catch (e) { }
    }
}
