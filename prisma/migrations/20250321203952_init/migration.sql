-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('Master', 'Individual');

-- CreateEnum
CREATE TYPE "LineConfigurationType" AS ENUM ('Americana', 'Decimal');

-- CreateEnum
CREATE TYPE "LineConfigurationViewType" AS ENUM ('Horizontal', 'Vertical');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(120) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "role" "UserRole" NOT NULL,
    "language" VARCHAR(60) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sport" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(60) NOT NULL,

    CONSTRAINT "Sport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Championship" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(60) NOT NULL,

    CONSTRAINT "Championship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tournament" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(60) NOT NULL,

    CONSTRAINT "Tournament_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Theme" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,

    CONSTRAINT "Theme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LineConfiguration" (
    "id" SERIAL NOT NULL,
    "themeId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "type" "LineConfigurationType" NOT NULL,
    "viewType" "LineConfigurationViewType" NOT NULL,
    "alternativeEquipmentCode" BOOLEAN NOT NULL,
    "timeZone" VARCHAR(120) NOT NULL,

    CONSTRAINT "LineConfiguration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LineConfigurationAdvertising" (
    "id" SERIAL NOT NULL,
    "lineConfigurationId" INTEGER NOT NULL,
    "showEvery" VARCHAR(10) NOT NULL,
    "path" VARCHAR(120) NOT NULL,

    CONSTRAINT "LineConfigurationAdvertising_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LineConfigurationImage" (
    "id" SERIAL NOT NULL,
    "lineConfigurationId" INTEGER NOT NULL,
    "name" VARCHAR(10) NOT NULL,
    "path" VARCHAR(120) NOT NULL,

    CONSTRAINT "LineConfigurationImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GroupToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_GroupToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ChampionshipToLineConfiguration" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ChampionshipToLineConfiguration_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_LineConfigurationToTournament" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_LineConfigurationToTournament_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_LineConfigurationToSport" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_LineConfigurationToSport_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "LineConfigurationAdvertising_lineConfigurationId_key" ON "LineConfigurationAdvertising"("lineConfigurationId");

-- CreateIndex
CREATE INDEX "_GroupToUser_B_index" ON "_GroupToUser"("B");

-- CreateIndex
CREATE INDEX "_ChampionshipToLineConfiguration_B_index" ON "_ChampionshipToLineConfiguration"("B");

-- CreateIndex
CREATE INDEX "_LineConfigurationToTournament_B_index" ON "_LineConfigurationToTournament"("B");

-- CreateIndex
CREATE INDEX "_LineConfigurationToSport_B_index" ON "_LineConfigurationToSport"("B");

-- AddForeignKey
ALTER TABLE "LineConfiguration" ADD CONSTRAINT "LineConfiguration_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "Theme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LineConfiguration" ADD CONSTRAINT "LineConfiguration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LineConfigurationAdvertising" ADD CONSTRAINT "LineConfigurationAdvertising_lineConfigurationId_fkey" FOREIGN KEY ("lineConfigurationId") REFERENCES "LineConfiguration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LineConfigurationImage" ADD CONSTRAINT "LineConfigurationImage_lineConfigurationId_fkey" FOREIGN KEY ("lineConfigurationId") REFERENCES "LineConfiguration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToUser" ADD CONSTRAINT "_GroupToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToUser" ADD CONSTRAINT "_GroupToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChampionshipToLineConfiguration" ADD CONSTRAINT "_ChampionshipToLineConfiguration_A_fkey" FOREIGN KEY ("A") REFERENCES "Championship"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChampionshipToLineConfiguration" ADD CONSTRAINT "_ChampionshipToLineConfiguration_B_fkey" FOREIGN KEY ("B") REFERENCES "LineConfiguration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LineConfigurationToTournament" ADD CONSTRAINT "_LineConfigurationToTournament_A_fkey" FOREIGN KEY ("A") REFERENCES "LineConfiguration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LineConfigurationToTournament" ADD CONSTRAINT "_LineConfigurationToTournament_B_fkey" FOREIGN KEY ("B") REFERENCES "Tournament"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LineConfigurationToSport" ADD CONSTRAINT "_LineConfigurationToSport_A_fkey" FOREIGN KEY ("A") REFERENCES "LineConfiguration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LineConfigurationToSport" ADD CONSTRAINT "_LineConfigurationToSport_B_fkey" FOREIGN KEY ("B") REFERENCES "Sport"("id") ON DELETE CASCADE ON UPDATE CASCADE;
