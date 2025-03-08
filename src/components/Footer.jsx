const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} React Input Demo
          </p>
          
          <div className="mt-2 md:mt-0 flex items-center">
            <span className="text-gray-500 text-sm">Designed by WebSparks AI</span>
            <i className="bi bi-stars ml-2 text-primary"></i>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
