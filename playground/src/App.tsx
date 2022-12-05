import fs from 'fs'

export const getServerSideProps = () => {
  return {
    content: fs.readFileSync('./foo.txt', 'utf-8'),
  }
}

function App() {
  return (
    <div>
      hello world
    </div>
  )
}

export default App
