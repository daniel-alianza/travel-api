-- AlterTable
ALTER TABLE `TravelRequest` MODIFY `status` ENUM('draft', 'submitted', 'awaiting_trip_correction', 'approved', 'rejected', 'dispersed', 'cancelled') NOT NULL DEFAULT 'draft';

-- AlterTable
ALTER TABLE `TravelRequestTrip` ADD COLUMN `approvedAt` DATETIME(3) NULL,
    ADD COLUMN `approverComment` TEXT NULL,
    ADD COLUMN `rejectedAt` DATETIME(3) NULL,
    ADD COLUMN `tripApprovalStatus` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending';

-- CreateIndex
CREATE INDEX `TravelRequestTrip_tripApprovalStatus_idx` ON `TravelRequestTrip`(`tripApprovalStatus`);

-- CreateIndex
CREATE INDEX `TravelRequestTrip_travelRequestId_tripApprovalStatus_idx` ON `TravelRequestTrip`(`travelRequestId`, `tripApprovalStatus`);
