let modal = document.getElementById("modal");
let modalImage = document.getElementById("modal-image");
let closeButton = document.getElementById("close");
let prevButton = document.getElementById("prev");
let nextButton = document.getElementById("next");

let currentIndex = 0;
let images = [];

// Função para carregar as imagens da galeria
function loadGallery(galleryFolder) {
  const galleryContainer = document.getElementById("gallery-container");

  // Limpa o conteúdo da galeria
  galleryContainer.innerHTML = "";

  // Carregar as imagens da pasta especificada
  for (let i = 1; i <= 6; i++) { // Alterar 6 para o número máximo de fotos da galeria
    const img = document.createElement("img");
    img.src = `fotos/${galleryFolder}/${i}.png`; // Ajuste de caminho baseado na estrutura fornecida
    img.alt = `Foto ${i}`;
    galleryContainer.appendChild(img);
    images.push(img);
  }

  // Adicionar o comportamento de abrir a imagem no modal
  images.forEach((image, index) => {
    image.addEventListener("click", () => {
      currentIndex = index;
      modal.style.display = "flex";
      modalImage.src = image.src;
    });
  });
}

// Carregar a galeria desejada ao acessar o arquivo HTML
loadGallery("galeria1"); // Troque "galeria1" pelo nome da galeria desejada

// Fechar o modal
closeButton.addEventListener("click", () => {
  modal.style.display = "none";
});

// Fechar o modal clicando fora da imagem
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Navegar para a imagem anterior
prevButton.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  modalImage.src = images[currentIndex].src;
});

// Navegar para a próxima imagem
nextButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  modalImage.src = images[currentIndex].src;
});

// Funcionalidade de arraste para mudar de imagem (swipe)
let touchStartX = 0;
let touchEndX = 0;

modalImage.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].screenX;
});

modalImage.addEventListener("touchend", (event) => {
  touchEndX = event.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  if (touchStartX > touchEndX + 50) {
    // Swipe para a esquerda - próxima imagem
    nextImage();
  } else if (touchStartX < touchEndX - 50) {
    // Swipe para a direita - imagem anterior
    prevImage();
  }
}

// Funções para navegação de imagem
function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  modalImage.src = images[currentIndex].src;
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  modalImage.src = images[currentIndex].src;
}
