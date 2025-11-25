import { PrismaClient, UserRole } from '@prisma/client'
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
        update: {
            password: hashedPassword, // Force update password to ensure it matches
            role: UserRole.ADMIN, // Ensure role is set to ADMIN enum
        },
        create: {
            email,
            name: 'Admin',
            password: hashedPassword,
            role: UserRole.ADMIN, // Use enum instead of string
        },
    });

    console.log('Admin user seeded:', user.email);
    console.log('Role:', user.role);
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