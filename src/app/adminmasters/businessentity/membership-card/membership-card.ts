export class MembershipCard {
    institutionName: string;
    courseCategory : string;
    course : string;
    stdName : string;
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
