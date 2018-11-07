export class StudentRegistration 
{
    stdId: number;
    stdName: string;
    stdMobile?: any;
    stdEmail?: any;
    stdRollnumber?: any;
    institutionName?: any;
    courseName?: any;
    courseCategory: string;
    plan?: any;
    createdBy?: any;
    createDateTime?: any;
    modifiedBy?: any;
    modifiedDateTime?: any;

   
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
    courseCategoryVos: CourseCategory[];
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
    // courseProfile: CourseProfile[];
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
    // courseCategory: CourseCategory[];
    courseCategoryVos: CourseCategory[];
    instContactPerson: string;
}


