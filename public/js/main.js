jQuery(document).ready(function ($) {
  $("#btn-overlay-close").click(function () {
    $("#search-full-overlay").removeClass("active");
    $("body").css({ overflow: "", "padding-right": "" });
  });

  $("#menu").mmenu({
    extensions: ["pagedim-black"],
    navbars: [
      {
        position: "top",
        content: ["searchfield"]
      },
      {
        position: "bottom",
        content: [
          "<a class='fa fa-facebook-square' href='https://www.facebook.com/Secretaria-Municipal-de-Desenvolvimento-Social-de-An%C3%A1polis-119153552805998/'></a>",
          "<a class='fa fa-instagram' href='https://instagram.com/prefanapolis.social?igshid=13nnb85yk45yd'></a>",
          "<a class='fa fa-vimeo' href='https://vimeo.com/365557647'></a>"
        ]
      }
    ]
  });

  $("#owl-slider").owlCarousel({
    items: 1,
    loop: true
  });

  $("#owl-testimonials").owlCarousel({
    items: 1,
    loop: true
  });
});
//function Calcular Idade
$(document).ready(function () {
  $("#dataNasc").blur(function () {
    hoje = new Date();
    daten = $("#dataNasc").val();
    //console.log(daten);
    var arrayData = daten.split("-");
    nascimento = new Date($("#dataNasc").val());
    if (arrayData.length == 3) {
      // Decompoem a data em array
      var ano = parseInt(arrayData[0]);
      var mes = parseInt(arrayData[1]);
      var dia = parseInt(arrayData[2]);

      // Valida a data informada
      if (arrayData[2] > 31 || arrayData[1] > 12) {
        return retorno;
      }

      ano = ano.length == 2 ? (ano += 1900) : ano;
      var idade = hoje.getYear() + 1900 - ano;
      // Subtrai os meses das duas datas
      var meses = hoje.getMonth() + 1 - mes;

      // Se meses for menor que 0 entao nao cumpriu anos. Se for maior sim ja cumpriu
      idade = meses < 0 ? idade - 1 : idade;
    }
    document.getElementById("idade").value = idade;
    $("#sexo").focus();
  });
});
//Função que permite datas somente a 9 anos
$(document).ready(function () {
  $("#dataNasc").click(function () {
    var data = new Date();
    data.setDate(data.getDate() - 3285);
    $("#dataNasc").attr({
      max: data
        .toISOString()
        .substr(0, 10)
        .split("/")
        .reverse()
        .join("-")
    });
  });
});
//maskaras Frontend
$(document).ready(function () {
  $("#nosme").mask("000.000.000-00");
  $("#telefone").mask("(00) 0 0000-0000");
  $("#telcelular").mask("(00) 9 0000-0000");
  $("#contatoEmergencia").mask("(00) 0 0000-0000");
  $('#valorunit').mask('0.000,00', { reverse: true });
  $('#pesoPoduto').mask('0.000,00', { reverse: true });
  $('#qtdeminima').mask('0.000,00', { reverse: true });
  $('#estoquemask').mask('0.000,00', { reverse: true });
});


//Validações em FrontEnd
$(document).ready(function () {
  $("#confEmail").blur(function () {
    var email = $("#email1").val();
    var cEmail = $("#confEmail").val();
    if (email != cEmail) {
      $("#confEmail").css({
        "background-color": "#eb9e9e",
        color: "white"
      });
      $("#email1").css({
        "background-color": "#eb9e9e",
        color: "white"
      });
    } else {
      $("#confEmail").css({
        "background-color": "#9eeb9e",
        color: "Black"
      });
      $("#email1").css({
        "background-color": "#9eeb9e",
        color: "Black"
      });
    }
  });
});

$(document).ready(function () {
  $("#confSenha").blur(function () {
    var email = $("#senha").val();
    var cEmail = $("#confSenha").val();
    if (email != cEmail) {
      $("#confSenha").css({
        "background-color": "#eb9e9e",
        color: "white"
      });
      $("#senha").css({
        "background-color": "#eb9e9e",
        color: "white"
      });
    } else {
      $("#confSenha").css({
        "background-color": "#9eeb9e",
        color: "Black"
      });
      $("#senha").css({
        "background-color": "#9eeb9e",
        color: "Black"
      });
    }
  });
});

//validação formulário produtos
$(document).ready(function () {
  $("#nome").blur(function () {
    var nome = $("#nome").val();
    if (!nome) {
      $("#nome").css({
        "background-color": "#eb9e9e",
        color: "white"
      });
    } else {
      $("#nome").css({
        "background-color": "#f1f1f9",
        color: "Black"
      });
    }
  });
});

$(document).ready(function () {
  $("#qtde_minima").blur(function () {
    var qtde_minima = $("#qtde_minima").val();
    if (!qtde_minima) {
      $("#qtde_minima").css({
        "background-color": "#eb9e9e",
        "border-color": "#eb9e9e",
        color: "white"
      });
    } else {
      $("#qtde_minima").css({
        "background-color": "#f1f1f9",
        color: "Black"
      });
    }
  });
});

$(document).ready(function () {
  $("#peso_produto").blur(function () {
    var peso_produto = $("#peso_produto").val();
    if (!peso_produto) {
      $("#peso_produto").css({
        "background-color": "#eb9e9e",
        "border-color": "#eb9e9e",
        color: "white"
      });
    } else {
      $("#peso_produto").css({
        "background-color": "#f1f1f9",
        color: "Black"
      });
    }
  });
});

$(document).ready(function () {
  $("#qtde").blur(function () {
    var qtde = $("#qtde").val();
    if (!qtde) {
      $("#qtde").css({
        "background-color": "#eb9e9e",
        "border-color": "#eb9e9e",
        color: "white"
      });
    } else {
      $("#qtde").css({
        "background-color": "#f1f1f9",
        color: "Black"
      });
    }
  });
});

$(document).ready(function () {
  $("#valorunit").blur(function () {
    var valorunit = $("#valorunit").val();
    if (!valorunit) {
      $("#valorunit").css({
        "background-color": "#eb9e9e",
        "border-color": "#eb9e9e",
        color: "white"
      });
    } else {
      $("#valorunit").css({
        "background-color": "#f1f1f9",
        color: "Black"
      });
    }
  });
});

$(document).ready(function () {
  $("#estoque").blur(function () {
    var estoque = $("#estoque").val();
    if (!estoque) {
      $("#estoque").css({
        "background-color": "#eb9e9e",
        "border-color": "#eb9e9e",
        color: "white"
      });
    } else {
      $("#estoque").css({
        "background-color": "#f1f1f9",
        color: "Black"
      });
    }
  });
});

//validador de CPF
function CPF() {
  "user_strict";
  function r(r) {
    for (var t = null, n = 0; 9 > n; ++n)
      t += r.toString().charAt(n) * (10 - n);
    var i = t % 11;
    return i = 2 > i ? 0 : 11 - i
  }
  function t(r) {
    for (var t = null, n = 0; 10 > n; ++n)
      t += r.toString().charAt(n) * (11 - n);
    var i = t % 11;
    return i = 2 > i ? 0 : 11 - i
  }
  var n = "CPF Inválido", i = "CPF Válido";
  this.gera = function () {
    for (var n = "", i = 0; 9 > i; ++i)
      n += Math.floor(9 * Math.random()) + "";
    var o = r(n), a = n + "-" + o + t(n + "" + o);
    return a
  }, this.valida = function (o) {
    for (var a = o.replace(/\D/g, ""), u = a.substring(0, 9), f = a
      .substring(9, 11), v = 0; 10 > v; v++)
      if ("" + u + f == "" + v + v + v + v + v + v + v + v + v + v + v)
        return n;
    var c = r(u), e = t(u + "" + c);
    return f.toString() === c.toString() + e.toString() ? i : n
  }
}

var CPF = new CPF();

$(document).ready(function () {
  $("#cpfBusca").keyup(function () {
    var teste = CPF.valida($(this).val());
    $("#resposta").html(teste);
    if (teste == "CPF Válido") {
      $("#cadastrar").removeAttr("disabled");
      $("#cadastrar").addClass(" btn-primary");
      $("#resposta").removeClass("alert-danger");
      $("#resposta").addClass(" alert-success");
    } else {
      $("#cadastrar").attr("disabled", true);
      $("#resposta").addClass(" alert-danger");
    }
  });

});

// Script Para Busca do CEP
$(document).ready(function () {
  function limpa_formulário_cep() {
    // Limpa valores do formulário de cep.
    $("#rua").val("");
    $("#bairro").val("");
    $("#cidade").val("");
    $("#uf").val("");
    $("#ibge").val("");
  }

  //Quando o campo cep perde o foco.
  $("#cep").blur(function () {
    //Nova variável "cep" somente com dígitos.
    var cep = $(this)
      .val()
      .replace(/\D/g, "");

    //Verifica se campo cep possui valor informado.
    if (cep != "") {
      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if (validacep.test(cep)) {
        //Preenche os campos com "..." enquanto consulta webservice.
        $("#rua").val("...");
        $("#bairro").val("...");
        $("#cidade").val("...");
        $("#uf").val("...");

        //Consulta o webservice viacep.com.br/
        $.getJSON(
          "https://viacep.com.br/ws/" + cep + "/json/?callback=?",
          function (dados) {
            if (!("erro" in dados)) {
              //Atualiza os campos com os valores da consulta.
              if (dados.bairro == "") {
                $("#bairro").val("SEM BAIRRO");
              } else {
                $("#bairro").val(dados.bairro);
              }
              if (dados.logradouro == "") {
                $("#rua").val("");
                $("#rua").prop("readonly", false);
                $("#rua").focus();
              } else {
                $("#rua").val(dados.logradouro);
                $("#rua").prop("readonly", true);
                $("#numero").focus();
              }
              $("#cidade").val(dados.localidade);
              $("#uf").val(dados.uf);
              $("#bairro").prop("readonly", true);
              $("#cidade").prop("readonly", true);
              $("#uf").prop("readonly", true);
            } //end if.
            else {
              //CEP pesquisado não foi encontrado.
              limpa_formulário_cep();
              alert("CEP não encontrado.");
            }
          }
        );
      } //end if.
      else {
        //cep é inválido.
        limpa_formulário_cep();
        alert("Formato de CEP inválido.");
      }
    } //end if.
    else {
      //cep sem valor, limpa formulário.
      limpa_formulário_cep();
    }
  });
});

//Função para voltar ao inicio em campos com mascara

$.fn.selectRange = function (start, end) {
  if (typeof end === "undefined") {
    end = start;
  }
  return this.each(function () {
    if ("selectionStart" in this) {
      this.selectionStart = start;
      this.selectionEnd = end;
    } else if (this.setSelectionRange) {
      this.setSelectionRange(start, end);
    } else if (this.createTextRange) {
      var range = this.createTextRange();
      range.collapse(true);
      range.moveEnd("character", end);
      range.moveStart("character", start);
      range.select();
    }
  });
};

//
//	var toggle = false;
//
//	setInterval(function () {
//
//
//	    toggle = !toggle;
//	}, 2000);
function inicializar(x, y) {
  var coordenadas = { lat: x, lng: y };

  var mapa = new google.maps.Map(document.getElementById("mapa"), {
    zoom: 15,
    center: coordenadas
  });

  var marker = new google.maps.Marker({
    position: coordenadas,
    map: mapa,
    title: "LOCAL"
  });
}

function geo(a) {
  var endereco = a;
  $.ajax({
    url: endereco,
    complete: function (res) {
      var data = JSON.parse(res.responseText);
      var lat = data.results[0].geometry.location.lat;
      var lng = data.results[0].geometry.location.lng;
      inicializar(lat, lng);
    }
  });
}
