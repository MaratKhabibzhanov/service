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

  setCurrentCarId(id: number | null) {
    this.currentCarId = id;
  }

  setCars(cars: CarInfo[]) {
    this.cars = cars;
  }

  async getCars(clientId: number) {
    let response = 'ok';

    try {
      const carsData = await AdditionalService.getCarsInfo(clientId);
      runInAction(() => {
        this.cars = carsData.results;
      });
    } catch (e) {
      response = (e as Error).message;
    }

    return response;
  }

  async getAcceptors() {
    let response = 'ok';

    try {
      const acceptorsData = await RepairService.getAcceptors();
      runInAction(() => {
        this.acceptors = acceptorsData.results;
      });
    } catch (e) {
      console.warn(e);
      response = (e as Error).message;
    }

    return response;
  }

  async getClients() {
    let response = 'ok';

    try {
      const clientsData = await AdditionalService.getUsers(this.searchClient);

      runInAction(() => {
        this.clients = clientsData.results;
      });
    } catch (e) {
      response = (e as Error).message;
    }

    return response;
  }

  async getMaintenances(carId: number) {
    let response = 'ok';

    try {
      const maintenancesData = await RepairService.getMaintenances(carId);
      runInAction(() => {
        this.maintenances = maintenancesData;
      });
    } catch (e) {
      response = (e as Error).message;
    }

    return response;
  }

  async getNotes(params: { day: string; acceptorId: number }) {
    let response = 'ok';

    try {
      const notesData = await RepairService.getRepairNotes(params);
      runInAction(() => {
        this.notes = notesData.results;
      });
    } catch (e) {
      response = (e as Error).message;
    }

    return response;
  }

  async registration(values: RegistrationFoeRepairsFields) {
    let response = 'ok';

    const acceptor = this.acceptors.find((item) => item.id === values.acceptor);
    if (!acceptor) throw new Error('Acceptor not found');
    if (!this.currentMaintenance) throw new Error('Maintenance not found');

    const car = this.cars.find((item) => item.id === this.currentCarId);
    if (!car) throw new Error('Car not found');

    const dataToSend: RegistrationForRepairs = {
      day: values.day.format('YYYY-MM-DD'),
      time: values.time.format('HH:mm'),
      maintenance: this.currentMaintenance,
      acceptor,
      car,
    };

    try {
      await RepairService.registrationForRepairs(dataToSend);
      await this.getNotes({ day: values.day.format('YYYY-MM-DD'), acceptorId: acceptor.id });
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
