const EStockTransactionType = Object.freeze({
    IN_PURCHASE: 1,
    OUT_SALE: 2,
    IN_RETURN: 3,
    OUT_DAMAGE: 4,
    ADJ_UP : 5,
    ADJ_DOWN: 6,
    IN_TRANSFER: 7,
    OUT_TRANSFER: 8
});

module.exports = EStockTransactionType;