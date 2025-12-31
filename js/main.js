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

function showHome(skipPush) {
     content.innerHTML = "";

    // Hero Section
    var hero = document.createElement('div'); hero.className = 'hero';
    hero.innerHTML = `
        <div class="hero-inner">
            <h1>Esports domain</h1>
            <p class="muted">Live esports reference for players & teams</p>
        </div>
    `;
    content.appendChild(hero);

    // Stats Dashboard
    var statsGrid = document.createElement('div'); statsGrid.className = 'stats-grid';
    
    // Tournaments Card
    var tournamentsCard = document.createElement('div'); tournamentsCard.className = 'stat-card tournaments-card';
    tournamentsCard.innerHTML = `
        <div class="stat-icon">🏆</div>
        <div class="stat-content">
            <h3>Tournaments</h3>
            <div class="stat-value">${data.players.reduce((acc, p) => acc + p.tournaments.length, 0)}</div>
            <p class="stat-label">Total tournaments tracked</p>
        </div>
    `;
    
    // Statistics Card
    var statsCard = document.createElement('div'); statsCard.className = 'stat-card statistics-card';
    var totalEarnings = data.players.reduce((acc, p) => acc + p.earnings, 0);
    statsCard.innerHTML = `
        <div class="stat-icon">📊</div>
        <div class="stat-content">
            <h3>Statistics</h3>
            <div class="stat-value">$${(totalEarnings / 1000).toFixed(0)}K</div>
            <p class="stat-label">Total earnings tracked</p>
        </div>
    `;
    
    // Players Card
    var playersCard = document.createElement('div'); playersCard.className = 'stat-card players-card';
    playersCard.innerHTML = `
        <div class="stat-icon">👤</div>
        <div class="stat-content">
            <h3>Players</h3>
            <div class="stat-value">${data.players.length}</div>
            <p class="stat-label">Active players</p>
        </div>
    `;
    playersCard.onclick = showPlayers;
    
    // Teams Card
    var teamsCard = document.createElement('div'); teamsCard.className = 'stat-card teams-card';
    teamsCard.innerHTML = `
        <div class="stat-icon">👥</div>
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
            <button class="action-btn" onclick="showTeams()">
                <span>👁️</span>
                <span>View All Teams</span>
            </button>
            <button class="action-btn" onclick="showPlayers()">
                <span>👁️</span>
                <span>View All Players</span>
            </button>
            <button class="action-btn" onclick="addTeam()">
                <span>➕</span>
                <span>Add New Team</span>
            </button>
            <button class="action-btn" onclick="addPlayer()">
                <span>➕</span>
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
                        <small>${p.country} • ${getTeamName(p.teamId)}</small>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    sidebar.appendChild(featuredPlayers);
    
    // News Card
    var newsCard = document.createElement('div'); newsCard.className = 'news-card';
    newsCard.innerHTML = '<h3>Latest News</h3><div id="newsList"><p class="muted">No news available.</p></div>';
    sidebar.appendChild(newsCard);
    
    mainCol.appendChild(quickActions);
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
    var s = ev.state;
    if (!s) {
        showHome(true);
        return;
    }
    switch (s.view) {
        case 'home': showHome(true); break;
        case 'teams': showTeams(true); break;
        case 'players': showPlayers(true); break;
        case 'team': showTeamDetails(s.index, true); break;
        case 'player': showPlayerDetails(s.index, true); break;
        case 'game': showGameDetails(s.index, true); break;
        default: showHome(true);
    }
});

function showTeams(skipPush) {
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
    var t = data.teams[index];
    var playersOfTeam = data.players.filter(function (p) { return p.teamId === t.id; });
    content.innerHTML = "<h2>" + t.name + "</h2>" +
        "<img src='" + (t.logo || '../assets/team.svg') + "' alt='Team Logo' style='width:100px;height:100px;object-fit:contain;margin-bottom:20px' />" +
        "<p><strong>Game:</strong> " + getGameName(t.gameId) + "</p>";

    var list = document.createElement('div');
    list.innerHTML = "<h3>Players:</h3>";
    playersOfTeam.forEach(function (p) {
        var item = document.createElement('div');
        item.innerHTML = "<strong>" + p.nickname + "</strong> — " + p.country;
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

document.getElementById("btnTeams").addEventListener("click", showTeams);
document.getElementById("btnPlayers").addEventListener("click", showPlayers);
document.getElementById("btnAddTeam").addEventListener("click", addTeam);
document.getElementById("btnAddPlayer").addEventListener("click", addPlayer);

document.getElementById("btnLogout").addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});


document.getElementById("homeLink").addEventListener("click", showHome);

showHome(true);
if (history && history.replaceState) {
    try { history.replaceState({view:'home'}, '', '#home'); } catch (e) { }
}

