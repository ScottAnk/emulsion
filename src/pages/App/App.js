import Collections from '../../components/Collections/Collections.js'
import './App.css'

function App() {
  return (
    <div className="App">
      <Collections></Collections>
      <div className="viewer">
        <img
          src="file:///home/scott/Pictures/Screenshots/testImage.png"
          alt="file preview"
        ></img>
      </div>
    </div>
  )
}

export default App
