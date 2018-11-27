
export class StudentProfile {
    stdId: number;
    stdName: string;
    gender: string;
    stdMobile: number;
    stdEmail: string;
    stdRollnumber: string;
    addressOne: string;
    addressTwo: string;
    city: string;
    zipCode: string;
    countryName: string;
    state: string;
    createdBy?: any;
    createDateTime?: any;
    modifiedBy: string;
    modifiedDateTime?: any;
    institutionName: string;
    courseName: string;
    courseCategory: string;
    plan: string;
    status: string;
    parPhone?: any;
    planAmount: string;
    planStartDate: Date;
    planEndDate: Date;
    mcmId: string;
    membershipType: string;
    yearOfJoining?: any;
}

export class StudentPayment {
    id: number;
    paymentDate: Date;
    paymentMode: string;
    cardNumber: string;
    paymentReference: string;
    studentProfile: StudentProfile;
    createdDate: Date;
    createdBy: string;
    planName: string;
    planPrice: string;
    membershipType: string;
    planStartDate: Date;
    planEndDate: Date;
}



