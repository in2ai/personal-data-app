import offersSqlLiteStorageService from './offers-sql-lite-storage-service';

const getAllOffers = offersSqlLiteStorageService.getAllOffers;
const removeAllOffers = offersSqlLiteStorageService.removeAllOffers;
const addNewOffer = offersSqlLiteStorageService.addNewOffer;
const updateOfferMatch = offersSqlLiteStorageService.updateOfferMatch;

const offersStoreService = {
  getAllOffers,
  removeAllOffers,
  addNewOffer,
  updateOfferMatch,
};

export default offersStoreService;