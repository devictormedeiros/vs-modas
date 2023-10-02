import './index.scss'
import Header from './components/Header'
import ItemListContainer from './components/ItemListContainer'
function App() {
  const logotipo = 'img/logotipo.jpg';

  return (
    <>
      <Header logoCompany={logotipo}/>
      
      <main className='py-5'>
      <ItemListContainer title="Lançamentos"/>
      </main>
    </>
  )
}

export default App
