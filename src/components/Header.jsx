const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <i className="bi bi-input-cursor-text text-2xl text-primary mr-2"></i>
            <h1 className="text-xl font-bold text-primary">React Input Demo</h1>
          </div>
          
          <nav>
            <ul className="flex space-x-4">
              <li>
                <button className="text-gray-600 hover:text-primary transition">Home</button>
              </li>
              <li>
                <button className="text-gray-600 hover:text-primary transition">About</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
