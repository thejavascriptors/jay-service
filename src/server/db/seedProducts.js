const db = require('./index.js');
const Product = require('./Products.js');
const faker = require('faker');

const sampleProducts = [];

// seeds 100 sample products into sampleProducts array
for (let i = 0; i < 100; i++) {
  sampleProducts.push({
    name: faker.commerce.productName(),
    brand: faker.commerce.product(),
    stars: (Math.random() * 5).toPrecision(3),
    shorthand: faker.lorem.words(2),
    ratings: Math.floor(Math.random() * 9000),
    price: faker.commerce.price(1.50, 799, 2, '$'),
    inventory: Math.floor(Math.random() * 1000),
    features: [faker.lorem.sentences(3), faker.lorem.sentences(3), faker.lorem.sentences(3)],
    shipping: {
      date: faker.date.soon(2),
      supplier: faker.company.companyName(0),
    },
    photos: [
      {
        url: faker.image.technics(),
        description: faker.lorem.sentence()
      },
      {
        url: faker.image.technics(),
        description: faker.lorem.sentence()
      },
      {
        url: faker.image.technics(),
        description: faker.lorem.sentence()
      }
    ]
  });
}

var ps5controller = {
  name: 'DualSense Wireless Controller',
  brand: 'PlayStation',
  platform: 'PlayStation 5',
  stars: 4.97,
  ratings: 8391,
  shorthand: 'ps5 controller',
  price: '$69.98',
  stock: 10231,
  shipping: {
    date: faker.date.soon(2).toDateString(),
    supplier: 'Congo.com'
  },
  features: ['Haptic feedback** - Feel physically responsive feedback to your in-game actions with dual actuators which replace traditional rumble motors. In your hands, these dynamic vibrations can simulate the feeling of everything from environments to the recoil of different weapons.', 'Adaptive triggers** - Experience varying levels of force and tension as you interact with your in-game gear and environments. From pulling back an increasingly tight bowstring to hitting the brakes on a speeding car, feel physically connected to your on-screen actions.', 'Built-in microphone and headset jack - Chat with friends online*** using the built-in microphone or by connecting a headset to the 3.5mm jack. Easily switch voice capture on and off at a moment’s notice with the dedicated mute button. ***Internet and account for PlayStation Network required.'],
  photos: [
    {
      url: 'https://fec-project-jay-jones.s3.amazonaws.com/controllerfront.jpg',
      description: 'playstation 5 controller front profile'
    },
    {
      url: 'https://fec-project-jay-jones.s3.amazonaws.com/boxfront.jpg',
      description: 'playstation 5 controller box front'
    },
    {
      url: 'https://fec-project-jay-jones.s3.amazonaws.com/boxangle.jpg',
      description: 'playstation 5 controller box from angle'
    }
  ]
};

sampleProducts.push(ps5controller);

// inserts 100 sample products into Products db
const insertProducts = function () {
  Product.create(sampleProducts)
    .then(() => {
      console.log(`Seeded ${sampleProducts.length} sample products`);
    })
    .catch((err) => {
      console.error(err);
    });
};


insertProducts();
