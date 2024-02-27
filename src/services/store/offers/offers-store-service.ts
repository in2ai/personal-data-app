import offersSqlLiteStorageService from './offers-sql-lite-storage-service';

const getAllOffers = offersSqlLiteStorageService.getAllOffers;
const removeAllOffers = offersSqlLiteStorageService.removeAllOffers;
const addNewOffer = offersSqlLiteStorageService.addNewOffer;

const offersStoreService = {
  getAllOffers,
  removeAllOffers,
  addNewOffer,
};

export default offersStoreService;
