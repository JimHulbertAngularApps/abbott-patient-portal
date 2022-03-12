export interface PatientModel {
  patientList: Patient[];
}

export const defaultState: PatientModel = {
  patientList: [
    {
      patientId: 1,
      firstName: 'John',
      lastName: 'Doe',
      street: '1234 Main Street',
      city: 'Atlanta',
      state: 'GA',
      zipcode: '12345',
      clinic: 'Atlanta Clinic 1'
    },
    {
      patientId: 2,
      firstName: 'Matt',
      lastName: 'Smith',
      street: '7777 Elm Street',
      city: 'Atlanta',
      state: 'GA',
      zipcode: '37443',
      clinic: 'Atlanta Clinic 2'
    }
  ]
};

export interface Patient {
  patientId?: number;
  firstName?: string;
  lastName?: string;
  street?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  clinic?: string;
}
