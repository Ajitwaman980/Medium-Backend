-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "notifymes" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);
