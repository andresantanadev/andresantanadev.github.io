document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.querySelector('.typewriter');
    const textToType = textElement.getAttribute('data-text');
    let index = 0;
    let isDeleting = false;
    
    // Configurações de velocidade (em milissegundos)
    const typeSpeed = 150;  // Velocidade ao escrever
    const deleteSpeed = 100; // Velocidade ao apagar
    const waitTime = 2000;   // Tempo de espera antes de apagar

    function type() {
        const currentText = textElement.textContent;

        if (isDeleting) {
            // Apagando
            textElement.textContent = textToType.substring(0, index - 1);
            index--;
            if (index === 0) {
                isDeleting = false;
                setTimeout(type, 500); // Pausa pequena antes de começar a escrever de novo
                return;
            }
        } else {
            // Escrevendo
            textElement.textContent = textToType.substring(0, index + 1);
            index++;
            if (index === textToType.length) {
                isDeleting = true;
                setTimeout(type, waitTime); // Espera 2 segundos com o nome completo
                return;
            }
        }

        const speed = isDeleting ? deleteSpeed : typeSpeed;
        setTimeout(type, speed);
    }

    // Inicia a animação
    type();
});



/* --- SISTEMA DE GALERIA DE FOTOS --- */

// BANCO DE IMAGENS (Configure aqui as fotos de cada projeto)
// Você precisa colocar os nomes reais dos arquivos que estão na sua pasta
const galerias = {
    'contador': [
        'arquivos/login.jpg',          // Foto 1
        'arquivos/dashboard.jpg',  // Foto 2 (Crie ou renomeie suas fotos)
        'arquivos/inicio.jpg', // Foto 3
        'arquivos/contagem.jpg' ,
        'arquivos/cronograma.jpg' ,
        'arquivos/demanda.jpg' ,
        'arquivos/nai.jpg' ,
        'arquivos/footer.png' 
    ],
    'otto': [
        'arquivos/otto.png',
        'arquivos/23.jpg',
        'arquivos/24.jpg'
    ],
    'revista': [
        'arquivos/flowup.png',
        'arquivos/temas.png',
        'arquivos/temas2.png',
        'arquivos/postagens.png',
        'arquivos/noticias.png',
        'arquivos/avisos.png'
    ]
};

// Variáveis de Controle
let projetoAtual = '';
let indiceAtual = 0;
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const slideCounter = document.getElementById("slideCounter");

// 1. Abrir Modal ao clicar no botão
document.querySelectorAll('.open-gallery').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault(); // Impede de recarregar a página
        
        projetoAtual = this.getAttribute('data-id'); // Pega o ID (ex: 'contador')
        
        if(galerias[projetoAtual] && galerias[projetoAtual].length > 0) {
            indiceAtual = 0; // Começa na primeira foto
            atualizarImagem();
            modal.style.display = "flex"; // Mostra o modal
        } else {
            alert("A galeria deste projeto estará disponível em breve!");
        }
    });
});

// 2. Fechar Modal
document.querySelector('.close-modal').addEventListener('click', () => {
    modal.style.display = "none";
});

// Fechar ao clicar fora da imagem
window.addEventListener('click', (e) => {
    if (e.target == modal) {
        modal.style.display = "none";
    }
});

// 3. Função para Mudar Slide (Anterior/Próximo)
window.mudarSlide = function(direcao) {
    indiceAtual += direcao;
    
    // Loop infinito (se passar da última, volta pra primeira)
    if (indiceAtual >= galerias[projetoAtual].length) {
        indiceAtual = 0;
    }
    if (indiceAtual < 0) {
        indiceAtual = galerias[projetoAtual].length - 1;
    }
    
    atualizarImagem();
}

// 4. Atualiza a imagem na tela
function atualizarImagem() {
    const listaFotos = galerias[projetoAtual];
    modalImg.src = listaFotos[indiceAtual];
    slideCounter.innerText = `${indiceAtual + 1} / ${listaFotos.length}`;
}