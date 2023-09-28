import './index.scss'
import Header from './components/Header'
import Counter from './components/Counter'
import ItemListContainer from './components/ItemListContainer'

function App() {


  return (
    <>
      <Header nameCompany="VS MODAS"/>
      {/* <Counter/> */}
      <main className='py-5'>
      <ItemListContainer greeting="Olá mundo"/>
      </main>
    </>
  )
}

export default App
