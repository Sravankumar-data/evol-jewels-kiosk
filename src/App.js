import React, { useState, useRef } from 'react';
import { Camera, Heart, Share2, QrCode, ChevronRight, ChevronLeft, Star, TrendingUp, Users, ShoppingBag, Sparkles } from 'lucide-react';

const EvolJewelsKiosk = () => {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [userName, setUserName] = useState('');
  const [surveyAnswers, setSurveyAnswers] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedJewelry, setSelectedJewelry] = useState(null);
  const [cart, setCart] = useState([]);
  const [config, setConfig] = useState({ metal: 'Gold', stone: 'Diamond', size: '7' });
  const [cameraStream, setCameraStream] = useState(null);
  const videoRef = useRef(null);

  const surveyQuestions = [
    { id: 1, optionA: 'Bold', imgA: '💎', optionB: 'Minimal', imgB: '✨' },
    { id: 2, optionA: 'Classic', imgA: '👑', optionB: 'Modern', imgB: '🔷' },
    { id: 3, optionA: 'Colorful', imgA: '🌈', optionB: 'Monochrome', imgB: '⚪' }
  ];

  const celebrities = [
    { name: 'Priyanka Chopra', style: 'Bold & Glamorous', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop' },
    { name: 'Deepika Padukone', style: 'Elegant & Classic', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop' },
    { name: 'Alia Bhatt', style: 'Modern & Minimal', img: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=400&fit=crop' }
  ];

  const jewelry = [
    { id: 1, name: 'Diamond Solitaire Ring', price: 45000, category: 'Ring', tags: ['Classic', 'Minimal'], img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop' },
    { id: 2, name: 'Emerald Necklace Set', price: 89000, category: 'Necklace', tags: ['Bold', 'Colorful'], img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop' },
    { id: 3, name: 'Gold Bangles', price: 35000, category: 'Bangles', tags: ['Classic', 'Gold'], img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop' },
    { id: 4, name: 'Pearl Earrings', price: 25000, category: 'Earrings', tags: ['Minimal', 'Elegant'], img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop' },
    { id: 5, name: 'Ruby Pendant', price: 55000, category: 'Pendant', tags: ['Bold', 'Colorful'], img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop' },
    { id: 6, name: 'Platinum Chain', price: 65000, category: 'Chain', tags: ['Modern', 'Minimal'], img: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=400&h=400&fit=crop' }
  ];

  const handleSurveyAnswer = (answer) => {
    setSurveyAnswers([...surveyAnswers, answer]);
    if (surveyAnswers.length >= 2) {
      setCurrentScreen('celebrity-match');
    }
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const addToCart = (item) => {
    setCart([...cart, { ...item, config: {...config} }]);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: 1920, height: 1080 } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraStream(stream);
    } catch (err) {
      console.log('Camera not available:', err);
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
  };

  const WelcomeScreen = () => (
    <div className="h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-pink-600 flex flex-col items-center justify-center p-12 text-white">
      <div className="text-center space-y-8 max-w-2xl">
        <Sparkles className="w-32 h-32 mx-auto animate-pulse" />
        <h1 className="text-7xl font-bold tracking-tight">Evol Jewels</h1>
        <p className="text-3xl font-light">Discover Your Perfect Style with AR Technology</p>
        <div className="pt-8 space-y-6">
          <button 
            onClick={() => setCurrentScreen('photo-capture')}
            className="bg-white text-purple-900 px-16 py-6 rounded-full text-3xl font-semibold hover:bg-purple-100 transition-all shadow-2xl hover:scale-105"
          >
            Start Your Journey
          </button>
          <p className="text-xl opacity-80">Touch anywhere to begin</p>
        </div>
      </div>
    </div>
  );

  const TryOnScreen = () => {
    React.useEffect(() => {
      startCamera();
      return () => stopCamera();
    }, []);

    return (
      <div className="h-screen bg-gray-900 flex flex-col">
        <div className="flex-1 flex items-center justify-center relative">
          <div className="w-full h-full bg-gray-800 flex items-center justify-center overflow-hidden">
            {cameraStream ? (
              <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
            ) : (
              <Camera className="w-64 h-64 text-gray-600" />
            )}
          </div>
          <div className="absolute inset-0 border-8 border-purple-500 rounded-lg m-12 pointer-events-none" />
        </div>
        <div className="bg-gray-800 p-12 text-white space-y-6">
          <p className="text-2xl text-center">Position yourself in the frame</p>
          <button 
            onClick={() => { stopCamera(); setCurrentScreen('survey'); }}
            className="w-full bg-purple-600 py-6 rounded-full text-2xl font-semibold hover:bg-purple-700 transition-all"
          >
            📸 Capture Photo
          </button>
          <p className="text-center text-gray-400 text-lg">By continuing, you consent to photo capture for style matching</p>
        </div>
      </div>
    );
  };

  const SurveyScreen = () => {
    const currentQ = surveyQuestions[surveyAnswers.length] || surveyQuestions[0];
    return (
      <div className="h-screen bg-gradient-to-b from-purple-50 to-pink-50 p-12 flex flex-col">
        <h2 className="text-5xl font-bold text-center mb-8 text-purple-900">What's Your Style?</h2>
        <p className="text-2xl text-center mb-12 text-gray-700">Question {surveyAnswers.length + 1} of 3</p>
        <div className="flex-1 grid grid-cols-2 gap-12">
          <button 
            onClick={() => handleSurveyAnswer(currentQ.optionA)}
            className="bg-white rounded-3xl shadow-2xl hover:shadow-purple-400 transition-all hover:scale-105 flex flex-col items-center justify-center space-y-8 border-4 border-transparent hover:border-purple-500"
          >
            <div className="text-9xl">{currentQ.imgA}</div>
            <p className="text-4xl font-bold text-gray-800">{currentQ.optionA}</p>
          </button>
          <button 
            onClick={() => handleSurveyAnswer(currentQ.optionB)}
            className="bg-white rounded-3xl shadow-2xl hover:shadow-pink-400 transition-all hover:scale-105 flex flex-col items-center justify-center space-y-8 border-4 border-transparent hover:border-pink-500"
          >
            <div className="text-9xl">{currentQ.imgB}</div>
            <p className="text-4xl font-bold text-gray-800">{currentQ.optionB}</p>
          </button>
        </div>
      </div>
    );
  };

  const CelebrityMatchScreen = () => {
    const matchedCeleb = celebrities[Math.floor(Math.random() * celebrities.length)];
    return (
      <div className="h-screen bg-gradient-to-br from-pink-100 to-purple-100 flex flex-col items-center justify-center p-12">
        <div className="bg-white rounded-3xl shadow-2xl p-16 max-w-3xl text-center space-y-8">
          <Star className="w-32 h-32 mx-auto text-yellow-500" />
          <h2 className="text-5xl font-bold text-purple-900">Your Style Match!</h2>
          <div className="w-64 h-64 mx-auto rounded-full overflow-hidden border-8 border-purple-300">
            <img src={matchedCeleb.img} alt={matchedCeleb.name} className="w-full h-full object-cover" />
          </div>
          <h3 className="text-4xl font-bold text-gray-800">{matchedCeleb.name}</h3>
          <p className="text-3xl text-gray-600">{matchedCeleb.style}</p>
          <button 
            onClick={() => setCurrentScreen('jewelry-feed')}
            className="bg-purple-600 text-white px-16 py-6 rounded-full text-2xl font-semibold hover:bg-purple-700 transition-all mt-8"
          >
            Explore Collections <ChevronRight className="inline ml-2" />
          </button>
        </div>
      </div>
    );
  };

  const JewelryFeedScreen = () => (
    <div className="h-screen bg-gray-50 flex flex-col">
      <div className="bg-purple-900 text-white p-8 flex justify-between items-center">
        <h2 className="text-4xl font-bold">Curated For You</h2>
        <div className="flex gap-4">
          <button className="bg-purple-700 px-6 py-3 rounded-full text-xl">Rings</button>
          <button className="bg-purple-700 px-6 py-3 rounded-full text-xl">Necklaces</button>
          <button className="bg-purple-700 px-6 py-3 rounded-full text-xl">Earrings</button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-8">
        <div className="grid grid-cols-3 gap-8">
          {jewelry.map(item => (
            <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all">
              <div className="h-64 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center overflow-hidden">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold text-gray-800">{item.name}</h3>
                <p className="text-3xl font-bold text-purple-600">₹{item.price.toLocaleString()}</p>
                <div className="flex gap-2 flex-wrap">
                  {item.tags.map(tag => (
                    <span key={tag} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">{tag}</span>
                  ))}
                </div>
                <div className="flex gap-3 mt-4">
                  <button 
                    onClick={() => { setSelectedJewelry(item); setCurrentScreen('try-on'); }}
                    className="flex-1 bg-purple-600 text-white py-3 rounded-lg text-lg hover:bg-purple-700"
                  >
                    Try in AR
                  </button>
                  <button 
                    onClick={() => toggleFavorite(item.id)}
                    className={`p-3 rounded-lg border-2 ${favorites.includes(item.id) ? 'bg-pink-500 border-pink-500 text-white' : 'border-gray-300 text-gray-600'}`}
                  >
                    <Heart className="w-6 h-6" fill={favorites.includes(item.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white p-6 border-t flex justify-between">
        <button onClick={() => setCurrentScreen('welcome')} className="bg-gray-200 px-8 py-4 rounded-lg text-xl">
          <ChevronLeft className="inline mr-2" /> Back
        </button>
        <button onClick={() => setCurrentScreen('dashboard')} className="bg-purple-600 text-white px-8 py-4 rounded-lg text-xl">
          B2B Dashboard
        </button>
      </div>
    </div>
  );

  const TryOnScreen = () => {
    React.useEffect(() => {
      startCamera();
      return () => stopCamera();
    }, []);

    return (
      <div className="h-screen bg-gray-900 flex flex-col">
        <div className="bg-purple-900 text-white p-8 flex justify-between items-center">
          <h2 className="text-4xl font-bold">Virtual Try-On</h2>
          <button onClick={() => { stopCamera(); setCurrentScreen('jewelry-feed'); }} className="bg-purple-700 px-6 py-3 rounded-lg text-xl">
            <ChevronLeft className="inline mr-2" /> Back to Feed
          </button>
        </div>
        <div className="flex-1 flex">
          <div className="flex-1 bg-gray-800 flex items-center justify-center relative overflow-hidden">
            {cameraStream ? (
              <>
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <img src={selectedJewelry?.img} alt="AR Overlay" className="w-64 h-64 object-contain opacity-80 animate-pulse" />
                </div>
              </>
            ) : (
              <>
                <Camera className="w-96 h-96 text-gray-600" />
                <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2">
                  <img src={selectedJewelry?.img} alt="Jewelry" className="w-48 h-48 object-contain" />
                </div>
              </>
            )}
            <div className="absolute top-8 left-8 bg-black bg-opacity-75 text-white p-4 rounded-lg">
              <p className="text-xl">AR Preview Active</p>
            </div>
          </div>
          <div className="w-1/3 bg-white p-8 space-y-6">
            <div className="space-y-4">
              <h3 className="text-3xl font-bold">{selectedJewelry?.name}</h3>
              <p className="text-4xl font-bold text-purple-600">₹{selectedJewelry?.price.toLocaleString()}</p>
            </div>
            <div className="space-y-4">
              <button 
                onClick={() => setCurrentScreen('configurator')}
                className="w-full bg-purple-600 text-white py-4 rounded-lg text-xl hover:bg-purple-700"
              >
                Customize Design
              </button>
              <button 
                onClick={() => setCurrentScreen('wardrobe')}
                className="w-full bg-pink-600 text-white py-4 rounded-lg text-xl hover:bg-pink-700"
              >
                Match with Wardrobe
              </button>
              <button 
                onClick={() => { addToCart(selectedJewelry); setCurrentScreen('checkout'); }}
                className="w-full bg-green-600 text-white py-4 rounded-lg text-xl hover:bg-green-700"
              >
                Add to Cart
              </button>
            </div>
            <div className="pt-6 space-y-4">
              <button className="w-full border-2 border-purple-600 text-purple-600 py-4 rounded-lg text-xl hover:bg-purple-50">
                <Share2 className="inline mr-2" /> Share
              </button>
              <button className="w-full border-2 border-gray-300 text-gray-700 py-4 rounded-lg text-xl hover:bg-gray-50">
                <QrCode className="inline mr-2" /> Save to Phone
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ConfiguratorScreen = () => (
    <div className="h-screen bg-gray-50 flex flex-col">
      <div className="bg-purple-900 text-white p-8 flex justify-between items-center">
        <h2 className="text-4xl font-bold">Customize Your Jewelry</h2>
        <button onClick={() => setCurrentScreen('try-on')} className="bg-purple-700 px-6 py-3 rounded-lg text-xl">
          <ChevronLeft className="inline mr-2" /> Back
        </button>
      </div>
      <div className="flex-1 flex">
        <div className="flex-1 bg-white flex items-center justify-center">
          <img src={selectedJewelry?.img} alt={selectedJewelry?.name} className="max-w-lg max-h-96 object-contain" />
        </div>
        <div className="w-1/3 bg-gray-100 p-8 space-y-8">
          <div>
            <label className="text-2xl font-bold block mb-4">Metal Type</label>
            <div className="grid grid-cols-2 gap-4">
              {['Gold', 'Platinum', 'Rose Gold', 'Silver'].map(metal => (
                <button 
                  key={metal}
                  onClick={() => setConfig({...config, metal})}
                  className={`py-4 rounded-lg text-xl ${config.metal === metal ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 border-2'}`}
                >
                  {metal}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-2xl font-bold block mb-4">Stone</label>
            <div className="grid grid-cols-2 gap-4">
              {['Diamond', 'Ruby', 'Emerald', 'Sapphire'].map(stone => (
                <button 
                  key={stone}
                  onClick={() => setConfig({...config, stone})}
                  className={`py-4 rounded-lg text-xl ${config.stone === stone ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 border-2'}`}
                >
                  {stone}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-2xl font-bold block mb-4">Size: {config.size}</label>
            <input 
              type="range" 
              min="5" 
              max="12" 
              value={config.size}
              onChange={(e) => setConfig({...config, size: e.target.value})}
              className="w-full h-4 bg-purple-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div className="pt-6 bg-white p-6 rounded-lg">
            <p className="text-xl text-gray-600">Estimated Price</p>
            <p className="text-5xl font-bold text-purple-600 mt-2">₹{(selectedJewelry?.price * 1.2).toLocaleString()}</p>
          </div>
          <button 
            onClick={() => setCurrentScreen('checkout')}
            className="w-full bg-green-600 text-white py-5 rounded-lg text-2xl font-bold hover:bg-green-700"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );

  const WardrobeScreen = () => (
    <div className="h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-12">
      <div className="bg-white rounded-3xl shadow-2xl p-16 max-w-3xl text-center space-y-8">
        <h2 className="text-5xl font-bold text-purple-900">Match with Your Wardrobe</h2>
        <p className="text-2xl text-gray-600">Scan QR code with your phone to upload outfit photos</p>
        <div className="bg-gray-100 w-96 h-96 mx-auto rounded-2xl flex items-center justify-center">
          <QrCode className="w-64 h-64 text-purple-600" />
        </div>
        <div className="flex gap-4 justify-center">
          <button className="bg-purple-600 text-white px-12 py-5 rounded-full text-2xl hover:bg-purple-700">
            Upload from Phone
          </button>
          <button 
            onClick={() => setCurrentScreen('try-on')}
            className="bg-gray-200 text-gray-700 px-12 py-5 rounded-full text-2xl hover:bg-gray-300"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );

  const CheckoutScreen = () => (
    <div className="h-screen bg-gray-50 flex flex-col">
      <div className="bg-purple-900 text-white p-8">
        <h2 className="text-4xl font-bold">Checkout</h2>
      </div>
      <div className="flex-1 flex">
        <div className="flex-1 p-12 space-y-8">
          <h3 className="text-3xl font-bold">Your Selections</h3>
          {cart.map((item, i) => (
            <div key={i} className="bg-white rounded-xl shadow p-6 flex items-center gap-6">
              <img src={item.img} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
              <div className="flex-1">
                <h4 className="text-2xl font-bold">{item.name}</h4>
                <p className="text-gray-600 text-xl">Customized: {item.config.metal}, {item.config.stone}, Size {item.config.size}</p>
              </div>
              <p className="text-3xl font-bold text-purple-600">₹{item.price.toLocaleString()}</p>
            </div>
          ))}
          <div className="bg-purple-100 rounded-xl p-8">
            <div className="flex justify-between text-2xl mb-4">
              <span>Subtotal</span>
              <span>₹{cart.reduce((sum, item) => sum + item.price, 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-3xl font-bold text-purple-900">
              <span>Total</span>
              <span>₹{cart.reduce((sum, item) => sum + item.price, 0).toLocaleString()}</span>
            </div>
          </div>
        </div>
        <div className="w-1/3 bg-white border-l p-12 space-y-8">
          <div className="text-center space-y-6">
            <QrCode className="w-48 h-48 mx-auto text-purple-600" />
            <p className="text-2xl font-bold">Scan to save your selections</p>
            <p className="text-xl text-gray-600">Continue shopping on your phone</p>
          </div>
          <button className="w-full bg-purple-600 text-white py-6 rounded-lg text-2xl font-bold hover:bg-purple-700">
            <ShoppingBag className="inline mr-3" /> Place Order
          </button>
          <button className="w-full border-2 border-purple-600 text-purple-600 py-6 rounded-lg text-2xl hover:bg-purple-50">
            <Share2 className="inline mr-3" /> Share with Consultant
          </button>
          <button 
            onClick={() => setCurrentScreen('jewelry-feed')}
            className="w-full bg-gray-200 text-gray-700 py-6 rounded-lg text-2xl hover:bg-gray-300"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );

  const DashboardScreen = () => (
    <div className="h-screen bg-gray-50 flex flex-col">
      <div className="bg-purple-900 text-white p-8 flex justify-between items-center">
        <h2 className="text-4xl font-bold">B2B Analytics Dashboard</h2>
        <button onClick={() => setCurrentScreen('jewelry-feed')} className="bg-purple-700 px-6 py-3 rounded-lg text-xl">
          Exit Dashboard
        </button>
      </div>
      <div className="flex-1 p-12 overflow-y-auto">
        <div className="grid grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <Users className="w-16 h-16 text-purple-600 mb-4" />
            <p className="text-gray-600 text-xl">Total Interactions</p>
            <p className="text-5xl font-bold text-gray-900 mt-2">1,247</p>
            <p className="text-green-600 text-lg mt-2">↑ 23% vs last week</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <TrendingUp className="w-16 h-16 text-green-600 mb-4" />
            <p className="text-gray-600 text-xl">Conversion Rate</p>
            <p className="text-5xl font-bold text-gray-900 mt-2">34%</p>
            <p className="text-green-600 text-lg mt-2">↑ 5% vs last week</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <ShoppingBag className="w-16 h-16 text-pink-600 mb-4" />
            <p className="text-gray-600 text-xl">Avg Order Value</p>
            <p className="text-5xl font-bold text-gray-900 mt-2">₹52K</p>
            <p className="text-green-600 text-lg mt-2">↑ 12% vs last week</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-6">Popular Categories</h3>
            <div className="space-y-4">
              {[
                { name: 'Rings', count: 456, color: 'bg-purple-500' },
                { name: 'Necklaces', count: 328, color: 'bg-pink-500' },
                { name: 'Earrings', count: 289, color: 'bg-blue-500' },
                { name: 'Bangles', count: 174, color: 'bg-green-500' }
              ].map(cat => (
                <div key={cat.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-xl">{cat.name}</span>
                    <span className="text-xl font-bold">{cat.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className={`${cat.color} h-3 rounded-full`} style={{width: `${(cat.count/456)*100}%`}} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-6">Top Preferences</h3>
            <div className="space-y-6">
              {[
                { label: 'Bold Designs', value: '65%' },
                { label: 'Classic Styles', value: '58%' },
                { label: 'Modern Minimal', value: '45%' },
                { label: 'Colorful Stones', value: '38%' }
              ].map(pref => (
                  <div key={pref.label} className="flex justify-between items-center">
                  <span className="text-xl">{pref.label}</span>
                  <span className="text-2xl font-bold text-purple-600">{pref.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full h-screen overflow-hidden" style={{maxWidth: '1440px', margin: '0 auto'}}>
      {currentScreen === 'welcome' && <WelcomeScreen />}
      {currentScreen === 'photo-capture' && <PhotoCaptureScreen />}
      {currentScreen === 'survey' && <SurveyScreen />}
      {currentScreen === 'celebrity-match' && <CelebrityMatchScreen />}
      {currentScreen === 'jewelry-feed' && <JewelryFeedScreen />}
      {currentScreen === 'try-on' && <TryOnScreen />}
      {currentScreen === 'configurator' && <ConfiguratorScreen />}
      {currentScreen === 'wardrobe' && <WardrobeScreen />}
      {currentScreen === 'checkout' && <CheckoutScreen />}
      {currentScreen === 'dashboard' && <DashboardScreen />}
    </div>
  );
};

export default EvolJewelsKiosk;