const images = {
    laptop: '/assets/laptop.png',
    phone: '/assets/phone.png',
    tv: '/assets/tv.png',
    speaker: '/assets/speaker.png',
    gameConsole: '/assets/console.png',
    headphones: '/assets/headphones.png',
    camera: '/assets/camera.png',
    watch: '/assets/watch.png',
    tablet: '/assets/tablet.png',
  };
  
  const products = {
    Electronics: [
      { id: '1', name: 'Laptop', price: 5199, rating: 4.5, reviews: 2000, sales: '3.5k', image: images.laptop },
      { id: '2', name: 'Smartphone', price: 3699, rating: 4.8, reviews: 1500, sales: '4.2k', image: images.phone },
      { id: '3', name: 'TV', price: 3999, rating: 4.6, reviews: 1800, sales: '2.8k', image: images.tv },
      { id: '4', name: 'Camera', price: 2099, rating: 4.9, reviews: 2500, sales: '5.3k', image: images.camera },
      { id: '5', name: 'Watch', price: 150, rating: 4.4, reviews: 700, sales: '900', image: images.watch },
      { id: '6', name: 'Tablet', price: 600, rating: 4.1, reviews: 300, sales: '600', image: images.tablet },
      { id: '7', name: 'Bluetooth Speaker', price: 150, rating: 4.3, reviews: 1100, sales: '1.2k', image: images.speaker },
    ],
  };
  
  export default products;
  