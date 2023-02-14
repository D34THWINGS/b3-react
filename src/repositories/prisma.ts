import {PrismaClient} from "@prisma/client";

export const prisma = new PrismaClient()

prisma.user.createMany({
  data: [{
    email: 'john.doe@test.com',
    name: 'John Doe',
  }, {
    email: 'foo.bar@test.com',
    name: 'Foo Bar',
  }]
}).then(() => {
  console.log('Seeded users')
}, (error) => {
  console.error(error)
})
