import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main(){ await prisma.blogPost.upsert({where:{slug:'scene-report-underground-frequencies'},update:{},create:{slug:'scene-report-underground-frequencies',title:'Scene Report: Underground Frequencies',body:'Seed body',status:'published',category:'scene reports'}}); }
main().finally(()=>prisma.$disconnect());
