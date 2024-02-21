import { Dayjs } from 'dayjs';
import { makeAutoObservable, runInAction } from 'mobx';
import { AdditionalService, RepairService } from 'shared/api';

class RegistrationForRepairs {
  date: Dayjs | null = null;

  clients: Client[] = [];
  currentClientId: number | null = null;
  searchClient = '';

  cars: CarInfo[] = [];
  acceptors: Acceptor[] = [];
  currentAcceptorId: number | null = null;

  maintenances: Maintenance[] = [];
  currentMaintenance: Maintenance | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setDate(date: Dayjs | null) {
    this.date = date;
  }

  async setCurrentClientId(id: number) {
    this.currentClientId = id;

    let response = null;

    try {
      const carsData = await AdditionalService.getCarsInfo(id);
      runInAction(() => {
        this.cars = carsData.results;
        response = 'ok';
      });
    } catch (e) {
      response = (e as Error).message;
    }

    return response;
  }

  setSearchClient(search: string) {
    this.searchClient = search;
    this.getClients();
  }

  setCurrentAcceptorId(id: number) {
    this.currentAcceptorId = id;
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

  clearStore() {
    this.date = null;
    this.clients = [];
    this.currentClientId = null;
    this.searchClient = '';
    this.cars = [];
    this.acceptors = [];
    this.currentAcceptorId = null;
    this.maintenances = [];
    this.currentMaintenance = null;
  }
}

export const registrationForRepairsState = new RegistrationForRepairs();