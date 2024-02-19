function initGoogleSheetsApi() {
    gapi.client.init({
        apiKey: 'AIzaSyARGYc6I4c43n6WlpPU4n1Uon2_Aj0lGBk',
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function () {
        loadFeedbacksFromGoogleSheet();
    });
}

function loadFeedbacksFromGoogleSheet() {
    const spreadsheetId = '1bnIVpHL_md8u_XXo-zA3ZJGbA2J_ijj0XtlJJjOPzvk';
    const sheetName = 'alunos';  

    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: sheetName
    }).then(function (response) {
        const data = response.result.values;

        if (data.length > 0) {
            const feedbacksContainer = document.querySelector('#carouselFeedbacks .carousel-inner'); 
            feedbacksContainer.innerHTML = '';

            data.forEach(function (row, index) {
                // Ignorando o cabeçalho, se houver
                if (index === 0) return;

                const name = row[0];
                const course = row[1];
                const year = row[2];
                const comment = row[3];
                const image = row[4];

                const activeClass = index === 1 ? 'active' : '';
                
                const feedbackItem = `
                    <div class="carousel-item ${activeClass}">
                    <div class="card text-center border-0"> 
                        <img src="${image}" class="card-img-top rounded-circle mx-auto mt-3 imagem-feedback" alt="${name}">
                            <div class="card-body d-flex flex-column justify-content-center align-items-center">
                                <h5 class="card-title">${name}</h5>
                                <p class="card-text">Curso: ${course}</p>
                                <p class="card-text">Ano/Período: ${year}</p>
                                <p class="card-text">"${comment}"</p>
                            </div>
                        </div>
                    </div>
                `;
                feedbacksContainer.insertAdjacentHTML('beforeend', feedbackItem);
            });
        }
    });
}

gapi.load('client', initGoogleSheetsApi);
