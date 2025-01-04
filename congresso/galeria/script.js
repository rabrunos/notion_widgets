let modal = document.getElementById("modal");
let modalImage = document.getElementById("modal-image");
let closeButton = document.getElementById("close");
let prevButton = document.getElementById("prev");
let nextButton = document.getElementById("next");

let currentIndex = 0;
let images = [];

// Elemento do aviso
let aviso = null;
let avisoAberto = false;

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
    img.classList.add("gallery"); // Adiciona a classe à imagem
    galleryContainer.appendChild(img);
    images.push(img);
  }

  // Adicionar o comportamento de abrir a imagem no modal
  images.forEach((image, index) => {
    image.addEventListener("click", () => {
      currentIndex = index;
      modal.style.display = "flex";
      modalImage.src = image.src;

      // Exibir o aviso
      showAviso();
    });
  });
}

// Carregar a galeria desejada ao acessar o arquivo HTML
loadGallery("galeria1"); // Troque "galeria1" pelo nome da galeria desejada

// Fechar o modal
closeButton.addEventListener("click", () => {
  modal.style.display = "none";
  if (aviso) aviso.remove(); // Remove o aviso quando o modal for fechado
  resetSetas(); // Reseta a cor das setas
});

// Fechar o modal clicando fora da imagem
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
    if (aviso) aviso.remove(); // Remove o aviso ao clicar fora da imagem
    resetSetas(); // Reseta a cor das setas
  }
});

// Função para exibir o aviso
function showAviso() {
  // Verifica se o aviso já existe para evitar múltiplos avisos
  if (!aviso) {
    aviso = document.createElement("div");
    aviso.style.position = "absolute";

    // Obtém as dimensões reais da imagem sem incluir margens
    let imageRect = modalImage.getBoundingClientRect();

    aviso.style.width = `${imageRect.width}px`; // Largura exata da imagem
    aviso.style.height = `${imageRect.height}px`; // Altura exata da imagem
    aviso.style.top = `${modalImage.offsetTop}px`; // Alinha com o topo da imagem
    aviso.style.left = `${modalImage.offsetLeft}px`; // Alinha com a esquerda da imagem

    aviso.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
    aviso.style.display = "flex";
    aviso.style.flexDirection = "column"; // Organiza o texto em coluna
    aviso.style.justifyContent = "center"; // Centraliza verticalmente
    aviso.style.alignItems = "center"; // Centraliza horizontalmente
    aviso.style.color = "white";
    aviso.style.cursor = "pointer";
    aviso.style.fontFamily = "Roboto, sans-serif";
    aviso.style.fontSize = "20px";
    aviso.style.textAlign = "center"; // Garante que o texto seja centralizado
    aviso.innerText = "Clique nos cantos ou\narraste para mudar a imagem."; // O texto com a quebra de linha
    
    // Insere o aviso logo após o primeiro elemento (que é a imagem)
    let modalContent = document.querySelector(".modal-content");
    modalContent.insertBefore(aviso, modalContent.firstChild.nextSibling);


    // Muda a cor das setas
    prevButton.style.color = "rgb(255, 255, 255)";
    nextButton.style.color = "rgb(255, 255, 255)";

    avisoAberto = true;

    // Remove o aviso após 3 segundos sem interação
    setTimeout(() => {
      if (aviso) aviso.remove();
      resetSetas();
      avisoAberto = false;
    }, 4000);

    // Aguardar interação para remover o aviso
    aviso.addEventListener("click", () => {
      aviso.remove();
      resetSetas();
      avisoAberto = false;
    });

    // Adiciona a funcionalidade de arraste para trocar a imagem
    modalImage.addEventListener("touchstart", startSwipe);
    modalImage.addEventListener("touchend", endSwipe);
  }
}

// Função para resetar as setas
function resetSetas() {
  prevButton.style.color = "rgb(0, 0, 0, 0)";
  nextButton.style.color = "rgb(0, 0, 0, 0)";
}

// Função para fechar o aviso
function closeAviso() {
  if (aviso) {
    aviso.remove(); // Remove o aviso da tela
    resetSetas(); // Restaura a funcionalidade das setas
    avisoAberto = false;
  }
}

// Navegar para a imagem anterior
prevButton.addEventListener("click", () => {
  if (avisoAberto) {
    closeAviso(); // Se o aviso estiver aberto, fecha-o
  } else {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    modalImage.src = images[currentIndex].src; // Avança para a imagem anterior
  }
});

// Navegar para a próxima imagem
nextButton.addEventListener("click", () => {
  if (avisoAberto) {
    closeAviso(); // Se o aviso estiver aberto, fecha-o
  } else {
    currentIndex = (currentIndex + 1) % images.length;
    modalImage.src = images[currentIndex].src; // Avança para a próxima imagem
  }
});


// Função de swipe
let touchStartX = 0;
let touchEndX = 0;

function startSwipe(event) {
  touchStartX = event.changedTouches[0].screenX;
}

function endSwipe(event) {
  touchEndX = event.changedTouches[0].screenX;
  handleSwipe();
}

function handleSwipe() {
  if (touchStartX > touchEndX + 50) {
    // Swipe para a esquerda - próxima imagem
    nextButton.click();
  } else if (touchStartX < touchEndX - 50) {
    // Swipe para a direita - imagem anterior
    prevButton.click();
  }
}
