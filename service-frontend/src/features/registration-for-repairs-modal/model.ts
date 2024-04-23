import { Dayjs } from 'dayjs';
import { makeAutoObservable, runInAction } from 'mobx';
import { AdditionalService, RepairService } from 'shared/api';

class RegistrationForRepairsState {
  date: Dayjs | null = null;
  notes: RegistrationForRepairs[] = [];

  clients: Client[] = [];
  currentClientId: number | null = null;
  searchClient = '';

  cars: CarInfo[] = [];
  currentCarId: number | null = null;
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

  setCurrentClientId(id: number) {
    this.currentClientId = id;
    this.getCars(id);
  }

  setCurrentCarId(id: number) {
    this.currentCarId = id;
  }

  setCars(cars: CarInfo[]) {
    this.cars = cars;
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

  async getNotes(params: { day: string; acceptorId: number }) {
    let response = null;

    try {
      const notesData = await RepairService.getRepairNotes(params);
      runInAction(() => {
        this.notes = notesData.results;
        response = 'ok';
      });
    } catch (e) {
      response = (e as Error).message;
    }

    return response;
  }

  clearCardState() {
    this.currentClientId = null;
    this.currentCarId = null;
    this.searchClient = '';
    this.cars = [];
    this.maintenances = [];
    this.currentMaintenance = null;
  }

  clearState() {
    this.date = null;
    this.notes = [];

    this.clients = [];
    this.currentClientId = null;
    this.searchClient = '';

    this.cars = [];
    this.currentCarId = null;
    this.acceptors = [];
    this.currentAcceptorId = null;

    this.maintenances = [];
    this.currentMaintenance = null;
  }
}

export const registrationForRepairsState = new RegistrationForRepairsState();
