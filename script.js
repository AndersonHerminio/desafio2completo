 const dados = {
  insurances: [
    {
      id: 3322,
      name: "Amil",
    },
    {
      id: 3293,
      name: "Bradesco",
    },
    {
      id: 99231,
      name: "Hapvida",
    },
    {
      id: 1322,
      name: "CASSI",
    },
    {
      id: 23111,
      name: "Sulamérica",
    },
  ],
  guides: [
    {
      number: "3210998321",
      start_date: "2021-04-23T19:18:47.210Z",
      patient: {
        id: 9321123,
        name: "Augusto Ferreira",
        thumb_url:
          "https://upload.wikimedia.org/wikipedia/pt/thumb/6/60/PlayerUnknown%E2%80%99s_Battlegrounds_cover.jpg/270px-PlayerUnknown%E2%80%99s_Battlegrounds_cover.jpg",
      },
      insurance_id: 1322,
      health_insurance: {
        id: 1322,
        name: "CASSI",
        is_deleted: false,
      },
      price: 5567.2,
    },
    {
      number: "287312832",
      start_date: "2021-04-23T19:18:47.210Z",
      patient: {
        id: 93229123,
        name: "Caio Carneiro",
        thumb_url:
          "http://3.bp.blogspot.com/-XG5bGlqGnJw/T9lIcssnybI/AAAAAAAADTA/B23ezXOkx8Y/s1600/Aang.jpg",
      },
      insurance_id: 1322,
      health_insurance: {
        id: 1322,
        name: "CASSI",
        is_deleted: false,
      },
      price: 213.3,
    },
    {
      number: "283718273",
      start_date: "2021-04-22T19:18:47.210Z",
      patient: {
        id: 213122388,
        name: "Luciano José",
        thumb_url: "https://i.ytimg.com/vi/yUXd-enstO8/maxresdefault.jpg",
      },
      insurance_id: 3293,
      health_insurance: {
        id: 3293,
        name: "Bradesco",
        is_deleted: true,
      },
      price: 88.99,
    },
    {
      number: "009090321938",
      start_date: "2021-04-20T19:18:47.210Z",
      patient: {
        id: 3367263,
        name: "Felício Santos",
        thumb_url:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPSxlYabmRlKk43uvsBMIqjA7Rw_YCwK4TyA&usqp=CAU",
      },
      insurance_id: 3293,
      health_insurance: {
        id: 3293,
        name: "Bradesco",
        is_deleted: true,
      },
      price: 828.99,
    },
    {
      number: "8787128731",
      start_date: "2021-04-01T19:18:47.210Z",
      patient: {
        id: 777882,
        name: "Fernando Raposo",
      },
      insurance_id: 3322,
      health_insurance: {
        id: 3322,
        name: "Amil",
        is_deleted: false,
      },
      price: 772,
    },
    {
      number: "12929321",
      start_date: "2021-04-02T19:18:47.210Z",
      patient: {
        id: 221,
        name: "Paciente com nome grande pra colocar text ellipsis testando nome com paciente grande",
      },
      insurance_id: 3322,
      health_insurance: {
        id: 3322,
        name: "Amil",
        is_deleted: false,
      },
      price: 221,
    },
  ],
};

const preencherSelect = () => {
  let html = '<option value="">Convênio</option>';

  dados.insurances.forEach((insurance) => {
    html += `<option value="${insurance.id}">${insurance.name}</option>`;
  });

  document.getElementById("select-convenio").innerHTML = html;
};

const checado = {};

const selecionarCheck = number => checado[number] = !checado[number];

            //------------------PAGINAÇÃO--INICIO------------------------//

let array = dados.guides;
let items = [];


function pagination(value) {
  let pageQuery = value;
  let page = parseInt(pageQuery) || 1;
  let limit = 2;
  let offset = (page - 1) * limit;
  let total = array.length;
  items = array.slice(offset, offset + limit);
  
  let pageSize = Math.ceil(total/limit);
  
  let _pagination = {
    page: page,
    total: total,
    limit: limit,
    pages: pageSize
  };
  
  const paginationPrint = _pagination;
  let itemPagination = '';
  
  for (let i = 0; i < paginationPrint.pages; i++) {
    let ativacao = page === (i + 1) ? 'ativacao' : '';
    itemPagination += `
    <button
    class="pagination_link ${ativacao}"
    onclick="button(${i + 1})">${i + 1}</button>`
  };
  
  document.getElementById('pagination').innerHTML = itemPagination;
};

function button(value){
  
  pagination(value);
};
pagination(1);

const preencherTabela = (guias) => {
  let html = "";

  guias.forEach((guide) => {
    const imagemPaciente =
      guide.patient.thumb_url || "https://via.placeholder.com/150x150.jpg";

    let titulo = "";
    let classeApagada = "";

    if (guide.health_insurance.is_deleted) {
      titulo = "Convênio Apagado";
      classeApagada = "item-apagado";
    }

    html += `
            <tr>
            <td><input ${checado[guide.number] ? 'checked' : 'unchecked'} onchange="selecionarCheck('${guide.number}')" type="checkbox" id="check"></td>
                <td>${new Date(guide.start_date).toLocaleDateString(
                  "pt-BR"
                )}</td>
                <td>${guide.number}</td>
                <td id="elipses">
                    <img src="${imagemPaciente}" class="rounded-circle imagem-paciente">
                    ${guide.patient.name}
                </td>
                <td class="${classeApagada}" title="${titulo}">${
      guide.health_insurance.name
    }</td>
                <td>${guide.price.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}</td>
            </tr>
        `;
  });

  if (!guias.length) {
    html +=
      '<tr><td colspan="6" class="text-center">Nenhuma guia encontrada</td></tr>';
  }

  document.getElementById("tabela-principal").innerHTML = html;
};

const inicializar = () => {
  preencherSelect();
  preencherTabela(items);
};

const filtrarTabela = () => {
  const idConvenioFiltrado = ~~document.getElementById("select-convenio").value;
  const inputFiltrado = document.getElementById("select_input").value;
  const inputNormalizado =
    inputFiltrado &&
    inputFiltrado
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const guiasFiltradas = dados.guides.filter((guide) => {
    let valido = true;
    const nomeNormalizado = guide.patient.name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    if (idConvenioFiltrado && idConvenioFiltrado !== guide.insurance_id) {
      valido = false;
    }

    if (
      inputNormalizado &&
      !nomeNormalizado.includes(inputNormalizado) &&
      !guide.number.includes(inputNormalizado)
    ) {
      valido = false;
    }
    console.log(checado, guide);

    if (checado[guide.number]) {
      valido = true
    }

    return valido;
  });

  preencherTabela(guiasFiltradas);

  // array = guiasFiltradas;
  // pagination();

  //   let pageQuery = 1;
  //   let page = parseInt(pageQuery) || 1;
  //   let limit = 2;
  //   let offset = (page - 1) * limit;
  //   items = guiasFiltradas.slice(offset, offset + limit);

};

inicializar();
