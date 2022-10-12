const { faker } = require("@faker-js/faker");
const { User, Review, Service } = require("../models");

const userGen = () => {
  const seedServiceDB = async () => {
    
    await Service.insertMany(serviceArray);
  };
  seedServiceDB().then(() => {
    console.log("Successfully seeded services!");
  });

  for (let i = 0; i < 50; i++) {
    let username = faker.internet.userName();
    let email = faker.internet.email(`${username}`);
    let password = faker.internet.password(12);
    let phone = faker.phone.number("###-###-####");
    let services =
      serviceArray[
        Math.floor(Math.random() * (serviceArray.length - 0 + 1) + 1)
      ];

    users.push({
      username: username,
      email: email,
      password: password,
      phone: phone,
      // services: services,
    });
  }
  console.log(users);
  return users;
};

const reviewGen = () => {
  for (let i = 0; i < 20; i++) {
    let reviewBody = faker.lorem.sentences(2);
    let username = users[Math.floor(Math.random() * users.length)].username;
    let createdAt = faker.date.recent();
    let rating = Math.floor(Math.random() * (5 - 1 + 1) + 1);

    reviews.push({
      reviewBody: reviewBody,
      username: username,
      createdAt: createdAt,
      rating: rating,
    });
  }

  return reviews;
};

const serviceGen = () => {
    for (let i = 0; i < 20; i++) {
      let reviewBody = faker.lorem.sentences(2);
      let username = users[Math.floor(Math.random() * users.length)].username;
      let createdAt = faker.date.recent();
      let rating = Math.floor(Math.random() * (5 - 1 + 1) + 1);
  
      reviews.push({
        reviewBody: reviewBody,
        username: username,
        createdAt: createdAt,
        rating: rating,
      });
    }
  
    return reviews;
  };
module.exports = userGen, reviewGen, serviceGen;