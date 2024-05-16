import './App.css'
import PostCard from './components/PostCard'
import PostForm from './components/PostForm'
import { PostContextProvider } from './context/PostContext'

function App() {

  return (
    <PostContextProvider>
      <div className="h-screen">
          <PostForm />
          <PostCard />
      </div>
    </PostContextProvider>
  )
}

export default App
