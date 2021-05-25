import React, { Component } from 'react';
import Titulo from '../../components/Texto/Titulo'
import ButtonSimples from '../../components/Button/Simples';
import InputSimples from '../../components/Inputs/Simples';
import CheckBox from '../../components/Inputs/Checkbox';
import Voltar from '../../components/Links/Voltar';
import AlertGeral from '../../components/Alert/Geral';
import { connect } from 'react-redux';
import * as actions from '../../actions/candidatos'
import { formatMoney } from '../../actions'

class Store extends Component {
  state = {
    nome: '',
    dt_nascimento: '',
    cpf: '',
    email: '',
    rg: '',
    telefone: '',
    cargo: '',
    funcao: '',
    graduacao: '',
    curso_graduacao: '',
    pos_graduacao: '',
    curso_pos_graduacao: '',
    mestrado: '',
    curso_mestrado: '',
    doutorado: '',
    curso_doutorado: '',
    curso_gestor: '',
    obs_curso_gestor: '',
    outros_cursos: '',
    data_entrada_inst: '',
    data_entrada_docencia: '',
    cep: '',
    rua: '',
    complemento: '',
    cidade: '',
    uf: '',
    bairro: '',
    numero: '',
    chapa: '',
    erros: {},
    aviso: null,
    numero: 0,
  }

  validate = () => {
    const { nome, dt_nascimento, cpf, email, rg, telefone, cargo,
      funcao, graduacao, curso_graduacao, pos_graduacao, curso_pos_graduacao,
      mestrado, curso_mestrado, doutorado, curso_doutorado, curso_gestor,
      obs_curso_gestor, outros_cursos, data_entrada_inst, data_entrada_docencia,
      cep, rua, complemento, cidade, uf, bairro, numero, chapa } = this.state;
    const erros = {};

    if (!nome) erros.nome = 'Preencha aqui com o nome do candidato.';
    if (!dt_nascimento) erros.dt_nascimento = 'Preencha aqui com a data de nascimento do candidato.';
    if (!cpf) erros.cpf = 'Preencha aqui com o cpf do candidato.';
    if (!email) erros.email = 'Preencha aqui com o email do candidato.';
    if (!rg) erros.rg = 'Preencha aqui com o rg do candidato.';
    if (!telefone) erros.telefone = 'Preencha aqui com o telefone do candidato.';
    if (!cargo) erros.cargo = 'Preencha aqui com o cargo do candidato.';
    if (!funcao) erros.funcao = 'Preencha aqui com o funcao do candidato.';
    if (!graduacao) erros.graduacao = 'Preencha aqui com o graduacao do candidato.';
    if (!curso_graduacao) erros.curso_graduacao = 'Preencha aqui com o curso_graduacao do candidato.';
    if (!pos_graduacao) erros.pos_graduacao = 'Preencha aqui com o pos_graduacao do candidato.';
    if (!curso_pos_graduacao) erros.curso_pos_graduacao = 'Preencha aqui com o curso_pos_graduacao do candidato.';
    if (!mestrado) erros.mestrado = 'Preencha aqui com o mestrado do candidato.';
    if (!curso_mestrado) erros.curso_mestrado = 'Preencha aqui com o curso_mestrado do candidato.';
    if (!doutorado) erros.doutorado = 'Preencha aqui com o doutorado do candidato.';
    if (!curso_doutorado) erros.curso_doutorado = 'Preencha aqui com o curso_doutorado do candidato.';
    if (!curso_gestor) erros.curso_gestor = 'Preencha aqui com o curso_gestor do candidato.';
    if (!obs_curso_gestor) erros.obs_curso_gestor = 'Preencha aqui com o obs_curso_gestor do candidato.';
    if (!outros_cursos) erros.outros_cursos = 'Preencha aqui com o outros_cursos do candidato.';
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

  salvarChapa() {
    const { usuario } = this.props;
    if (!usuario) return null;
    if (!this.validate()) return null;
    this.props.salvarChapa(this.state, usuario._id, (error) => {
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
          <ButtonSimples onClick={() => this.salvarChapa()} type='success' label='Salvar' />
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
          onChange={(ev) => this.onChangeInput('cpf', ev.target.value)} />
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
          label='Telefone:'
          value={telefone}
          error={erros.telefone}
          onChange={(ev) => this.onChangeInput('telefone', ev.target.value)} />
        <InputSimples
          name='cep'
          label='CEP:'
          value={cep}
          error={erros.cep}
          onChange={(ev) => this.onChangeInput('cep', ev.target.value)} />
        <InputSimples
          name='rua'
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
          value={cidade}
          error={erros.cidade}
          onChange={(ev) => this.onChangeInput('cidade', ev.target.value)} />
        <InputSimples
          name='uf'
          label='Estado:'
          value={uf}
          error={erros.uf}
          onChange={(ev) => this.onChangeInput('uf', ev.target.value)} />
        <InputSimples
          name='bairro'
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
  usuario: state.auth.usuario
})

export default connect(mapStateToProps, actions)(Store)
