import { makeAutoObservable, runInAction } from 'mobx';
import { AdditionalService, RepairService } from 'shared/api';

class RegistrationForRepairs {
  clients: Client[] = [];
  currentClientId: number | null = null;
  searchClient = '';

  cars: CarInfo[] = [];
  acceptors: Acceptor[] = [];
  currentAcceptor: Acceptor | null = null;

  maintenances: Maintenance[] = [];
  currentMaintenance: Maintenance | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setCurrentClientId(id: number) {
    this.currentClientId = id;
  }

  setSearchClient(search: string) {
    this.searchClient = search;
  }

  setCurrentAcceptor(acceptor: Acceptor) {
    this.currentAcceptor = acceptor;
  }

  setCurrentMaintenance(maintenance: Maintenance | null) {
    this.currentMaintenance = maintenance;
  }

  async getAcceptors() {
    let response = null;

    try {
      const acceptorsData = await RepairService.getAcceptors();
      runInAction(() => {
        this.acceptors = acceptorsData.results;
        response = 'ok';
      });
    } catch (e) {
      console.warn(e);
      response = (e as Error).message;
    }

    return response;
  }

  async getClients() {
    let response = null;

    try {
      const clientsData = await AdditionalService.getUsers(this.searchClient);

      runInAction(() => {
        this.clients = clientsData.results;
        response = 'ok';
      });
    } catch (e) {
      response = (e as Error).message;
    }

    return response;
  }

  async getCars() {
    if (!this.currentClientId) return undefined;

    let response = null;

    try {
      const carsData = await AdditionalService.getCarsInfo(this.currentClientId);
      runInAction(() => {
        this.cars = carsData.results;
        response = 'ok';
      });
    } catch (e) {
      response = (e as Error).message;
    }

    return response;
  }

  async getMaintenances(carId: number) {
    let response = null;

    try {
      const maintenancesData = await RepairService.getMaintenances(carId);
      runInAction(() => {
        this.maintenances = maintenancesData;
        response = 'ok';
      });
    } catch (e) {
      response = (e as Error).message;
    }

    return response;
  }
}

export const registrationForRepairsState = new RegistrationForRepairs();
