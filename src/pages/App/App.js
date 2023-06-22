import Collections from '../../components/Collections/Collections.js'
import './App.css'

function App() {
  return (
    <div className="App">
      <Collections></Collections>
      <div className="viewer">
        <img
          src={`file://${
            library.length > 0
              ? library[0].uid
              : window.env.cwd + '/public/assets/empty.png'
          }`}
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
