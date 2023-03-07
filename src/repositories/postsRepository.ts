import { prisma } from './prisma'
import { User } from '@prisma/client'

export function createPost(title: string, createdBy: User) {
  return prisma.post.create({
    data: {
      title,
      createdById: createdBy.id,
    },
  })
}

export function findAllPosts() {
  return prisma.post.findMany()
}
