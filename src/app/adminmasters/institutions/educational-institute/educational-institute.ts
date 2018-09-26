export class EducationalInstitute {
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
    instCourseCode: string;
    instStatus?: boolean;
    instMobile: number;
    instPhone: number;
    instCreatedBy: string;
    instCreateDateTime: any;
    instBankBranch: string;
    instModifiedBy: string;
    instModifiedDateTime: any;
    instAccountHolderName: string;
    instAccountNumber: number;
    instIfscCode: string;
    instAccountType: string;
    instBankName: string;
    instName: string;
    instRegistrationCode: string;
    instBranch: string;
    instShortName: string;
    instContactPerson: string;
    courseProfiles: object[] = [];
    // courseProfiles : []
    // courseProfiles : Array<object>
}

export class SelectedCourses {
    courseId: string;
}

export interface CourseProfile {
    courseId: string;
    courseName: string;
    courseCode: string;
    duration: string;
}

export interface CourseCategory {
    categoryId: string;
    categoryCode: string;
    categoryName: string;
    status: string;
    creationDate: string;
    createdBy: string;
    courseProfile: CourseProfile[];
}
