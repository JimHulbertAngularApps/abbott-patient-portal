import {
  Patient,
} from './index';

export class AddPatient {
  static readonly type = '[Patient] Add';

  constructor(public patient: Patient) {
  }
}

export class EditPatient {
  static readonly type = '[Patient] Edit';

  constructor(public patient: Patient) {
  }
}

export class RemovePatient {
  static readonly type = '[Patient] Remove';

  constructor(public patient: Patient) {
  }
}
