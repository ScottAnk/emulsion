import Collections from '../../components/Collections/Collections.js'
import './App.css'

function App() {
  return (
    <div className="App">
      <Collections></Collections>
      <div className="viewer">
        <img
          src="file:///home/scott/Pictures/testImage.jpg"
          alt="file preview"
        ></img>
        <div className="viewerControls">
          <button name="previous">previous</button>
          <button name="next">next</button>
        </div>
      </div>
    </div>
  )
}

export default App
