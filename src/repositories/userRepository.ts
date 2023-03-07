import { prisma } from './prisma'

export function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  })
}
export function findUserById(id: string) {
  if (!id) {
    return null
  }

  return prisma.user.findUnique({
    where: {
      id,
    },
  })
}

export async function createUser(email: string, name: string) {
  const existingUser = await findUserByEmail(email)
  if (existingUser) {
    return null
  }

  return prisma.user.create({
    data: {
      email,
      name,
    },
  })
}

export function updateUser(
  id: string,
  data: {
    email: string
    name: string
    photoURL?: string
  },
) {
  return prisma.user.update({
    where: {
      id,
    },
    data,
  })
}

export async function deleteUser(id: string) {
  await prisma.event.deleteMany({
    where: {
      createdById: id,
    },
  })
  await prisma.post.deleteMany({
    where: {
      createdById: id,
    },
  })
  return prisma.user.delete({
    where: {
      id,
    },
  })
}
