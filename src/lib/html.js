import { teams } from '../generate.js';
/**
 * Býr til HTML síðu með title og body
 * @param {string} title - Titill HTML síðunnar
 * @param {string} body - Body HTML síðunnar
 * @returns {string} HTML template-ið
 */
function template(title, body) {
  const html = /* html */ `
  <html>
    <head>
      <title>${title}</title>
      <link rel="stylesheet" href="./public/styles.css">
    </head>
    <body>
      ${body}
    </body>
  </html>`;

  return html;
}
//ATH ég gat ekki fyrir mitt litla líf fengið css skrána
//til að virka, því er útlitið á verkefninu ekki uppá marga fiska, því miður.

/**
 * Býr til index síðu Boltadeildarinnar
 * @returns {string} template-ið fyrir index síðuna
 */
export function indexTemplate() {
  const title = "Boltadeildin—forsíða!";
  const body = /* html */ `
  <section>
    <h1>Velkomin í Boltadeildina!</h1>
    <p>Hér finnur þú allar upplýsingar um deildina.</p>
    <p>Hér fyrir neðan getur þú smellt til að sjá seinustu leiki og stöðuna í deildinni</p>
    <ul>
      <li><a href="leikir.html">Smelltu hér til að sjá seinustu leiki</a></li>
      <li><a href="stada.html">Smelltu hér til að sjá stöðuna í deildinni</a></li>
    </ul>
  </section>`;

  return template(title, body);
}

/**
 * Býr til síðu með stöðu Boltadeildarinnar
 * @param {Object} standings - Stöðutafla Boltadeildarinnar
 * @returns {string} Template-ið fyrir stöðutöfluna
 */
export function stadaTemplate(standings) {
  const title = "Boltadeildin—staðan!";

  let standingsHtml = "<table><tr><th>Lið</th><th>Stig</th></tr>";
  for (const team in standings) {
    standingsHtml += `<tr><td>${team}</td><td>${standings[team]}</td></tr>`;
  }
  standingsHtml += "</table>";

  const body = /* html */ `
  <section>
    <h1>Staðan í deildinni!</h1>
    ${standingsHtml}
  </section>`;

  return template(title, body);
}

/**
 * Býr til síðu með leikjum Boltadeildarinnar
 * @param {Array} data - Leikir vikunanr
 * @returns {string} Template-ið fyrir leikjasíðuna
 */
export function leikirTemplate(data) {
  const title = "Boltadeildin—leikir!";
  let gamesHtml = "<table><tr><th>Heimalið</th><th>Útilið</th><th>Úrslit</th></tr>";

  for (const item of data) {
    gamesHtml += `<tr><td>${item.date}</td></tr>`;
    for (const game of item.games) {
      if (!game.home || !game.away) {
        continue;
      }
      // Make sure teams is defined somewhere in your code
      if (!teams.includes(game.home.name) || !teams.includes(game.away.name)) {
        continue;
      }

      if (
        typeof game.home.name !== "string" ||
        typeof game.away.name !== "string"
      ) {
        continue;
      }

      if (
        typeof game.home.score !== "number" ||
        typeof game.away.score !== "number"
      ) {
        continue;
      }

      if (game.home.score < 0 || game.away.score < 0) {
        continue;
      }
      gamesHtml += `<tr><td>${game.home.name}</td><td>${game.away.name}</td><td>${game.home.score}-${game.away.score}</td></tr>`;
    }
  }

  gamesHtml += "</table>";
  const body = /* html */ `
  <section>
    <h1>Leikir seinust vikna</h1>
    ${gamesHtml}
  </section>`;

  return template(title, body);
}
