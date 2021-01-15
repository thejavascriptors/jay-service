const db = require('./index.js');
const Photo = require('./Photo.js');
const faker = require('faker');

const samplePhotos = [];

for (let i = 0; i <= 100; i++) {
  samplePhotos.push({
    url: faker.image.technics(),
    description: faker.lorem.sentence()
  });
}

const insertPhotos = function () {
  Photo.create(samplePhotos)
    .then(() => console.log('Seeded sample photos'));
};

insertPhotos();