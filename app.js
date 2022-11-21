// Classe Dica
class Dica {
  constructor(titulo, linguagem, categoria, descricao, link, id) {
    this.titulo = titulo;
    this.linguagem = linguagem;
    this.categoria = categoria;
    this.descricao = descricao;
    this.link = link;
    this.id = id;
  }
}

// Verifica se todos os campos foram preenchidos corretamente
const validarCampos = () => {
  let titulo = document.querySelector("#titulo").value;
  let linguagem = document.querySelector("#linguagem").value;
  let categoria = document.querySelector("#categoria").value;
  let descricao = document.querySelector("#descricao").value;
  if (
    titulo == "" ||
    linguagem == "" ||
    categoria == "" ||
    descricao == "" ||
    titulo.length < 8 ||
    titulo.length > 64 ||
    linguagem.length < 2 ||
    linguagem.length > 16 ||
    descricao.length < 16 ||
    descricao.length > 512
  ) {
    alert("Preencha os campos corretamente!");
    return false;
  } else {
    return true;
  }
};

// Armazena as dicas no localStorage
const salvarDica = () => {
  event.preventDefault();
  if (validarCampos()) {
    // Obtém os valores digitados nos inputs
    let titulo = document.querySelector("#titulo").value;
    let linguagem = document.querySelector("#linguagem").value;
    let categoria = document.querySelector("#categoria").value;
    let descricao = document.querySelector("#descricao").value;
    let link = document.querySelector("#video").value;
    let id = new Date(Date.now()).toLocaleString().split(",")[0];

    // Instancia uma nova classe Dica
    let dica = new Dica(titulo, linguagem, categoria, descricao, link, id);
    let dicas = JSON.parse(localStorage.getItem("dicas")) || []; // Obtém os dados armazenados no localStorage
    dicas.push(dica); // Adiciona os elementos ao final do array dicas
    localStorage.setItem("dicas", JSON.stringify(dicas)); // Armazena os dados no localStorage
    alert("Dica incluída com sucesso!");
    imprimeDica();
    contador();

    // Reseta os valores dos inputs
    document.querySelector("#titulo").value = "";
    document.querySelector("#linguagem").value = "";
    document.querySelector("#categoria").value = "";
    document.querySelector("#descricao").value = "";
    document.querySelector("#video").value = "";
  }
};

// Exibe as dicas na tela em formato de cards
const imprimeDica = () => {
  let dicas = JSON.parse(localStorage.getItem("dicas")) || [];
  let cardDiv = document.querySelector("#cardDicas");
  cardDiv.innerHTML = "";
  dicas.forEach((dica) => {
    let cardAuxiliar = document.createElement("div");
    cardAuxiliar.id = "modeloCard";

    // Cria os elementos HTML
    cardAuxiliar.innerHTML = `
    <div id="tituloDica">
  <p>${dica.titulo}</p>
</div>
<div id="linguagemDica">
  <p>Linguagem/Skill: ${dica.linguagem}</p>
</div>
<div id="categoriaDica">
  <p>Categoria: ${dica.categoria}</p>
</div>
<div id="descricaoDica">
  <p>${dica.descricao}</p>
</div>
<div id="idDica">
  <p>${dica.id}</p>
</div>
<div id="botoesCard">
  <div id="divBotaoVideo">
    <button type="button" id="botaoVideo">
      <img
        id="iconeVideo"
        src="assets/video.png"
        height="30px"
        alt="iconeVideo"
      />
    </button>
  </div>
  <div id="divBotaoEditar">
    <button
      type="button"
      id="botaoEditar"
      onclick="editarDica(${dicas.indexOf(dica)})"
    >
      <img
        id="iconeEditar"
        src="assets/editar.png"
        height="30px"
        alt="iconeEditar"
      />
    </button>
  </div>
  <div id="divBotaoExcluir" onclick="deletarDica(${dicas.indexOf(dica)})">
    <button type="button" id="botaoExcluir">
      <img
        id="iconeLixeira"
        src="assets/lixeira.png"
        height="30px"
        alt="iconeLixeira"
      />
    </button>
  </div>
</div>
    `;

    // Caso o usuário tenha digitado um link do youtube, é adicionado um botão de vídeo
    if (dica.link != "") {
      cardAuxiliar.querySelector("#botaoVideo").onclick = function () {
        window.open(dica.link, "_blank");
      };
    } else if (dica.link == "") {
      cardAuxiliar.querySelector("#divBotaoVideo").remove();
    }

    cardDiv.appendChild(cardAuxiliar);
  });
};

// Permite ao usuário excluir as dicas armazendas no localStorage
const deletarDica = (id) => {
  if (confirm("Deseja realmente excluir esta dica?")) {
    let dicas = JSON.parse(localStorage.getItem("dicas")) || []; // Obtém os dados armazenados no localStorage
    dicas.splice(id, 1); // Remove o card de acordo com o índice em que ele se encontra no array
    localStorage.setItem("dicas", JSON.stringify(dicas)); // Salva os dados no localStorage
    alert("Dica excluída com sucesso!");
    location.reload(); // Recarrega a URL atual
  }
};

// Permite ao usuário editar as dicas armazenadas no localStorage
const editarDica = (id) => {
  let dicas = JSON.parse(localStorage.getItem("dicas")) || []; // Obtém os dados armazenados no localStorage
  let dica = dicas[id];

  // Preenche os inputs
  document.querySelector("#titulo").value = dica.titulo;
  document.querySelector("#linguagem").value = dica.linguagem;
  document.querySelector("#categoria").value = dica.categoria;
  document.querySelector("#descricao").value = dica.descricao;
  document.querySelector("#video").value = dica.link;
  document.querySelector("#botaoLimpar").onclick = () => {
    location.reload(); // Recarrega a URL atual
  };

  document.querySelector("#botaoSalvar").onclick = () => {
    if (validarCampos()) {
      dicas[id].titulo = document.querySelector("#titulo").value;
      dicas[id].linguagem = document.querySelector("#linguagem").value;
      dicas[id].categoria = document.querySelector("#categoria").value;
      dicas[id].descricao = document.querySelector("#descricao").value;
      dicas[id].link = document.querySelector("#video").value;
      localStorage.setItem("dicas", JSON.stringify(dicas)); // Armazena os dados no localStorage
      alert("Dica editada com sucesso!");
      location.reload();
      contador();
    }
  };
};

// Permite ao usuário pesquisar as dicas armazenadas no localStorage
const pesquisaDica = () => {
  let dicas = JSON.parse(localStorage.getItem("dicas")) || []; // Obtém os dados armazenados no localStorage
  let cardDiv = document.querySelector("#cardDicas");
  let textoPesquisa = document
    .querySelector("#inputPesquisa")
    .value.toLowerCase();
  cardDiv.innerHTML = "";
  dicas.forEach((dica) => {
    if (
      dica.titulo.toLowerCase().includes(textoPesquisa) || // Verifica termos em comum no título
      dica.categoria.toLowerCase().includes(textoPesquisa) || // Verifica termos em comum na categoria
      dica.linguagem.toLowerCase().includes(textoPesquisa) || // Verifica termos em comum na linguagem
      dica.descricao.toLowerCase().includes(textoPesquisa) || // Verifica termos em comum na descrição
      dica.id.includes(textoPesquisa) // Verifica termos em comum na id
    ) {
      let cardAuxiliar = document.createElement("div");
      cardAuxiliar.id = "modeloCard";

      // Cria os elementos HTML
      cardAuxiliar.innerHTML = `
      <div id="tituloDica">
      <p>${dica.titulo}</p>
    </div>
    <div id="linguagemDica">
      <p>Linguagem/Skill: ${dica.linguagem}</p>
    </div>
    <div id="categoriaDica">
      <p>Categoria: ${dica.categoria}</p>
    </div>
    <div id="descricaoDica">
      <p>${dica.descricao}</p>
    </div>
    <div id="idDica">
      <p>${dica.id}</p>
    </div>
    <div id="botoesCard">
      <div id="divBotaoVideo">
        <button type="button" id="botaoVideo">
          <img
            id="iconeVideo"
            src="assets/video.png"
            height="30px"
            alt="iconeVideo"
          />
        </button>
      </div>
      <div id="divBotaoEditar">
        <button
          type="button"
          id="botaoEditar"
          onclick="editarDica(${dicas.indexOf(dica)})"
        >
          <img
            id="iconeEditar"
            src="assets/editar.png"
            height="30px"
            alt="iconeEditar"
          />
        </button>
      </div>
      <div id="divBotaoExcluir" onclick="deletarDica(${dicas.indexOf(dica)})">
        <button type="button" id="botaoExcluir">
          <img
            id="iconeLixeira"
            src="assets/lixeira.png"
            height="30px"
            alt="iconeLixeira"
          />
        </button>
      </div>
    </div>
      `;

      // Caso o usuário tenha digitado um link do youtube, é adicionado um botão de vídeo
      if (dica.link != "") {
        cardAuxiliar.querySelector("#botaoVideo").onclick = function () {
          window.open(dica.link, "_blank");
        };
      } else if (dica.link == "") {
        cardAuxiliar.querySelector("#divBotaoVideo").remove();
      }
      cardDiv.appendChild(cardAuxiliar);
    }
  });
};

// Contador
const contador = () => {
  let dicas = JSON.parse(localStorage.getItem("dicas")) || []; // Obtém os dados salvos no localStorage
  let total = 0;
  let frontEnd = 0;
  let backEnd = 0;
  let fullStack = 0;
  let softSkill = 0;

  dicas.forEach((dica) => {
    total++;
    if (dica.categoria == "frontend") {
      frontEnd++;
    } else if (dica.categoria == "backend") {
      backEnd++;
    } else if (dica.categoria == "fullstack") {
      fullStack++;
    } else if (dica.categoria == "softskill") {
      softSkill++;
    }
  });

  // Atribui os valores aos contadores na página HTML
  document.querySelector("#total").innerHTML = total;
  document.querySelector("#frontEnd").innerHTML = frontEnd;
  document.querySelector("#backEnd").innerHTML = backEnd;
  document.querySelector("#fullStack").innerHTML = fullStack;
  document.querySelector("#softSkill").innerHTML = softSkill;
};

imprimeDica();
contador();
