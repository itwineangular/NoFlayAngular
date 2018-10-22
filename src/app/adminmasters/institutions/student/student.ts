export class Student {

    stdId: number;
    stdName: string;
    addressOne: string;
    addressTwo: string;
    city: string;
    state: string;
    zipcode: string;
    countryName: string;
    stdPhone?: any;
    gender: string;
    parentPhone: string;
    stdEmail: string;
    stdAdmissionNumber: string;
    institutionName: string;
    course: string;
    stdPassword?: any;
    mcmId?: any;
    yearofjoining?: any;
    courseCategory: string;
    plan: string;
    status: string;
    creationDate?: number;
    createdBy: string;
    modifiedDate?: number;
    modifiedBy: string;
    studentStatusId: number;

    planPrice : any;
    planStartDate : any;
    planEndEnd : any;
    
  
}


export class PlanNameObject {
    planId: number;
    planName: string;
    planPrice: number;
    planMembership: string;
    createDateTime: any;
    createdBy?: any;
    modifiedDateTime: any;
    modifiedBy?: any;
    startDateTime: any;
    endDateTime: any;
}


export class CourseProfile {
    courseId: number;
    courseName: string;
    courseCode: string;
    duration: string;
    categoryName: string;
    createdBy: string;
    createDateTime: any;
    modifiedBy: string;
    modifiedDateTime: any;
    
}

export class CourseCategory {
    categoryId: number;
    categoryCode: string;
    categoryName: string;
    status: string;
    creationDate: any;
    createdBy: string;
    modifiedDate: any;
    modifiedBy: string;
    courseProfile: CourseProfile[];
}

export class Institution {
    institutionId: number;
    instDesignation: string;
    instAddressone: string;
    instAddresstwo: string;
    instCity: string;
    instState: string;
    instPincode: string;
    instCountryname: string;
    instFax?: any;
    instEmail: string;
    instCourseOffered?: any;
    instStatus?: any;
    instCourseCode?: any;
    instMobile: string;
    instPhone: number;
    instCreatedBy?: any;
    instCreateDateTime: any;
    instBankBranch: string;
    instModifiedBy?: any;
    instModifiedDateTime: any;
    instAccountHolderName?: any;
    instAccountNumber?: any;
    instIfscCode?: any;
    instAccountType: string;
    instBankName: string;
    instName: string;
    instRegistrationCode?: any;
    instBranch?: any;
    instShortName: string;
    courseCategory: CourseCategory[];
    instContactPerson: string;
}




