// Função para verificar a existência de um arquivo no servidor
async function fileExists(url) {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.error(`Error verifying file ${url}:`, error);
    return false;
  }
}

// Função para carregar as imagens e vídeos da galeria dinamicamente
async function loadGallery() {
  const galleryContainer = document.getElementById('gallery-container');
  const galleryFolder = galleryContainer.dataset.gallery; // Nome da pasta da galeria
  const galleryLimit = galleryContainer.dataset.limit || 10; // Limite de arquivos a serem carregados
  const imageExtensions = ['png', 'jpg', 'jpeg', 'bmp', 'gif'];
  const videoExtensions = ['mp4', 'mov', 'webm'];

  // Carregar a lista de arquivos da galeria a partir do arquivo JSON correspondente
  const response = await fetch(`media/${galleryFolder}/${galleryFolder}.json`);
  const fileList = await response.json();

  // Ordenar a lista de arquivos em ordem alfabética
  fileList.sort();

  let loadedCount = 0;

  for (const fileName of fileList) {
    if (loadedCount >= galleryLimit) break;

    const fileExtension = fileName.split('.').pop().toLowerCase();
    const filePath = `media/${galleryFolder}/${fileName}`;

    if (await fileExists(filePath)) {
      let mediaElement;

      if (imageExtensions.includes(fileExtension)) {
        mediaElement = document.createElement('a');
        mediaElement.href = filePath;
        mediaElement.classList.add('glightbox');
        const img = document.createElement('img');
        img.src = filePath;
        img.alt = fileName;
        mediaElement.appendChild(img);
      } else if (videoExtensions.includes(fileExtension)) {
        mediaElement = document.createElement('a');
        mediaElement.href = filePath;
        mediaElement.classList.add('glightbox');
        const video = document.createElement('video');
        video.src = filePath;
        video.controls = true;
        mediaElement.appendChild(video);
      }

      if (mediaElement) {
        galleryContainer.appendChild(mediaElement);
        loadedCount++;
      }
    }
  }

  // Inicializar o GLightbox
  const lightbox = GLightbox({
    selector: '.glightbox',
    touchNavigation: true,
    loop: true,
    autoplayVideos: false,
  });
}

loadGallery(); // Carregar a galeria desejada automaticamente
