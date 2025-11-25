import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient()

async function main() {
    console.log('Running seed script...');

    // Seed Admin User
    const email = 'admin@andorinha.com';
    const password = 'admin'; // Change this in production!
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
            email,
            name: 'Admin',
            password: hashedPassword,
            role: 'admin',
        },
    });

    console.log('Admin user seeded:', user.email);
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })