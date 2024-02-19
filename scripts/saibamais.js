// Função para inicializar a API do Google Sheets
function initGoogleSheetsApi() {
  gapi.client.init({
    apiKey: 'AIzaSyARGYc6I4c43n6WlpPU4n1Uon2_Aj0lGBk',
    discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  }).then(function() {
    loadProfessoresFromGoogleSheet();
    loadBolsistasFromGoogleSheet()
  });
}
function loadProfessoresFromGoogleSheet() {
  const spreadsheetId = '1bnIVpHL_md8u_XXo-zA3ZJGbA2J_ijj0XtlJJjOPzvk'; 
  const sheetName = 'professores';
  
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: spreadsheetId,
    range: sheetName
  }).then(function(response) {
    const data = response.result.values;

    if (data.length > 0) {
      const carouselInner = document.querySelector('#carouselProfessores .carousel-inner');

      // Loop para percorrer os dados e criar os itens do carrossel
      for (let i = 0; i < data.length; i += 2) {
        const row1 = data[i];
        const row2 = data[i + 1];

        const carouselItem = document.createElement('div');
        carouselItem.className = 'carousel-item' + (i === 0 ? ' active' : '');

        
        if (row1) {
          const [nome1, area1, formacao1, imagem1] = row1;
          const [nome2, area2, formacao2, imagem2] = row2 || []; 

          const cardHtml = `
            <div class="row">
              <div class="col-md-6">
                <div class="card text-center border-0"> 
                  <img src="${imagem1}" class="card-img-top rounded-circle mx-auto mt-3" alt="${nome1}" style="max-width: 180px; max-height: 180px;">
                  <div class="card-body d-flex flex-column justify-content-center align-items-center">
                    <h5 class="card-title">${nome1}</h5>
                    <p class="card-text">Área: ${area1}</p>
                    <p class="card-text">Formação: ${formacao1}</p>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="card text-center border-0"> 
                  <img src="${imagem2}" class="card-img-top rounded-circle mx-auto mt-3" alt="${nome2}" style="max-width: 180px; max-height: 180px;">
                  <div class="card-body d-flex flex-column justify-content-center align-items-center">
                    <h5 class="card-title">${nome2}</h5>
                    <p class="card-text">Área: ${area2 || ''}</p>
                    <p class="card-text">Formação: ${formacao2 || ''}</p>
                  </div>
                </div>
              </div>
            </div>
          `;

          carouselItem.innerHTML = cardHtml;
          carouselInner.appendChild(carouselItem);
        }
      }
    }
  });
}

function loadBolsistasFromGoogleSheet() {
  const spreadsheetId = '1bnIVpHL_md8u_XXo-zA3ZJGbA2J_ijj0XtlJJjOPzvk'; 
  const sheetName = 'bolsistas';
  
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: spreadsheetId,
    range: sheetName
  }).then(function(response) {
    const data = response.result.values;

    if (data.length > 0) {
      const bolsistasContainer = document.querySelector('#bolsistasContainer');

      
      for (let i = 0; i < data.length; i += 2) {
        const row1 = data[i];
        const row2 = data[i + 1];

        const rowHtml = `
          <div class="row mt-4">
            ${createBolsistaCard(row1)}
            ${createBolsistaCard(row2)}
          </div>
        `;

        bolsistasContainer.innerHTML += rowHtml;
      }
    }
  });
}

function createBolsistaCard(dataRow) {
  if (dataRow) {
    const [nome, curso, periodo, imagem] = dataRow;

    return `
      <div class="col-md-6 mb-4">
        <div class="card border-0">
          <img src="${imagem}" class="card-img-top rounded-circle mx-auto mt-3" alt="${nome}" style="max-width: 180px; max-height: 180px;">
          <div class="card-body">
            <h5 class="card-title text-center">${nome}</h5>
            <p class="text-center">${curso}</p>
            <p class="text-center">${periodo}</p>
          </div>
        </div>
      </div>
    `;
  } else {
    return ''; 
  }
}


gapi.load('client', initGoogleSheetsApi);
