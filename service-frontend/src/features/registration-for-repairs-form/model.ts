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

  setCurrentMaintenance(maintenance: Maintenance) {
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

  async getClients(search?: string) {
    let response = null;

    try {
      const clientsData = await AdditionalService.getUsers(search);

      runInAction(() => {
        this.clients = clientsData.results;
        response = 'ok';
      });
    } catch (e) {
      response = (e as Error).message;
    }

    return response;
  }

  async getCars(clientId: number) {
    let response = null;

    try {
      const carsData = await AdditionalService.getCarsInfo(clientId);
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
