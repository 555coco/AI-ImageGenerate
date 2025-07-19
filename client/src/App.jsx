import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
import Post from "./page/Post"
import Create from "./page/Create"


function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Post />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
