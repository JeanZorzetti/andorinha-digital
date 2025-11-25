import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Fetching cobertura-eventos data directly from DB...');
        const service = await prisma.service.findUnique({
            where: { id: 'cobertura-eventos' },
        });
        console.log('Service Data:', JSON.stringify(service, null, 2));
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
