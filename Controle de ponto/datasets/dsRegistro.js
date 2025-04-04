function defineStructure() {}

function onSync(lastSyncDate) {}

function createDataset(fields, constraints, sortFields) {
  var datasetSetor = DatasetBuilder.newDataset();

  // Definir as colunas
  datasetSetor.addColumn("matricula");
  datasetSetor.addColumn("nome");
  datasetSetor.addColumn("departamento");


  // Adicionar os setores
  datasetSetor.addRow(["100", "Matheus Aurelio", "Desenvolvimento"]);
  datasetSetor.addRow(["101", "Maria Luiza", "Desenvolvimento"]);
  datasetSetor.addRow(["102", "Ana Luiza", "Desenvolvimento"]);
  datasetSetor.addRow(["103", "Laura Maria", "Desenvolvimento"]);
  datasetSetor.addRow(["104", "Luiz Miguel", "Desenvolvimento"]);
  datasetSetor.addRow(["105", "Rubens Feliciano", "Desenvolvimento"]);
  datasetSetor.addRow(["106", "Leonardo Lima", "Desenvolvimento"]);
  datasetSetor.addRow(["107", "Jessica Lima", "Desenvolvimento"]);

  return datasetSetor;
}

function onMobileSync(user) {}