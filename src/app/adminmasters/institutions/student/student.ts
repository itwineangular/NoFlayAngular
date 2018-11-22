
export class Institution {
    institutionId: number;
    instDesignation: string;
    instAddressone?: any;
    instAddresstwo?: any;
    instCity?: any;
    instState?: any;
    instPincode?: any;
    instCountryname?: any;
    instFax?: any;
    instEmail?: any;
    instCourseOffered?: any;
    instStatus?: any;
    instCourseCode?: any;
    instMobile?: any;
    instPhone?: any;
    instBankBranch?: any;
    instAccountHolderName?: any;
    instAccountNumber?: any;
    instIfscCode?: any;
    instAccountType?: any;
    instBankName?: any;
    instName: string;
    instRegistrationCode?: any;
    instBranch?: any;
    instShortName?: any;
    instModifiedBy?: any;
    instModifiedDateTime?: any;
    instCreatedBy?: any;
    instCreateDateTime: Date;
    courseCategoryList?: any;
    categoryMappingEntities?: any;
    instContactPerson?: any;
    courseCategoryVos: any;
}

export class CourseCategory {
    categoryId: number;
    categoryCode: string;
    categoryName: string;
    status?: any;
    creationDate: Date;
    createdBy?: any;
    modifiedDate: Date;
    modifiedBy?: any;
    courseProfileList?: any;
    categoryMappingEntities?: any;
    courseProfileVos:any;
}

export class CourseProfile {
    courseId: number;
    courseName: string;
    courseCode: string;
    duration?: any;
    createdBy?: any;
    createDateTime: Date;
    modifiedBy?: any;
    modifiedDateTime: Date;
    courseCategoryList?: any;
}

export class PlanNameObject {
    planId: number;
    planName: string;
    planPrice: number;
    planMembership: string;
    createDateTime?: any;
    createdBy?: any;
    modifiedDateTime?: any;
    modifiedBy?: any;
    startDateTime?: any;
    endDateTime?: any;
}

export class Status {

    statusId: number;
    status: string;
}

export class Student { 
   
    stdId: number;
    mcmId?: any;
    actInd?: any;
    stdName: string;
    stdMobile: number;
    stdEmail: string;
    stdRollnumber: number;
    createdBy?: any;
    createDateTime?: any;
    modifiedBy?: any;
    modifiedDateTime?: any;
    institution: Institution;
    courseCategory: CourseCategory;
    courseProfile: CourseProfile;
    plan: PlanNameObject;
    status: Status;
    qrImage?: any;
    planStartDate?: any;
    planEndDate?: any;
    gender: string;
    addressOne: string;
    addressTwo: string;
    countryName: string;
    state: string;
    city: string;
    zipCode: number;
    yearOfJoining?: any;
    institutionName: string;
    categoryName: string;
    courseName: string;
    planName: string;
    institutionId?: any;
    categoryId?: any;
    courseId?: any;
    planId?: any;
    statusId: any;
    statusName: any;
    membershipType:any;
    
}




