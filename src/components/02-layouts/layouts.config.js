const faker = require('faker')

// Articles template stubs
const articlesCount = 12
let articlesData = []
const dateFormatOptions = {
  day: '2-digit',
  month: 'short',
  year: 'numeric'
}

for (let i = 0; i < articlesCount; i++) {
  articlesData.push({
    eyebrow: faker.commerce.productAdjective(),
    title: faker.lorem.words(8).replace(/^\w/, character => character.toUpperCase()),
    image: faker.image.nature(800, 450, true),
    content: `<p>${faker.lorem.sentence(16, 24)}</p>`,
    meta: `<time>${new Date(faker.date.past()).toLocaleString('en-us', dateFormatOptions)}</time>`
  })
}

// People stubs
const peopleCount = 12
let peopleData = []

for (let i = 0; i < peopleCount; i++) {
  peopleData.push({
    label: faker.name.jobArea(),
    avatar: faker.internet.avatar(),
    name: `${faker.name.firstName()} ${faker.name.firstName()}`,
    content: `<p>${faker.name.jobTitle()}</p>`,
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber('(###) ###-####')
  })
}

const profileData = {
  avatar: faker.internet.avatar(),
  name: `${faker.name.firstName()} ${faker.name.firstName()}`,
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber('(###) ###-####'),
  title: faker.name.jobTitle()
}

// Paths to IU-related card images in the 'static' folder
const cardImages = [
  '/img/index-page-card-1.jpeg',
  '/img/index-page-card-2.jpeg',
  '/img/index-page-card-3.jpeg'
]

module.exports = {
  title: 'Layouts',
  status: 'wip',
  preview: '@preview-no-padding',
  root: true,
  context: {
    articles: articlesData,
    people: peopleData,
    profile: profileData,
    cardImages: cardImages
  }
}