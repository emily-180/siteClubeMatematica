function initGoogleSheetsApi() {
    gapi.client.init({
        apiKey: 'AIzaSyARGYc6I4c43n6WlpPU4n1Uon2_Aj0lGBk',
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function () {
        loadEventosFromGoogleSheet();
    });
}

function loadEventosFromGoogleSheet() {
    const spreadsheetId = '1bnIVpHL_md8u_XXo-zA3ZJGbA2J_ijj0XtlJJjOPzvk';
    const sheetName = 'eventos';
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: sheetName
    }).then(function (response) {
        const data = response.result.values;

        if (data.length > 0) {
            const eventosContainer = document.querySelector('.eventos-container .row');
            data.forEach(function (row) {
                const nomeEvento = row[0];
                const descricaoEvento = row[1];
                const imagemEvento = row[2];

                const eventoDiv = document.createElement('div');
                eventoDiv.className = 'col-md-4';
                eventoDiv.innerHTML = `
                    <div class="card border-0">
                        <img src="${imagemEvento}" class="card-img-top evento-img" alt="${nomeEvento}">
                        <div class="card-body">
                            <h5 class="card-title text-center">${nomeEvento}</h5>
                            <p class="text-center">${descricaoEvento}</p>
                        </div>
                    </div>
                `;

                eventosContainer.appendChild(eventoDiv);
            });
        }
    });
}

gapi.load('client', initGoogleSheetsApi);
