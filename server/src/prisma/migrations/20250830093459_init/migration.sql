-- CreateTable
CREATE TABLE "public"."Company" (
    "companyId" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "companyLogo" TEXT NOT NULL,
    "companyEmail" TEXT NOT NULL,
    "companyPhoneNumber" TEXT,
    "companyContactPersonName" TEXT,
    "companyAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("companyId")
);

-- CreateTable
CREATE TABLE "public"."Document" (
    "documentId" TEXT NOT NULL,
    "documentName" TEXT NOT NULL,
    "documentUrl" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("documentId")
);

-- CreateTable
CREATE TABLE "public"."Project" (
    "projectId" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "requestedSubsidyAmount" DOUBLE PRECISION NOT NULL,
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("projectId")
);

-- CreateTable
CREATE TABLE "public"."Milestone" (
    "milestoneId" TEXT NOT NULL,
    "milestoneName" TEXT NOT NULL,
    "milestoneTargetDate" TIMESTAMP(3),
    "milestoneTargetValue" TEXT,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Milestone_pkey" PRIMARY KEY ("milestoneId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_companyName_key" ON "public"."Company"("companyName");

-- CreateIndex
CREATE UNIQUE INDEX "Company_companyLogo_key" ON "public"."Company"("companyLogo");

-- CreateIndex
CREATE UNIQUE INDEX "Company_companyEmail_key" ON "public"."Company"("companyEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Company_companyPhoneNumber_key" ON "public"."Company"("companyPhoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Company_companyAddress_key" ON "public"."Company"("companyAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Document_documentUrl_key" ON "public"."Document"("documentUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Document_companyId_key" ON "public"."Document"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "Document_documentName_companyId_key" ON "public"."Document"("documentName", "companyId");

-- CreateIndex
CREATE UNIQUE INDEX "Project_projectName_companyId_key" ON "public"."Project"("projectName", "companyId");

-- AddForeignKey
ALTER TABLE "public"."Document" ADD CONSTRAINT "Document_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("companyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Project" ADD CONSTRAINT "Project_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("companyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Milestone" ADD CONSTRAINT "Milestone_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("projectId") ON DELETE RESTRICT ON UPDATE CASCADE;
