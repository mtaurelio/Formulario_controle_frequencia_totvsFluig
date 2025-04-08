// BOTÃO Alterar Registro, recebe um id como parametro para mostrar ou esconder um determinado elemento. s
function toggleRegistros(id) {
    var elemento = document.getElementById(id);
    elemento.style.display = elemento.style.display === "none" ? "table-row" : "none";
    // Se o elemento estiver "escondido" ele mostra. Se estiver amostra, ele esconde
  
    var button = document.querySelector('[data-child="' + id + '"] button');
    var icon = button.querySelector('.fluigicon');
  
    if (elemento.style.display === "none") {
      icon.classList.remove('fluigicon-minus');
      icon.classList.add('fluigicon-plus');
      button.innerHTML = '<span class="fluigicon fluigicon-plus"></span> Ver Registros';
    } else {
      icon.classList.remove('fluigicon-plus');
      icon.classList.add('fluigicon-minus');
      button.innerHTML = '<span class="fluigicon fluigicon-minus"></span> Ocultar Registros';
    }
    // Altera o icone do Fluig e muda o texto do botão entre Registrar/Ocultar
  }
  
  document.querySelectorAll(".horario").forEach(function (input) {
    input.addEventListener("change", function () {
      calcularTotalHoras(this.dataset.id);
    });
  });
  
  function calcularTotalHoras(id) {
    let entrada = document.querySelector('input[name="entrada' + id + '"]').value;
    let saidaAlmoco = document.querySelector('input[name="saidaAlmoco' + id + '"]').value;
    let retornoAlmoco = document.querySelector('input[name="retornoAlmoco' + id + '"]').value;
    let saida = document.querySelector('input[name="saida' + id + '"]').value;
    // pega o valor de cada campo input na tabela filho
  
    if (entrada && saidaAlmoco && retornoAlmoco && saida) {
      let inicio = new Date('1970-01-01T' + entrada + ':00');
      let almoco = new Date('1970-01-01T' + saidaAlmoco + ':00');
      let retorno = new Date('1970-01-01T' + retornoAlmoco + ':00');
      let fim = new Date('1970-01-01T' + saida + ':00');
      // pega os inputs e transforma em objetos tipo Date, usa a data acima como base e calcula a diferença entre os horários.
  
      let horasAntesAlmoco = (almoco - inicio) / (1000 * 60 * 60);
      let horasDepoisAlmoco = (fim - retorno) / (1000 * 60 * 60);
      let horasTrabalhadas = horasAntesAlmoco + horasDepoisAlmoco;
      // Calcula as horas tranabalhas antes e depois do almoço
      // Subtrai os horários em milissegundos, depois divide para converter para horas. (1000 * 60 * 60 = 1 hora em milissegundos.)
  
      document.querySelector('input[name="totalHoras' + id + '"]').value = horasTrabalhadas.toFixed(2);
    } else {
      document.querySelector('input[name="totalHoras' + id + '"]').value = "";
    }
    // pega a variavel onde está armazenado o calculo das horas trabalhas e coloca o valor no campo totalHoras
  }
  
  function duplicarLinha() {
    try {
      var tabela = document.getElementById('tabelaRegistros');
      var linhasPai = tabela.querySelectorAll('tr[data-child]');
      // pega a tabela e a linha pai onde será duplicada
  
      var ultimoId = linhasPai.length > 0 ?
        parseInt(linhasPai[linhasPai.length - 1].getAttribute('data-child').split('_')[1]) : 0;
      var novoId = ultimoId + 1;
      // Aqui ele descobre qual o último ID usado (day_0, day_1, etc.) e cria o novo ID (day_2, por exemplo).
  
      var modeloPai = linhasPai.length > 0 ? linhasPai[linhasPai.length - 1] : tabela.querySelector('tr[data-child]');
      var modeloFilho = document.getElementById(modeloPai.getAttribute('data-child'));
  
      if (!modeloPai || !modeloFilho) {
        throw new Error("Não foi possível encontrar a linha modelo.");
      }
      // Ele pega a última linha pai e a linha filho correspondente para servir como modelo de cópia. Se não encontrar, exibe erro
  
      var novaLinhaPai = modeloPai.cloneNode(true);
      novaLinhaPai.setAttribute('data-child', 'day_' + novoId);
      // Cria uma cópia da linha pai e atualiza o data-child com o novo ID.
  
      novaLinhaPai.querySelectorAll('input').forEach(function (input) {
        var name = input.getAttribute('name');
        if (name) {
          var newName = name.replace(/\d*$/, '') + novoId;
          input.setAttribute('name', newName);
        }
        input.value = '';
        // substitui os nomes de entrada1 por entrada2 e etc e limpas os valores inputs 
      });
  
      // Atualizar botão de expandir registros
      var botao = novaLinhaPai.querySelector('button');
      if (botao) {
        botao.setAttribute('onclick', 'toggleRegistros(\'day_' + novoId + '\')');
        botao.innerHTML = '<span class="fluigicon fluigicon-plus"></span> Ver Registros';
        // Muda o botão da nova linha pai para controlar a nova linha filho (day_X), e exibe o texto "Ver Registros".
      }
  
      // Criar nova linha filho
      var novaLinhaFilho = modeloFilho.cloneNode(true);
      novaLinhaFilho.id = 'day_' + novoId;
      novaLinhaFilho.style.display = 'none';
  
      novaLinhaFilho.querySelectorAll('input').forEach(function (input) {
        var name = input.getAttribute('name');
        if (name) {
          var newName = name.replace(/\d*$/, '') + novoId;
          input.setAttribute('name', newName);
        }
        input.value = '';
        if (input.classList.contains('horario')) {
          input.setAttribute('data-id', novoId);
          input.addEventListener('change', function () {
            calcularTotalHoras(this.getAttribute('data-id'));
          });
        }
        // Cria uma copia da linha filho (escondida), atualiza o data-id e chama a função de calculo de horas 
      });
  
      // Adicionar novas linhas à tabela
      tabela.querySelector('tbody').appendChild(novaLinhaPai);
      tabela.querySelector('tbody').appendChild(novaLinhaFilho);
  
    } catch (e) {
      console.error('Erro ao duplicar linha:', e);
      FLUIGC.toast({
        title: 'Erro',
        message: 'Ocorreu um erro ao adicionar novo dia',
        type: 'warning'
      });
    }
    // mensagem de erro se houver
  }
  
  function setSelectedZoomItem(selectedItem) {
    if (selectedItem.inputId === "matriculaZoom") {
      // Verifica se o campo Zoom que disparou a função é o com inputId = "matriculaZoom"
      // (ou seja, o campo onde a pessoa escolheu a matrícula de alguém).
  
      document.getElementById("nome").value = selectedItem["nome"];
      document.getElementById("departamento").value = selectedItem["departamento"];
    }
    // preenchimento automatico dos campos inputs através de um dataset com informações correspondentes 
  }
  