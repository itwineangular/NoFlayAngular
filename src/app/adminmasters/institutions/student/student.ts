export class Student {

    stdId: number;
    stdName: string;
    stdMobile?: any;
    stdEmail?: any;
    stdRollnumber?: any;
    addressOne?: any;
    addressTwo?: any;
    city?: any;
    zipCode?: any;
    countryName?: any;
    state?: any;
    createdBy?: any;
    createDateTime?: any;
    modifiedBy?: any;
    modifiedDateTime?: any;
    institutionName?: string;
    courseName?: any;
    courseCategory: string;
    plan?: any;
    status?: any;
    parPhone?: any;
    planAmount?: any;
    planStartDate?: any;
    planEndDate?: any;
    mcmId: string;
    qrImage?: any;

    planPrice : any;
   
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
    createdBy?: any;
    createDateTime: Date;
    modifiedBy?: any;
    modifiedDateTime: Date;
    courseCategoryVos: CourseCategory[];
}

export class CourseCategory {
    categoryId: number;
    categoryCode: string;
    categoryName: string;
    status: string;
    creationDate?: any;
    createdBy?: any;
    modifiedDate?: any;
    modifiedBy?: any;
    courseProfileVos: CourseProfile[];
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
    instFax: string;
    instEmail: string;
    instCourseOffered: string;
    instStatus?: boolean;
    instCourseCode: string;
    instMobile: string;
    instPhone?: number;
    instBankBranch: string;
    instAccountHolderName: string;
    instAccountNumber?: number;
    instIfscCode: string;
    instAccountType: string;
    instBankName: string;
    instName: string;
    instRegistrationCode: string;
    instBranch: string;
    instShortName: string;
    instModifiedBy?: any;
    instModifiedDateTime?: Date;
    instCreatedBy?: any;
    instCreateDateTime?: Date;
    courseCategoryVos: CourseCategory[];
    instContactPerson?: any;
}


// export class CourseProfile {
//     courseId: number;
//     courseName: string;
//     courseCode: string;
//     duration: string;
//     categoryName: string;
//     createdBy: string;
//     createDateTime: any;
//     modifiedBy: string;
//     modifiedDateTime: any;
    
// }

// export class CourseCategory {
//     categoryId: number;
//     categoryCode: string;
//     categoryName: string;
//     status: string;
//     creationDate: any;
//     createdBy: string;
//     modifiedDate: any;
//     modifiedBy: string;
//     courseProfile: CourseProfile[];
// }

// export class Institution {
//     institutionId: number;
//     instDesignation: string;
//     instAddressone: string;
//     instAddresstwo: string;
//     instCity: string;
//     instState: string;
//     instPincode: string;
//     instCountryname: string;
//     instFax?: any;
//     instEmail: string;
//     instCourseOffered?: any;
//     instStatus?: any;
//     instCourseCode?: any;
//     instMobile: string;
//     instPhone: number;
//     instCreatedBy?: any;
//     instCreateDateTime: any;
//     instBankBranch: string;
//     instModifiedBy?: any;
//     instModifiedDateTime: any;
//     instAccountHolderName?: any;
//     instAccountNumber?: any;
//     instIfscCode?: any;
//     instAccountType: string;
//     instBankName: string;
//     instName: string;
//     instRegistrationCode?: any;
//     instBranch?: any;
//     instShortName: string;
//     courseCategory: CourseCategory[];
//     instContactPerson: string;
// }




