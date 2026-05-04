ALTER TABLE `TravelRequestTrip` MODIFY `tripApprovalStatus` ENUM('pending', 'approved', 'rejected', 'dispersed') NOT NULL DEFAULT 'pending';
