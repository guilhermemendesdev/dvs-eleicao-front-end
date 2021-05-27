import React, { Component } from 'react';
import Titulo from '../../components/Texto/Titulo'
import ButtonSimples from '../../components/Button/Simples';
import InputSimples from '../../components/Inputs/Simples';
import InputSelect from '../../components/Inputs/Select';
import { TextoDados } from '../../components/Texto/Dados';
import CheckBox from '../../components/Inputs/Checkbox';
import Voltar from '../../components/Links/Voltar';
import AlertGeral from '../../components/Alert/Geral';
import { connect } from 'react-redux';
import * as actionsCandidatos from '../../actions/candidatos'
import * as actionsChapas from '../../actions/chapas';
import { formatMoney } from '../../actions'
import $ from 'jquery'

class Store extends Component {
  state = {
    atual: 0,
    limit: 15,
    nome: 'Guilherme de Sousa Mendes',
    dt_nascimento: '',
    cpf: '',
    email: 'guilhermemendesousa@gmail.com',
    rg: '2906644',
    telefone: '62998509956',
    cargo: 'Professor',
    funcao: 'Professor',
    graduacao: '',
    curso_graduacao: '',
    pos_graduacao: false,
    curso_pos_graduacao: '',
    mestrado: false,
    curso_mestrado: '',
    doutorado: false,
    curso_doutorado: '',
    curso_gestor: false,
    obs_curso_gestor: '',
    outros_cursos: false,
    data_entrada_inst: '',
    data_entrada_docencia: '',
    cep: '75120300',
    rua: '10',
    complemento: 'Quadra 16 Lote 28A',
    cidade: 'Anápolis',
    uf: 'GO',
    bairro: 'Vila Góis',
    numero: '10',
    chapa: '',
    erros: {},
    aviso: null,
    numero: 0,
  }

  // state = {
  //   nome: '',
  //   dt_nascimento: '',
  //   cpf: '',
  //   email: '',
  //   rg: '',
  //   telefone: '',
  //   cargo: '',
  //   funcao: '',
  //   graduacao: '',
  //   curso_graduacao: '',
  //   pos_graduacao: '',
  //   curso_pos_graduacao: '',
  //   mestrado: '',
  //   curso_mestrado: '',
  //   doutorado: '',
  //   curso_doutorado: '',
  //   curso_gestor: '',
  //   obs_curso_gestor: '',
  //   outros_cursos: '',
  //   data_entrada_inst: '',
  //   data_entrada_docencia: '',
  //   cep: '',
  //   rua: '',
  //   complemento: '',
  //   cidade: '',
  //   uf: '',
  //   bairro: '',
  //   numero: '',
  //   chapa: '',
  //   erros: {},
  //   aviso: null,
  //   numero: 0,
  // }

  getChapas() {
    const { atual, limit } = this.state;
    const { usuario } = this.props;

    if (!usuario) return null;
    const zona = usuario._id

    this.props.getChapas(zona, atual, limit);
  }

  componentDidMount() {
    const { atual, limit } = this.state;
    const { usuario } = this.props;

    if (!usuario) return null;
    const zona = usuario._id
    this.props.getChapas(zona, atual, limit);

    const teste = (data) => {
      this.setState({
        bairro: data.bairro,
        logradouro: data.logradouro,
        cidade: data.localidade,
        uf: data.uf
      })
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
              teste(dados)
              if (!("erro" in dados)) {
                //Atualiza os campos com os valores da consulta.
                if (dados.bairro == "") {
                  $("#bairro").val("SEM BAIRRO");
                } else {
                  $("#bairro").val(dados.bairro)
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
                if (cep === '75000000') {
                  $("#rua").val("");
                  $("#bairro").val("");
                  $("#cidade").val("Anápolis");
                  $("#uf").val("GO");
                  $("#cidade").prop("readonly", true);
                  $("#uf").prop("readonly", true);
                }
              }
            }
          );
        }
      }
    })
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.usuario && this.props.usuario) this.getChapas();
  }


  mCPF = (cpf) => {
    cpf = cpf.replace(/\D/g, "")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    return cpf
  }

  ValidaCPF = () => {
    var RegraValida = this.state.cpf;
    var cpf = RegraValida.trim();

    cpf = cpf.replace(/\./g, '');
    cpf = cpf.replace('-', '');
    cpf = cpf.split('');
    var v1 = 0;
    var v2 = 0;
    var aux = false;

    for (var i = 1; cpf.length > i; i++) {
      if (cpf[i - 1] != cpf[i]) {
        aux = true;
      }
    }

    if (aux == false) {
      return false;
    }

    for (var i = 0, p = 10; (cpf.length - 2) > i; i++, p--) {
      v1 += cpf[i] * p;
    }

    v1 = ((v1 * 10) % 11);

    if (v1 == 10) {
      v1 = 0;
    }

    if (v1 != cpf[9]) {
      return false;
    }

    for (var i = 0, p = 11; (cpf.length - 1) > i; i++, p--) {
      v2 += cpf[i] * p;
    }

    v2 = ((v2 * 10) % 11);

    if (v2 == 10) {
      v2 = 0;
    }

    if (v2 != cpf[10]) {
      return false;
    } else {
      return true;
    }
  }

  validate = () => {
    const { nome, dt_nascimento, cpf, email, rg, telefone, cargo,
      funcao, graduacao, curso_graduacao, pos_graduacao, curso_pos_graduacao,
      mestrado, curso_mestrado, doutorado, curso_doutorado, curso_gestor,
      obs_curso_gestor, outros_cursos, data_entrada_inst, data_entrada_docencia,
      cep, rua, complemento, cidade, uf, bairro, numero, chapa } = this.state;
    const erros = {};
    var re = /\S+@\S+\.\S+/;

    if (!nome) erros.nome = 'Preencha aqui com o nome do candidato.';
    if (!dt_nascimento) erros.dt_nascimento = 'Preencha aqui com a data de nascimento do candidato.';
    if (!cpf) erros.cpf = 'Preencha aqui com o cpf do candidato.';
    if (!re.test(email)) erros.email = "Preencha aqui com o seu E-mail corretamente";
    if (!rg) erros.rg = 'Preencha aqui com o rg do candidato.';
    if (!telefone) erros.telefone = 'Preencha aqui com o telefone do candidato.';
    if (!cargo) erros.cargo = 'Preencha aqui com o cargo do candidato.';
    if (!funcao) erros.funcao = 'Preencha aqui com o funcao do candidato.';
    if (!graduacao) erros.graduacao = 'Preencha aqui com o graduacao do candidato.';
    if (!curso_graduacao) erros.curso_graduacao = 'Preencha aqui com o curso_graduacao do candidato.';
    if (pos_graduacao === true && !curso_pos_graduacao) erros.curso_pos_graduacao = 'Preencha aqui com o curso_pos_graduacao do candidato.';
    if (mestrado === true && !curso_mestrado) erros.curso_mestrado = 'Preencha aqui com o curso_mestrado do candidato.';
    if (doutorado === true && !curso_doutorado) erros.curso_doutorado = 'Preencha aqui com o curso_doutorado do candidato.';
    if (curso_gestor === true && !obs_curso_gestor) erros.obs_curso_gestor = 'Preencha aqui com o obs_curso_gestor do candidato.';
    //if (!outros_cursos) erros.outros_cursos = 'Preencha aqui com o outros_cursos do candidato.';
    if (!data_entrada_inst) erros.data_entrada_inst = 'Preencha aqui com o data_entrada_inst do candidato.';
    if (!data_entrada_docencia) erros.data_entrada_docencia = 'Preencha aqui com o data_entrada_docencia do candidato.';
    if (!cep) erros.cep = 'Preencha aqui com o cep do candidato.';
    if (!rua) erros.rua = 'Preencha aqui com o rua do candidato.';
    if (!complemento) erros.complemento = 'Preencha aqui com o complemento do candidato.';
    if (!cidade) erros.cidade = 'Preencha aqui com o cidade do candidato.';
    if (!uf) erros.uf = 'Preencha aqui com o uf do candidato.';
    if (!bairro) erros.bairro = 'Preencha aqui com o bairro do candidato.';
    if (!numero) erros.numero = 'Preencha aqui com o numero do candidato.';
    if (!chapa) erros.chapa = 'Preencha aqui com o chapa do candidato.';

    this.setState({ erros });
    return !(Object.keys(erros).length > 0);
  }

  salvarCandidato() {
    const { usuario } = this.props;
    if (!usuario) return null;
    if (!this.validate()) return null;
    this.props.salvarCandidatos(this.state, usuario._id, (error) => {
      this.setState({
        aviso: {
          status: !error,
          msg: error ? error.message : 'Candidato adicionado com sucesso!'
        }
      });
    });
  }

  renderCabecalho() {
    const { nome } = this.state;
    return (
      <div className='flex'>
        <div className='flex-1 flex'>
          <Titulo tipo='h1' titulo={nome || 'Novo Candidato'} />
        </div>
        <div className='flex-1 flex flex-end'>
          <ButtonSimples onClick={() => this.salvarCandidato()} type='success' label='Salvar' />
        </div>
      </div>
    )
  }

  onChangeInput = (field, value) => this.setState({ [field]: value }, () => this.validate())

  renderDados() {
    const { nome, dt_nascimento, cpf, email, rg, telefone, cargo,
      funcao, graduacao, curso_graduacao, pos_graduacao, curso_pos_graduacao,
      mestrado, curso_mestrado, doutorado, curso_doutorado, curso_gestor,
      obs_curso_gestor, outros_cursos, data_entrada_inst, data_entrada_docencia,
      cep, rua, complemento, cidade, uf, bairro, numero, chapa, erros } = this.state;
    const { chapas } = this.props;
    return (
      <div className='flex-2'>
        <InputSimples
          name='nome'
          label='Nome:'
          value={nome}
          error={erros.nome}
          onChange={(ev) => this.onChangeInput('nome', ev.target.value)} />
        <InputSimples
          name='dt_nascimento'
          label='Data de nascimento:'
          value={dt_nascimento}
          type='date'
          error={erros.dt_nascimento}
          onChange={(ev) => this.onChangeInput('dt_nascimento', ev.target.value)} />
        <InputSimples
          name='cpf'
          label='CPF:'
          value={cpf}
          error={erros.cpf}
          onChange={(ev) => this.onChangeInput('cpf', this.mCPF(ev.target.value))} />
        <InputSimples
          name='email'
          label='E-mail:'
          value={email}
          error={erros.email}
          onChange={(ev) => this.onChangeInput('email', ev.target.value)} />
        <InputSimples
          name='rg'
          label='RG:'
          value={rg}
          error={erros.rg}
          onChange={(ev) => this.onChangeInput('rg', ev.target.value)} />
        <InputSimples
          name='telefone'
          id='telefone'
          label='Telefone:'
          value={telefone}
          error={erros.telefone}
          onChange={(ev) => this.onChangeInput('telefone', ev.target.value)} />
        <InputSimples
          name='cep'
          label='CEP:'
          id='cep'
          value={cep}
          error={erros.cep}
          onChange={(ev) => this.onChangeInput('cep', ev.target.value)} />
        <InputSimples
          name='rua'
          id={'rua'}
          label='Rua:'
          value={rua}
          error={erros.rua}
          onChange={(ev) => this.onChangeInput('rua', ev.target.value)} />
        <InputSimples
          name='complemento'
          label='Complemento:'
          value={complemento}
          error={erros.complemento}
          onChange={(ev) => this.onChangeInput('complemento', ev.target.value)} />
        <InputSimples
          name='cidade'
          label='Cidade:'
          id={'cidade'}
          value={cidade}
          error={erros.cidade}
          onChange={(ev) => this.onChangeInput('cidade', ev.target.value)} />
        <InputSimples
          name='uf'
          label='Estado:'
          value={uf}
          id={'uf'}
          error={erros.uf}
          onChange={(ev) => this.onChangeInput('uf', ev.target.value)} />
        <InputSimples
          name='bairro'
          id={'bairro'}
          label='Bairro:'
          value={bairro}
          error={erros.bairro}
          onChange={(ev) => this.onChangeInput('bairro', ev.target.value)} />
        <InputSimples
          name='numero'
          label='Número:'
          value={numero}
          error={erros.numero}
          onChange={(ev) => this.onChangeInput('numero', ev.target.value)} />
        <InputSimples
          name='cargo'
          label='Cargo:'
          value={cargo}
          error={erros.cargo}
          onChange={(ev) => this.onChangeInput('cargo', ev.target.value)} />
        <InputSimples
          name='funcao'
          label='Funcao:'
          value={funcao}
          error={erros.funcao}
          onChange={(ev) => this.onChangeInput('funcao', ev.target.value)} />
        <CheckBox
          label='Possui graduação?'
          checked={graduacao}
          onChange={(ev) => this.onChangeInput('graduacao', !graduacao)}
        />
        { graduacao === true && <InputSimples
          name='curso_graduacao'
          label='Curso de graduação:'
          value={curso_graduacao}
          error={erros.curso_graduacao}
          onChange={(ev) => this.onChangeInput('curso_graduacao', ev.target.value)} />}
        <CheckBox
          label='Possui pós-graduação?'
          checked={pos_graduacao}
          onChange={(ev) => this.onChangeInput('pos_graduacao', !pos_graduacao)}
        />
        {pos_graduacao === true && <InputSimples
          name='curso_pos_graduacao'
          label='Curso de Pós graduação:'
          value={curso_pos_graduacao}
          error={erros.curso_pos_graduacao}
          onChange={(ev) => this.onChangeInput('curso_pos_graduacao', ev.target.value)} />}
        <CheckBox
          label='Possui mestrado?'
          checked={mestrado}
          onChange={(ev) => this.onChangeInput('mestrado', !mestrado)}
        />
        {mestrado === true && <InputSimples
          name='curso_mestrado'
          label='Curso de Mestrado:'
          value={curso_mestrado}
          error={erros.curso_mestrado}
          onChange={(ev) => this.onChangeInput('curso_mestrado', ev.target.value)} />}
        <CheckBox
          label='Possui doutorado?'
          checked={doutorado}
          onChange={(ev) => this.onChangeInput('doutorado', !doutorado)}
        />
        {doutorado === true && <InputSimples
          name='curso_doutorado'
          label='Curso de Doutorado:'
          value={curso_doutorado}
          error={erros.curso_doutorado}
          onChange={(ev) => this.onChangeInput('curso_doutorado', ev.target.value)} />}
        <CheckBox
          label='Possui curso de gestor?'
          checked={curso_gestor}
          onChange={(ev) => this.onChangeInput('curso_gestor', !curso_gestor)}
        />
        {curso_gestor === true && <InputSimples
          name='obs_curso_gestor'
          label='Observação curso de gestor:'
          value={obs_curso_gestor}
          error={erros.obs_curso_gestor}
          onChange={(ev) => this.onChangeInput('obs_curso_gestor', ev.target.value)} />}
        <CheckBox
          label='Possui outros cursos?'
          checked={outros_cursos}
          onChange={(ev) => this.onChangeInput('outros_cursos', !outros_cursos)}
        />
        <InputSimples
          name='data_entrada_inst'
          label='Data de entrada na Instituição:'
          value={data_entrada_inst}
          type='date'
          error={erros.data_entrada_inst}
          onChange={(ev) => this.onChangeInput('data_entrada_inst', ev.target.value)} />
        <InputSimples
          name='data_entrada_docencia'
          label='Começo da docência:'
          value={data_entrada_docencia}
          type='date'
          error={erros.data_entrada_docencia}
          onChange={(ev) => this.onChangeInput('data_entrada_docencia', ev.target.value)} />
        <TextoDados
          chave="Chapa"
          valor={(
            <InputSelect
              name="chapa"
              onChange={(ev) => this.onChangeInput("chapa", ev.target.value)}
              value={chapa}
              error={erros.chapa}
              opcoes={[
                { label: "Selecionar...", value: "" },
                ...(chapas ? chapas.docs : []).map((item) => ({ label: item.nome, value: item._id }))
              ]} />

          )} />

      </div>
    )
  }

  render() {
    return (
      <div className='Nova-Categoria full-width'>
        <div className='Card'>
          <Voltar history={this.props.history} />
          <AlertGeral aviso={this.state.aviso} />
          {this.renderCabecalho()}
          <div className='flex horizontal'>
            {this.renderDados()}
            <div className='flex-1'> </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  usuario: state.auth.usuario,
  chapas: state.chapas.chapas,
  candidatos: state.candidatos.candidatos
})

export default connect(mapStateToProps, { ...actionsChapas, ...actionsCandidatos })(Store);