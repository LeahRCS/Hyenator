/**
 * Hyenator — Frontend Application
 * Classificador de espécies de hienas com CNN
 */

(function () {
  'use strict';

  // ========== CONFIG ==========
  const API_URL = 'http://localhost:3000/infer';

  // ========== DOM REFS ==========
  const $ = (sel) => document.querySelector(sel);
  const themeToggle = $('#themeToggle');
  const uploadZone = $('#uploadZone');
  const fileInput = $('#fileInput');
  const previewArea = $('#previewArea');
  const previewImage = $('#previewImage');
  const previewFilename = $('#previewFilename');
  const previewFilesize = $('#previewFilesize');
  const btnClearFile = $('#btnClearFile');
  const btnClassify = $('#btnClassify');
  const loadingState = $('#loadingState');
  const resultsSection = $('#resultsSection');
  const resultClassName = $('#resultClassName');
  const resultConfidenceBar = $('#resultConfidenceBar');
  const resultConfidenceValue = $('#resultConfidenceValue');
  const resultInterpretation = $('#resultInterpretation');
  const resultThumb = $('#resultThumb');
  const rankingList = $('#rankingList');
  const btnNewPrediction = $('#btnNewPrediction');
  const errorSection = $('#errorSection');
  const errorTitle = $('#errorTitle');
  const errorMessage = $('#errorMessage');
  const btnRetry = $('#btnRetry');

  // ========== STATE ==========
  let selectedFile = null;

  // ========== THEME ==========
  function initTheme() {
    const saved = localStorage.getItem('hyenator-theme');
    if (saved) {
      document.documentElement.setAttribute('data-theme', saved);
    }
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('hyenator-theme', next);
  }

  themeToggle.addEventListener('click', toggleTheme);
  initTheme();

  // ========== HELPERS ==========
  const SPECIES = {
    'aardwolf':       { name: 'Lobo-da-terra',  sci: 'Proteles cristatus' },
    'brown_hyena':    { name: 'Hiena Marrom',   sci: 'Parahyaena brunnea' },
    'spotted_hyena':  { name: 'Hiena Malhada',  sci: 'Crocuta crocuta' },
    'striped_hyena':  { name: 'Hiena Listrada', sci: 'Hyaena hyaena' },
  };

  function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  function getSpecies(apiClass) {
    return SPECIES[apiClass] || { name: apiClass.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), sci: '' };
  }

  function getConfidenceLabel(confidence) {
    const pct = confidence * 100;
    if (pct >= 90) return 'Classificação com altíssima confiança. O modelo identificou padrões visuais fortes para esta espécie.';
    if (pct >= 70) return 'Boa confiança na classificação. Os padrões visuais são consistentes com a espécie indicada.';
    if (pct >= 50) return 'Confiança moderada. Pode haver sobreposição de características com outras espécies.';
    return 'Baixa confiança na classificação. A imagem pode ser ambígua ou de qualidade insuficiente para o modelo.';
  }

  // ========== UI STATE MANAGEMENT ==========
  function showState(state) {
    // state: 'upload' | 'preview' | 'loading' | 'results' | 'error'
    uploadZone.hidden = state !== 'upload';
    previewArea.hidden = state !== 'preview';
    loadingState.hidden = state !== 'loading';
    resultsSection.hidden = state !== 'results';
    errorSection.hidden = state !== 'error';
  }

  function resetToUpload() {
    selectedFile = null;
    fileInput.value = '';
    previewImage.src = '';
    showState('upload');
  }

  // ========== FILE HANDLING ==========
  function handleFile(file) {
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/bmp'];
    if (!allowedTypes.includes(file.type)) {
      showError('Formato inválido', 'Por favor, envie uma imagem nos formatos JPEG, PNG, WEBP ou BMP.');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      showError('Arquivo muito grande', 'O tamanho máximo permitido é de 8 MB.');
      return;
    }

    selectedFile = file;

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.src = e.target.result;
    };
    reader.readAsDataURL(file);

    previewFilename.textContent = file.name;
    previewFilesize.textContent = formatFileSize(file.size);

    showState('preview');
  }

  // Upload zone click
  uploadZone.addEventListener('click', () => fileInput.click());
  uploadZone.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fileInput.click();
    }
  });

  // File input change
  fileInput.addEventListener('change', (e) => {
    handleFile(e.target.files[0]);
  });

  // Drag and Drop
  uploadZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
    uploadZone.classList.add('upload-zone--dragover');
  });

  uploadZone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    e.stopPropagation();
    uploadZone.classList.remove('upload-zone--dragover');
  });

  uploadZone.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();
    uploadZone.classList.remove('upload-zone--dragover');
    const file = e.dataTransfer.files[0];
    handleFile(file);
  });

  // Prevent default drag on the whole document
  document.addEventListener('dragover', (e) => e.preventDefault());
  document.addEventListener('drop', (e) => e.preventDefault());

  // Clear file
  btnClearFile.addEventListener('click', resetToUpload);

  // ========== INFERENCE ==========
  async function classify() {
    if (!selectedFile) return;

    showState('loading');

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || 'Erro desconhecido retornado pelo servidor.');
      }

      showResults(data);
    } catch (err) {
      let title = 'Erro na classificação';
      let message = err.message;

      if (err instanceof TypeError && err.message.includes('fetch')) {
        title = 'Servidor indisponível';
        message = 'Não foi possível conectar ao backend em localhost:3000. Verifique se o servidor está rodando.';
      }

      showError(title, message);
    }
  }

  btnClassify.addEventListener('click', classify);

  // ========== SHOW RESULTS ==========
  function showResults(data) {
    const species = getSpecies(data.predictedClass);
    const confidence = data.confidence;

    // Main prediction
    resultClassName.innerHTML = species.name +
      (species.sci ? ' <span class="result-card__sci">' + species.sci + '</span>' : '');

    const pct = (confidence * 100).toFixed(1);
    resultConfidenceBar.style.width = pct + '%';
    resultConfidenceValue.textContent = pct + '%';

    resultInterpretation.textContent = getConfidenceLabel(confidence);

    // Thumbnail
    if (previewImage.src) {
      resultThumb.src = previewImage.src;
    }

    // Ranking
    rankingList.innerHTML = '';
    const predictions = data.topPredictions || [];

    predictions.forEach((pred, i) => {
      const li = document.createElement('li');
      li.className = 'ranking-item';

      const predSpecies = getSpecies(pred.class);
      const predPct = (pred.confidence * 100).toFixed(1);

      li.innerHTML = `
        <span class="ranking-item__position">#${i + 1}</span>
        <div class="ranking-item__info">
          <span class="ranking-item__name">${predSpecies.name}${predSpecies.sci ? ' <span class="ranking-item__sci">' + predSpecies.sci + '</span>' : ''}</span>
          <div class="ranking-item__bar">
            <div class="ranking-item__bar-fill" style="width: 0%"></div>
          </div>
        </div>
        <span class="ranking-item__value">${predPct}%</span>
      `;

      rankingList.appendChild(li);

      // Animate bar fill
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          li.querySelector('.ranking-item__bar-fill').style.width = predPct + '%';
        });
      });
    });

    // Animate main confidence bar
    resultConfidenceBar.style.width = '0%';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        resultConfidenceBar.style.width = pct + '%';
      });
    });

    showState('results');

    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ========== SHOW ERROR ==========
  function showError(title, message) {
    errorTitle.textContent = title;
    errorMessage.textContent = message;
    showState('error');
  }

  // ========== NEW PREDICTION / RETRY ==========
  btnNewPrediction.addEventListener('click', resetToUpload);
  btnRetry.addEventListener('click', () => {
    if (selectedFile) {
      showState('preview');
    } else {
      resetToUpload();
    }
  });

  // ========== GUIDED TOUR (Driver.js) ==========
  const tourPrompt = $('#tourPrompt');
  const btnStartTour = $('#btnStartTour');
  const btnCloseTourPrompt = $('#btnCloseTourPrompt');
  const btnShowTourPrompt = $('#btnShowTourPrompt');
  const tourPromptText = tourPrompt ? tourPrompt.querySelector('p') : null;

  if (tourPrompt && btnStartTour && btnCloseTourPrompt) {
    if (!localStorage.getItem('hyenator-tour-seen')) {
      if (tourPromptText) tourPromptText.textContent = "Primeira vez aqui? Clique abaixo para um modo guiado.";
      tourPrompt.classList.remove('hidden');
    } else {
      tourPrompt.classList.add('hidden');
    }

    if (btnShowTourPrompt) {
      btnShowTourPrompt.addEventListener('click', () => {
        if (tourPromptText) tourPromptText.textContent = "Gostaria de um tour guiado pela aplicação?";
        tourPrompt.classList.remove('hidden');
      });
    }

    btnCloseTourPrompt.addEventListener('click', () => {
      tourPrompt.classList.add('hidden');
      localStorage.setItem('hyenator-tour-seen', 'true');
    });

    btnStartTour.addEventListener('click', () => {
      tourPrompt.classList.add('hidden');
      localStorage.setItem('hyenator-tour-seen', 'true');

      const driverObj = window.driver.js.driver({
        showProgress: true,
        animate: true,
        nextBtnText: 'Próximo',
        prevBtnText: 'Anterior',
        doneBtnText: 'Concluir',
        steps: [
          {
            element: '.header__title-group',
            popover: {
              title: 'Bem-vindo ao Hyenator!',
              description: 'Esta é uma aplicação que usa Redes Neurais Convolucionais para identificar qual espécie de hiena está na foto.',
              side: 'bottom',
              align: 'center'
            }
          },
          {
            element: '#themeToggle',
            popover: {
              title: 'Aparência',
              description: 'Aqui você pode alternar entre o modo claro e o modo escuro.',
              side: 'bottom',
              align: 'end'
            }
          },
          {
            element: '#heroSection',
            popover: {
              title: 'Espécies Suportadas',
              description: 'O modelo identifica estas quatro espécies. Preste atenção aos detalhes!',
              side: 'bottom',
              align: 'center'
            }
          },
          {
            element: '#uploadCard',
            popover: {
              title: 'Área de Envio',
              description: 'Clique ou arraste a foto de uma hiena aqui. Formatos aceitos: JPEG, PNG, WEBP e BMP.',
              side: 'top',
              align: 'center'
            }
          },
          {
            element: '#infoSection',
            popover: {
              title: 'Como funciona?',
              description: 'Após enviar a imagem, a nossa Inteligência Artificial vai analisar e mostrar os resultados com a probabilidade de cada espécie.',
              side: 'top',
              align: 'center'
            }
          },
          {
            element: '#btnShowTourPrompt',
            popover: {
              title: 'Reveja quando quiser!',
              description: 'Se você não prestou atenção a algum dos passos ou gostaria de rever o guia, basta clicar neste botão a qualquer momento.',
              side: 'bottom',
              align: 'end'
            }
          }
        ]
      });

      if (selectedFile) resetToUpload();
      
      driverObj.drive();
    });
  }

  // ========== INIT ==========
  showState('upload');
})();
