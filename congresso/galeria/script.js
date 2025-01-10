// Função para carregar as imagens e vídeos da galeria dinamicamente
async function loadGallery() {
  const galleryContainer = document.getElementById('gallery-container');
  const galleryFolder = galleryContainer.dataset.gallery; // Nome da pasta da galeria
  const galleryLimit = galleryContainer.dataset.limit;; // Limite de arquivos a serem carregados
  const imageExtensions = ['png', 'jpg', 'jpeg', 'bmp', 'gif'];
  const videoExtensions = ['mp4', 'mov', "webm"];

  // Carregar a lista de arquivos da galeria a partir do arquivo JSON correspondente
  const response = await fetch(`media/${galleryFolder}/${galleryFolder}.json`);
  const fileList = await response.json();

  // Ordenar a lista de arquivos em ordem alfabética
  fileList.sort();

  // Limitar a quantidade de arquivos conforme o limite especificado
  const filesToLoad = fileList.slice(0, galleryLimit);

  // Criar os elementos de mídia e adicioná-los ao contêiner da galeria
  filesToLoad.forEach((fileName) => {
    const fileExtension = fileName.split('.').pop().toLowerCase();
    let mediaElement;

    if (imageExtensions.includes(fileExtension)) {
      mediaElement = document.createElement('a');
      mediaElement.href = `media/${galleryFolder}/${fileName}`;
      mediaElement.classList.add('glightbox');
      const img = document.createElement('img');
      img.src = `media/${galleryFolder}/${fileName}`;
      img.alt = fileName;
      mediaElement.appendChild(img);
    } else if (videoExtensions.includes(fileExtension)) {
      mediaElement = document.createElement('a');
      mediaElement.href = `media/${galleryFolder}/${fileName}`;
      mediaElement.classList.add('glightbox');
      const video = document.createElement('video');
      video.src = `media/${galleryFolder}/${fileName}`;
      video.controls = true;
      mediaElement.appendChild(video);
    }

    if (mediaElement) {
      galleryContainer.appendChild(mediaElement);
    }
  });

  // Inicializar o GLightbox
  const lightbox = GLightbox({
    selector: '.glightbox',
    touchNavigation: true,
    loop: false,
    autoplayVideos: false,
  });
}

loadGallery(); // Carregar a galeria desejada automaticamente
