import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Menu, X, Sun, Moon, Search, Filter, ShoppingCart, Car, MapPin, Calendar, Info, ChevronLeft, ChevronRight, CreditCard } from 'lucide-react';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('novo');
  const [cartItems, setCartItems] = useState(0);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showUnavailableModal, setShowUnavailableModal] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const brands = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'Volkswagen', 'BMW'];
  const countries = ['Brasil', 'Argentina', 'Chile'];
  const states = ['São Paulo', 'Rio de Janeiro', 'Minas Gerais'];
  const cities = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte'];
  const models = ['Corolla', 'Civic', 'Focus', 'Onix', 'Jetta', 'X1', 'HRV', 'EcoSport'];
  
  const bannerSlides = [
    { id: 1, image: 'https://s3.amazonaws.com/speedhunters-wp-production/wp-content/uploads/2025/04/03202756/Alec-Pender-Renn-SH-20-1200x800.jpg' },
    { id: 2, image: 'https://s3.amazonaws.com/speedhunters-wp-production/wp-content/uploads/2025/02/25043850/DSC_0513-680x453.jpg' },
    { id: 3, image: 'https://s3.amazonaws.com/speedhunters-wp-production/wp-content/uploads/2025/02/27112413/Mario-Christou-P-Museum-SH-Edit-98-680x453.jpg' }
  ];


  const priceData = [
    { year: '2020', price: 45000 },
    { year: '2021', price: 48000 },
    { year: '2022', price: 52000 },
    { year: '2023', price: 55000 },
    { year: '2024', price: 58000 }
  ];

  const cars = [
    { id: 1, name: 'Toyota Corolla', price: 'R$ 85.000', image: 'https://www.autoo.com.br/fotos/2024/8/1280_960/toyota_corolla_2025_1_03082024_79723_1280_960.jpg', available: true, model: 'Corolla' },
    { id: 2, name: 'Honda Civic', price: 'R$ 92.000', image: 'https://revistacarro.com.br/wp-content/uploads/2019/11/Honda-Civic-EXL-1.jpg', available: false, model: 'Civic' },
    { id: 3, name: 'Ford Focus', price: 'R$ 78.000', image: 'https://image1.mobiauto.com.br/images/api/images/v1.0/52392437/transform/fl_progressive,f_webp,q_70,w_600', available: true, model: 'Focus' },
    { id: 4, name: 'Chevrolet Onix', price: 'R$ 65.000', image: 'https://revistacarro.com.br/wp-content/uploads/2024/05/WhatsApp-Image-2024-05-10-at-14.27.12.jpeg', available: true, model: 'Onix' },
    { id: 5, name: 'Volkswagen Jetta', price: 'R$ 95.000', image: 'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2024/11/jetta-gli-2025.jpeg?w=1200&h=1200&crop=1', available: true, model: 'Jetta' },
    { id: 6, name: 'BMW X1', price: 'R$ 180.000', image: 'https://i0.statig.com.br/bancodeimagens/11/k8/u1/11k8u13r2jmg8nrs7mbi1v98b.jpg', available: false, model: 'X1' }
  ];

  const addToCart = (car) => {
    if (car.available) {
      setCartItems(prev => prev + 1);
      showAlert('Produto adicionado ao carrinho!', 'success');
    } else {
      setShowUnavailableModal(true);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredCars = cars.filter(car => 
    (!selectedModel || car.model === selectedModel) &&
    car.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  const TooltipWrapper = ({ children, text }) => (
    <div className="relative group">
      {children}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {text}
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-40 bg-blue-600 dark:bg-blue-800 text-white p-4 shadow-lg">
          <div className="container mx-auto flex justify-between items-center">
            <button onClick={scrollToTop} className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <Car className="h-8 w-8" />
              <h1 className="text-2xl font-bold">AutoStore</h1>
            </button>
            
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="hover:text-blue-200">Início</a>
              <a href="#" className="hover:text-blue-200">Veículos</a>
              <a href="#" className="hover:text-blue-200">Serviços</a>
              <a href="#" className="hover:text-blue-200">Contato</a>
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-blue-700 hover:bg-blue-800"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              
              <div className="relative">
                <button className="p-2 rounded-lg bg-blue-700 hover:bg-blue-800 relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItems}
                    </span>
                  )}
                </button>
              </div>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 rounded-lg bg-blue-700 hover:bg-blue-800"
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden mt-4 pb-4">
              <div className="space-y-2">
                <h3 className="font-semibold mb-2">Marcas:</h3>
                {brands.map(brand => (
                  <button
                    key={brand}
                    onClick={() => {
                      setSelectedBrand(brand);
                      setMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-blue-700 rounded"
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* Alert */}
        {alert.show && (
          <div className={`fixed top-24 right-4 z-50 p-4 rounded-lg shadow-lg ${
            alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}>
            {alert.message}
          </div>
        )}

        {/* Banner Carousel */}
        <div className="relative h-64 md:h-80 overflow-hidden mt-20">
          <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {bannerSlides.map((slide) => (
              <div 
                key={slide.id} 
                className="w-full flex-shrink-0 h-64 md:h-80"
                style={{
                  backgroundImage: slide.image ? `url(${slide.image})` : 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  minHeight: '16rem'
                }}
              >
              </div>
            ))}
          </div>
          <button onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75">
            <ChevronRight className="h-6 w-6" />
          </button>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {bannerSlides.map((_, index) => (
              <button key={index} onClick={() => setCurrentSlide(index)} className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50'}`} />
            ))}
          </div>
        </div>

        {/* Main Content */}
        <main className="container mx-auto p-4">
          
          {/* Search and Filter Section */}
          <div className="mb-8 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Buscar veículos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Filter className="h-5 w-5" />
                <span>Filtros</span>
              </button>
            </div>

            {filterOpen && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                
                {/* Model Filter */}
                <TooltipWrapper text="Selecione o modelo do veículo">
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  >
                    <option value="">Modelo</option>
                    {models.map(model => (
                      <option key={model} value={model}>{model}</option>
                    ))}
                  </select>
                </TooltipWrapper>
                
                {/* Location Selectors with Tooltips */}
                <TooltipWrapper text="Selecione o país de origem do veículo">
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  >
                    <option value="">País</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </TooltipWrapper>

                <TooltipWrapper text="Selecione o estado">
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  >
                    <option value="">Estado</option>
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </TooltipWrapper>

                <TooltipWrapper text="Selecione a cidade">
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  >
                    <option value="">Cidade</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </TooltipWrapper>

                {/* Radio Buttons for Condition */}
                <TooltipWrapper text="Escolha a condição do veículo">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Condição:</label>
                    <div className="space-y-1">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="condition"
                          value="novo"
                          checked={selectedCondition === 'novo'}
                          onChange={(e) => setSelectedCondition(e.target.value)}
                          className="mr-2"
                        />
                        Novo
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="condition"
                          value="usado"
                          checked={selectedCondition === 'usado'}
                          onChange={(e) => setSelectedCondition(e.target.value)}
                          className="mr-2"
                        />
                        Usado
                      </label>
                    </div>
                  </div>
                </TooltipWrapper>
              </div>
            )}
          </div>

          {/* Cars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredCars.map(car => (
              <div key={car.id} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="mb-4 text-center">
                  {/* Utilize a tag <img> e passe o valor de car.image para o atributo src */}
                  <img 
                    src={car.image} 
                    alt={`Imagem do ${car.name}`} 
                    className="h-40 w-full object-cover rounded-lg" // Adicione classes para estilo e tamanho
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2">{car.name}</h3>
                <p className="text-xl font-bold text-blue-600 mb-4">{car.price}</p>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded text-sm ${
                    car.available 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {car.available ? 'Disponível' : 'Indisponível'}
                  </span>
                  <button
                    onClick={() => addToCart(car)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Price Timeline Chart */}
          <div className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Calendar className="mr-2" />
              Timeline de Preços - {selectedModel || selectedBrand || 'Selecione um modelo ou marca'}
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={priceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="price" stroke="#2563eb" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </main>

        {/* Unavailable Modal */}
        {showUnavailableModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold flex items-center text-red-600">
                  <X className="mr-2" />
                  Produto Indisponível
                </h3>
                <button onClick={() => setShowUnavailableModal(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Este veículo está temporariamente indisponível. Que tal dar uma olhada em nossos outros modelos disponíveis?
              </p>
              <div className="flex space-x-3">
                <button 
                  onClick={() => setShowUnavailableModal(false)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Ver Outros Carros
                </button>
                <button 
                  onClick={() => setShowUnavailableModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="bg-gray-800 text-white p-8">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">AutoStore</h3>
              <p className="text-gray-300">Sua loja de confiança para veículos novos e usados.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">Sobre Nós</a></li>
                <li><a href="#" className="hover:text-white">Financiamento</a></li>
                <li><a href="#" className="hover:text-white">Garantia</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibent mb-4">Contato</h3>
              <div className="text-gray-300 space-y-2">
                <p className="flex items-center"><MapPin className="h-4 w-4 mr-2" /> São Paulo, SP</p>
                <p className="flex items-center"><Info className="h-4 w-4 mr-2" /> (11) 9999-9999</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400">
            <p>&copy; 2024 AutoStore. Todos os direitos reservados.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;