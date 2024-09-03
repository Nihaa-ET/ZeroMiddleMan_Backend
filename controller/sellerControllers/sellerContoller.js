const db = require('../../config/db'); // Import db for direct queries

class SellerController {
    // Move seller to the trash (Trashseller table) and delete from the original table
    static async trashSeller(req, res) {
        const { id } = req.params;

        try {
            // Check if the seller exists
            const seller = await SellerModel.findSellerById(id);

            if (!seller) {
                return res.status(404).json({ success: false, message: 'Seller not found' });
            }

            // Move the seller to the Trashseller table
            await SellerModel.moveToTrash(id);

            // Delete the seller from the original seller table
            await SellerModel.deleteSeller(id);

            res.json({ success: true, message: 'Seller moved to trash successfully' });
        } catch (error) {
            console.error('Error trashing seller:', error);
            res.status(500).json({ success: false, message: 'An error occurred while trashing the seller' });
        }
    }

    // Fetch all trashed sellers
    static async getTrashedSellers(req, res) {
        try {
            const [rows] = await db.query('SELECT * FROM Trashseller');
            res.json({ success: true, data: rows });
        } catch (error) {
            console.error('Error fetching trashed sellers:', error.message);
            res.status(500).json({ success: false, message: 'An error occurred while fetching trashed sellers.' });
        }
    }

    // Restore seller from the Trashseller table back to the original seller table
    static async restoreSeller(req, res) {
        const { id } = req.body;

        try {
            // Begin a transaction
            await db.query('START TRANSACTION');

            // Restore the seller: update the `deleted` flag in the `seller` table
            const restoreQuery = 'UPDATE seller SET deleted = 0 WHERE id = ?';
            await db.query(restoreQuery, [id]);

            // Delete the seller from the Trashseller table
            const deleteQuery = 'DELETE FROM Trashseller WHERE id = ?';
            await db.query(deleteQuery, [id]);

            // Commit the transaction
            await db.query('COMMIT');

            res.json({ success: true, message: 'Seller restored successfully.' });
        } catch (error) {
            // Rollback the transaction in case of error
            await db.query('ROLLBACK');
            console.error('Error restoring seller:', error);
            res.status(500).json({ success: false, message: 'An error occurred while restoring the seller.' });
        }
    }
}

module.exports = SellerController;
