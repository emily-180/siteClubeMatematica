  function initGoogleSheetsApi() {
    gapi.client.init({
      apiKey: 'AIzaSyARGYc6I4c43n6WlpPU4n1Uon2_Aj0lGBk',
      discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function() {
      loadVideoAulasFromGoogleSheet();
    });
  }

  function loadVideoAulasFromGoogleSheet() {
    const spreadsheetId = '1bnIVpHL_md8u_XXo-zA3ZJGbA2J_ijj0XtlJJjOPzvk';
    const sheetName = 'videoaulas';  
    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: sheetName,
    }).then(function(response) {
      const data = response.result.values;

      if (data.length > 0) {
        const videoAulasContainer = document.querySelector('.video-aulas .row');
        data.forEach(function(row) {
          const titulo = row[0];
          const descricao = row[1];
          const link = row[2];

          const videoCard = document.createElement('div');
          videoCard.className = 'col-md-4';
          videoCard.innerHTML = `
            <div class="video-card text-center">
              <iframe width="100%" height="200" src="${link}" frameborder="0" allowfullscreen></iframe>
              <h3>${titulo}</h3>
              <p>${descricao}</p>
              <a href="${link}" class="btn btn-warning" target="_blank">Assistir</a>
            </div>
          `;
          videoAulasContainer.appendChild(videoCard);
        });
      }
    });
  }

  gapi.load('client', initGoogleSheetsApi);

