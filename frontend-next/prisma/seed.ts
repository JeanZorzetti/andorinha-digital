import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient()

async function main() {
    console.log('Running seed script...');
    await prisma.$disconnect()
})
    .catch (async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})