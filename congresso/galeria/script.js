let modal = document.getElementById("modal");
let modalImage = document.getElementById("modal-image");
let closeButton = document.getElementById("close");
let prevButton = document.getElementById("prev");
let nextButton = document.getElementById("next");

let currentIndex = 0;
let images = [];
let aviso = null; // Elemento do aviso

// Função para carregar as imagens da galeria dinamicamente a partir do HTML
function loadGallery() {
  const galleryContainer = document.getElementById("gallery-container");
  const galleryFolder = galleryContainer.dataset.gallery;
  const galleryLimit = galleryContainer.dataset.limit;
 
  galleryContainer.innerHTML = ""; // Limpa o conteúdo da galeria

  for (let i = 1; i <= galleryLimit; i++) { // Quantidade dinamica de fotos
    const img = document.createElement("img");
    img.src = `fotos/${galleryFolder}/${i}.png`; // Caminho dinâmico para a imagem
    img.alt = `Foto ${i}`;
    img.classList.add("gallery");
    galleryContainer.appendChild(img);
    images.push(img);
  }

  // Evento de clique para abrir o modal
  images.forEach((image, index) => {
    image.addEventListener("click", () => {
      currentIndex = index;
      modal.style.display = "flex";
      modalImage.src = image.src;
      showAviso(); // Exibe o aviso
    });
  });
}

loadGallery(); // Carregar a galeria desejada automaticamente

// Fechar o modal
closeButton.addEventListener("click", () => {
  modal.style.display = "none";
  removeAviso(); // Remove o aviso ao fechar o modal
  resetSetas(); // Reseta a cor das setas
});

// Fechar o modal clicando fora da imagem
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
    removeAviso(); // Remove o aviso ao clicar fora da imagem
    resetSetas(); // Reseta a cor das setas
  }
});

// Função para exibir o aviso
function showAviso() {
  if (!aviso) { // Evita criar múltiplos avisos
    aviso = document.createElement("div");
    aviso.style.position = "absolute";
    
    // Obtém as dimensões reais da imagem
    const imageRect = modalImage.getBoundingClientRect();
    aviso.style.width = `${imageRect.width}px`;
    aviso.style.height = `${imageRect.height}px`;
    aviso.style.top = `${modalImage.offsetTop}px`;
    aviso.style.left = `${modalImage.offsetLeft}px`;

    aviso.style.backgroundColor = "rgba(0, 0, 0, 0.45)";
    aviso.style.display = "flex";
    aviso.style.flexDirection = "column";
    aviso.style.justifyContent = "center";
    aviso.style.alignItems = "center";
    aviso.style.color = "white";
    aviso.style.cursor = "pointer";
    aviso.style.fontFamily = "Roboto, sans-serif";
    aviso.style.fontSize = "17px";
    aviso.style.textAlign = "center";
    aviso.innerText = "Clique nos cantos ou\narraste para mudar a imagem.";

    // Inserção no DOM
    let modalContent = document.querySelector(".modal-content");
    modalContent.insertBefore(aviso, modalContent.firstChild);

    // Muda a cor das setas
    prevButton.style.color = "rgb(255, 255, 255)";
    nextButton.style.color = "rgb(255, 255, 255)";

    // Remove o aviso após 4 segundos
    setTimeout(removeAviso, 4000);
    
    // Aguardar interação para remover o aviso
    aviso.addEventListener("click", removeAviso);

    // Adiciona a funcionalidade de arraste
    modalImage.addEventListener("touchstart", startSwipe);
    modalImage.addEventListener("touchend", endSwipe);
  }
}

// Função para remover o aviso e resetar as setas
function removeAviso() {
  if (aviso) {
    aviso.remove(); // Remove o aviso da tela
    resetSetas(); // Restaura a funcionalidade das setas
  }
}

// Função para resetar as setas
function resetSetas() {
  prevButton.style.color = "rgba(0, 0, 0, 0)";
  nextButton.style.color = "rgba(0, 0, 0, 0)";
}

// Navegação de imagens
function navigateImage(offset) {
  currentIndex = (currentIndex + offset + images.length) % images.length;
  modalImage.src = images[currentIndex].src;
}

// Navegar para a imagem anterior
prevButton.addEventListener("click", () => {
  if (aviso) removeAviso(); // Fecha o aviso, se aberto
  navigateImage(-1); // Navega para a imagem anterior
});

// Navegar para a próxima imagem
nextButton.addEventListener("click", () => {
  if (aviso) removeAviso(); // Fecha o aviso, se aberto
  navigateImage(1); // Navega para a próxima imagem
});

// Função de swipe (melhoria: elimina variáveis globais)
let touchStartX = 0;

function startSwipe(event) {
  touchStartX = event.changedTouches[0].screenX;
}

function endSwipe(event) {
  const touchEndX = event.changedTouches[0].screenX;
  if (touchStartX > touchEndX + 50) {
    nextButton.click(); // Swipe para a esquerda
  } else if (touchStartX < touchEndX - 50) {
    prevButton.click(); // Swipe para a direita
  }
}
