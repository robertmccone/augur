var Fluxxor = require('fluxxor');
var constants = require('../libs/constants');

var state = {
  host: 'localhost:8545',
  evmAddress: null,
  isDemo: false,
  debug: false,
  percentLoaded: null,
  contract: null,
  contractFailed: false
}

var ConfigStore = Fluxxor.createStore({
  initialize: function () {
    // TODO: Re-implement loading the evmAddress from a cookie or web3.db.
    this.bindActions(
      constants.config.UPDATE_CONTRACT_SUCCESS, this.handleUpdateContractSuccess,
      constants.config.UPDATE_CONTRACT_FAILED, this.handleUpdateContractFailed,
      constants.config.UPDATE_IS_DEMO, this.handleUpdateIsDemo,
      constants.config.UPDATE_DEBUG, this.handleUpdateDebug,
      constants.config.UPDATE_PERCENT_LOADED, this.handleUpdatePercentLoaded
    );
  },

  getState: function () {
    return state;
  },

  handleUpdatePercentLoaded: function (payload) {
    state.percentLoaded = payload.percentLoaded
    this.emit(constants.CHANGE_EVENT);
  },

  handleUpdateContractSuccess: function (payload) {
    state.contract = payload.contract;
    state.contractFailed = false;
    state.evmAddress = payload.evmAddress;
    this.emit(constants.CHANGE_EVENT);
  },

  handleUpdateContractFailed: function (payload) {
    state.contract = null;
    state.contractFailed = true;
    state.evmAddress = payload.evmAddress;
    this.emit(constants.CHANGE_EVENT);
  },

  handleUpdateIsDemo: function (payload) {
    state.isDemo = payload.isDemo;
    state.contract = payload.contract;
    state.contractFailed = false;
    this.emit(constants.CHANGE_EVENT);
  },

  handleUpdateDebug: function (payload) {
    state.debug = payload.debug;
    this.emit(constants.CHANGE_EVENT);
  }
});

module.exports = ConfigStore;