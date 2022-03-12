import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  defaultState,
  Patient, PatientModel,
} from './index';
import { Injectable } from '@angular/core';
import {
  AddPatient, EditPatient,
  RemovePatient,
} from './patient-portal.actions';

@State<PatientModel>({
  name: 'patientPortal',
  defaults: defaultState,
})
@Injectable()
export class PatientState {
  constructor() {}

  @Selector()
  static getPatients(state: PatientModel): Patient[] {
    return state.patientList;
  }

  @Action(AddPatient)
  addPatient({ getState, patchState }: StateContext<PatientModel>, action: AddPatient) {
    const patientList = [...getState().patientList];
    patientList.push(action.patient);
    patchState({
      patientList
    });
  }

  @Action(EditPatient)
  editPatient({ getState, patchState }: StateContext<PatientModel>, action: EditPatient) {
    const newPatientList = [...getState().patientList];
    const patientIndex = newPatientList.findIndex((item: Patient) => {
      return item.patientId === action.patient.patientId;
    });
    newPatientList[patientIndex] = action.patient;
    patchState({
      patientList: newPatientList
    });
  }

  @Action(RemovePatient)
  removePatient({ getState, patchState }: StateContext<PatientModel>, action: RemovePatient) {
    const patientList = [...getState().patientList];
    const patientIndex = patientList.findIndex((item: Patient) => {
      return item.patientId === action.patient.patientId;
    });
    patientList.splice(patientIndex, 1);
    patchState({
      patientList
    });
  }
}
