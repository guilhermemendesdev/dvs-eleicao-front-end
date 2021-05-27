import React from 'react';
import Titulo from '../../components/Texto/Titulo';
import { TextoDados } from '../../components/Texto/Dados';
import InputValor from '../../components/Inputs/InputValor';
import BlocoImagens from '../../components/Imagens/Bloco';
import Voltar from '../../components/Links/Voltar';
import moment from 'moment'
import { connect } from 'react-redux';
import * as actions from '../../actions/candidatos';
import AlertGeral from '../../components/Alert/Geral'

class DetalhesDoCandidato extends React.Component {

  generateStateCandidato = (props) => ({
    nome: props.candidato ? props.candidato.nome : '',
    fotos: props.candidato ? props.candidato.foto : "",
  })

  constructor(props) {
    super();
    this.state = {
      ...this.generateStateCandidato(props),
      aviso: null,
      erros: {}
    }
  }

  cleanAlert = () => this.setState({ aviso: null })

  componentDidUpdate(prevProps) {
    if (
      (!prevProps.candidato && this.props.candidato) ||
      (prevProps.candidato && this.props.candidato && prevProps.candidato.updatedAt !== this.props.candidato.updatedAt)
    )
      this.setState(this.generateStateCandidato(this.props))
  }

  handleSubmit = (field, value) => {
    this.setState({ [field]: value }, () => this.validate())
  }

  renderCabecalho() {
    const { nome } = this.state;
    const { candidato } = this.props.history;
    return (
      <div className='flex'>
        <div className='flex-1 flex'>
          <Titulo tipo='h1' titulo={nome} />
        </div>
      </div>
    )
  }

  onRemove = (id) => {
    const { usuario, candidato } = this.props;
    if (!usuario || !candidato) return null;
    const fotos = candidato.foto.filter((foto, index) => index !== id);
    console.log(candidato.foto)
    if (window.confirm("Você deseja realmente remover essa imagem?")) {
      this.props.removeCandidatoImagens(candidato.foto[0], candidato._id, usuario._id, (error) => {
        this.setState({
          aviso: {
            status: !error,
            msg: error ? error.message : "Foto do candidato removida com sucesso"
          }
        });
      });
    }
  }


  handleUploadFoto = (ev) => {
    const { usuario, candidato } = this.props;

    if (!usuario || !candidato) return null;

    const data = new FormData();
    data.append("file", ev.target.files[0]);

    this.props.updateCandidatoImagens(data, candidato._id, usuario._id, (error) => {
      this.setState({
        aviso: {
          status: !error,
          msg: error ? error.message : "Fotos do candidato atualizadas com sucesso"
        }
      });
    });
  }


  renderImagens() {
    const { candidato } = this.props;
    console.log(candidato)
    return (
      <div className="dados-de-imagens">
        <BlocoImagens
          imagens={(candidato ? candidato.foto : [])}
          handleSubmit={this.handleUploadFoto}
          onRemove={this.onRemove} />
      </div>
    )
  }


  renderDetalhesCadastro() {
    const { candidato, history } = this.props.history;
    return (

      <div className='flex horizontal'>
        <div style={{ width: '50%' }} className="flex-1 flex vertical">
          {this.renderImagens()}
        </div>
        <div className='Detalhes-do-Cadastro'>
          <TextoDados
            chave='Nome'
            valor={candidato ? candidato.nome : ''} />
          <TextoDados
            chave='CPF'
            valor={candidato ? candidato.cpf : ''} />
          <TextoDados
            chave='E-mail'
            valor={candidato ? candidato.email : ''} />
          <TextoDados
            chave='Telefone'
            valor={candidato ? candidato.telefone : ''} />
          <TextoDados
            chave='Data de Nascimento'
            valor={candidato ? moment(candidato.dt_nascimento).format('DD/MM/YYYY') : ''} />
          <TextoDados
            chave='RG'
            valor={candidato ? candidato.rg : ''} />
          <TextoDados
            chave='Cargo'
            valor={candidato ? candidato.cargo : ''} />
          <TextoDados
            chave='Função'
            valor={candidato ? candidato.função : ''} />
          <TextoDados
            chave='Telefone'
            valor={candidato ? candidato.telefone : ''} />
          <TextoDados
            chave='Nome da chapa'
            valor={candidato ? candidato.chapa.nome : ''} />
          <TextoDados
            chave='Número da chapa'
            valor={candidato ? candidato.chapa.numero : ''} />
        </div>
      </div>

    )
  }

  render() {
    const { history } = this.props.history;
    return (
      <div className='DetalhesDoCliente'>
        <Voltar history={history} />
        {this.renderCabecalho()}
        <AlertGeral aviso={this.state.aviso} />
        <div className='flex horizontal'>
          <div className='flex-1 flex vertical'>
            {this.renderDetalhesCadastro()}
          </div>
        </div>
      </div >
    )
  }
}

const mapStateToProps = state => ({
  usuario: state.auth.usuario,
  candidato: state.candidatos.candidato
})

export default connect(mapStateToProps, actions)(DetalhesDoCandidato)
