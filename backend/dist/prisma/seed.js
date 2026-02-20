"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    await prisma.comment.deleteMany();
    await prisma.memory.deleteMany();
    await prisma.relative.deleteMany();
    const relative = await prisma.relative.create({
        data: {
            name: 'Abuela María',
            birthDate: new Date('1940-05-15'),
            deathDate: new Date('2022-11-01'),
            biography: 'Una mujer llena de luz que amaba el pan de muerto.',
            mainImageUrl: 'https://images.unsplash.com/photo-1544120190-271d7010f3c5?auto=format&fit=crop&q=80&w=400',
            level: 1,
            memories: {
                create: [
                    { type: 'IMAGE', url: 'https://images.unsplash.com/photo-1516733968668-dbdce39c46ef?auto=format&fit=crop&q=80&w=400' },
                ],
            },
            comments: {
                create: [
                    { author: 'Juan', text: 'Te extrañamos mucho, abuela.' },
                    { author: 'Elena', text: 'Siempre estarás en nuestro corazón.' },
                ],
            },
        },
    });
    console.log({ relative });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map