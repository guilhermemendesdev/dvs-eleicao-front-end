import React from 'react';
import { Link } from 'react-router-dom';

const items = [
  { rota: '/alunos', icone: (<i className="fas fa-users" />), titulo: 'Alunos' },
  { rota: '/chapas', icone: (<i className="fas fa-clone" />), titulo: 'Chapas' },
  { rota: '/candidatos', icone: (<i className="fas fa-clone" />), titulo: 'Candidatos' },
  { rota: '/funcionarios', icone: (<i className="fas fa-boxes" />), titulo: 'Funcionários' },
  { rota: '/votacao', icone: (<i className="fas fa-cog" />), titulo: 'Votação' },
  { rota: '/perfil', icone: (<i className="fas fa-user" />), titulo: 'Perfil' }
]

const ListItems = ({ open, history }) => {
  const localAtual = history.location.pathname;

  return (
    (
      <div className="items-wrapper">
        {
          items.map((item, idx) => (
            <Link to={item.rota} key={idx}>
              <div className={`menu-item ${localAtual === item.rota ? 'menu-item-active' : ''} flex horizontal`}>
                <div className="flex-1 flex flex-center">
                  {item.icone}
                </div>
                {open && (
                  <div className="flex-2 flex flex-start">
                    <span>{item.titulo}</span>
                  </div>)}
              </div>
            </Link>
          ))
        }
      </div>
    )
  )
}

export default ListItems
