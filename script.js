// Objeto contendo os capítulos da estória
const story = {
  inicio: {
    title: "Início da jornada",
    text: `Você se encontra em uma floresta esquisita. 
           Após olhar ao redor, percebe que existem dois caminhos. 
           Você pode seguir pelo <a href="?chapter=esquerda">caminho da esquerda</a> ou 
           pelo <a href="?chapter=direita">caminho da direita</a>.`,
    options: ["esquerda", "direita"],
  },
  esquerda: {
    title: "Caminho da Esquerda",
    text: `Você encontra uma caverna escura e está indeciso sobre o que fazer. 
           Talvez você prefira <a href="?chapter=caverna">entrar na caverna</a> porque é corajoso, 
           ou quem sabe <a href="?chapter=inicio">voltar</a> porque acha isso muito perigoso.`,
    options: ["caverna", "inicio"],
  },
  direita: {
    title: "Caminho da Direita",
    text: `Após andar um pouco, chega a um rio com correnteza forte. 
           Será que você <a href="?chapter=rio">tenta atravessar</a>, mesmo sendo arriscado, 
           ou prefere <a href="?chapter=inicio">voltar para o início</a> e pensar melhor?`,
    options: ["rio", "inicio"],
  },
  caverna: {
    title: "Caverna do Parasita",
    text: `Dentro da caverna, há um parasita esquisito, chamado <span class="destacando_nomezin">Zoidberg</span>. 
           Você pode <a href="?chapter=castelo">conversar com ele</a>, tentando descobrir algo útil, 
           ou <a href="?chapter=perdido">eliminá-lo rapidamente</a> com seu laser.`,
    options: ["castelo", "perdido"],
  },
  perdido: {
    title: "Perdido",
    text: `Você destruiu o parasita sem pensar muito e agora está perdido na caverna. 
           Meus parabéns!`,
    options: [],
  },
  castelo: {
    title: "Caminho para o Castelo",
    text: `<span class="destacando_nomezin">Zoidberg</span> te mostrou a saída da caverna e o caminho para o castelo. 
           Após seguir suas instruções, você chega ao destino, onde a princesa o espera. 
           Agora, vocês devem fugir juntos antes que o príncipe os alcance. Ele está furioso com você por ter tido um romance com a princesa`,
    options: [],
  },
  rio: {
    title: "O Rio",
    text: `Você tenta atravessar o rio, mas a correnteza é forte demais. 
           Seu sistema entra em pane, e você acorda em um lugar estranho: 
           o Hospício para Robôs.`,
    options: [],
  },
};

function loadChapter(chapterId) {
  const chapter = story[chapterId];
  if (!chapter) {
    chapterId = "inicio";
  }

  localStorage.setItem("currentChapter", chapterId);

  const container = document.getElementById("story-container");
  container.innerHTML = `
    <h2>${story[chapterId].title}</h2>
    <p>${story[chapterId].text}</p>
  `;

 // Deveria remover o progresso mas não consegui consertar bem o erro :/
  if (chapter.options.length === 0) {
    const restartButton = document.createElement("button");
    restartButton.textContent = "Reiniciar";
    restartButton.addEventListener("click", restartStory);
    container.appendChild(restartButton);
  }
}

// Função para reiniciar a história
function restartStory() {
  localStorage.removeItem("currentChapter"); 
  loadChapter("inicio");
}

window.addEventListener("load", () => {
  const params = new URLSearchParams(window.location.search);
  const chapterId = params.get("chapter") || localStorage.getItem("currentChapter") || "inicio";
  loadChapter(chapterId);
});
