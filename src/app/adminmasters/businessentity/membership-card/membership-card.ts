export class MembershipCard {
    institutionName: string;
    courseCategory : string;
    courseName : string;
    stdName : string;
    status : string;
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
    // categoryId: number;
    // categoryCode: string;
    // categoryName: string;
    // status: string;
    // creationDate: any;
    // createdBy: string;
    // modifiedDate: any;
    // modifiedBy: string;
    // courseProfile: CourseProfile[];

    categoryId: number;
    categoryCode: string;
    categoryName: string;
    status: string;
    creationDate?: any;
    createdBy?: any;
    modifiedDate?: any;
    modifiedBy?: any;
    courseProfileVos: any[];
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

export  class selectedStudents
{
    stdName:string;
    course: string;
    stdEmail:string;
    institutionName:string;
    plan:string;
    planAmount:number;
    courseCategory:string;
    membershipType: string;
    stdId: number;
}

export class StudentCard {
    studentName: string;
    studentMcmId : string;
    studentPlan : string;
    studentQrCode : string;
}