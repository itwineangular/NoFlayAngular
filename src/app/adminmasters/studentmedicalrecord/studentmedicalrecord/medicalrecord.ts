export class Medicalrecord {

    // medicalId: number;
    // weight: number;
    // height: number;
    // bloodPressure: number;
    // bloodGluContent: number;
    // pulse: number;
    // respiratoryRate: number;
    // bodyTemp: number;
    // bodyFat: number;
    // bodyMass: number;
    // leanBody: number;
    // waistCirumference: number;
    // qrImage?: any;
    // createdDate: Date;
    // createdBy?: any;
    // modifiedDate: Date;
    // modifiedBy?: any;
    // hospitalNmae: string;
    // dateOfAdmission: Date;
    // dateOfDischarge: Date;
    // treatementFor: string;
    // dischargeSummary: string;
    // medication: string;
    // specialCare: string;

    id: number;
    stdId: number
    weight: string;
    height: string;
    bloodPressure: string;
    bloodGluContent: string;
    pulse: string;
    respiratoryRate: string;
    bodyTemp: string;
    bodyFat: string;
    bodyMass: string;
    leanBody: string;
    waistCirumference: string;
    qrImage?: any;
    createdDate?: Date;
    createdBy?: any;
    modifiedDate?: Date;
    modifiedBy?: any;
    hospitalNmae: string;
    dateOfAdmission?: Date;
    dateOfDischarge?: Date;
    treatementFor: string;
    dischargeSummary: string;
    medication: string;
    specialCare: string;

}

export class MedicalrecordDate {
    startDate: Date;
    endDate: Date;
}
