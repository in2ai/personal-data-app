import offersAsyncStorageService from './offers-async-storage-service';

const getAllOffers = offersAsyncStorageService.getAllOffers;
const setAllOffers = offersAsyncStorageService.setAllOffers;
const removeAllOffers = offersAsyncStorageService.removeAllOffers;
const addNewOffer = offersAsyncStorageService.addNewOffer;

const offersStoreService = {
  getAllOffers,
  setAllOffers,
  removeAllOffers,
  addNewOffer,
};

export default offersStoreService;
