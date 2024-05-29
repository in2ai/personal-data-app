import offersSqlLiteStorageService from './offers-sql-lite-storage-service';

const getAllOffers = offersSqlLiteStorageService.getAllOffers;
const removeAllOffers = offersSqlLiteStorageService.removeAllOffers;
const addNewOffer = offersSqlLiteStorageService.addNewOffer;
const updateOfferMatch = offersSqlLiteStorageService.updateOfferMatch;
const resetOfferMatch = offersSqlLiteStorageService.resetOfferMatch;
const getAllIndustryOffers = offersSqlLiteStorageService.getAllIndustryOffers;
const toggleFavoriteState = offersSqlLiteStorageService.toggleFavoriteState;

const offersStoreService = {
  getAllOffers,
  removeAllOffers,
  addNewOffer,
  updateOfferMatch,
  resetOfferMatch,
  getAllIndustryOffers,
  toggleFavoriteState,
};

export default offersStoreService;
