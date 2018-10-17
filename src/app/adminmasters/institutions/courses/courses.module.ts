// export class Course {
//     courseId: number;
//     courseName: string;
//     courseCode: string;
//     duration: string;
//     categoryName: string;
//     categoryCode: string;
//     createdBy: string; 
//     createDateTime?: number;
//     modifiedBy: string;
//     modifiedDateTime?: number;

// }

export class CourseCategoryVo {
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

export class Course {
    courseId: number;
    courseName: string;
    courseCode: string;
    duration?: any;
    createdBy?: any;
    createDateTime?: any;
    modifiedBy?: any;
    modifiedDateTime?: any;
    categoryName: string;
    courseCategoryVos: CourseCategoryVo[];
}

export class courseSearchObject
{
    courseName: string;
    courseCode: string;
    duration: string;
    categoryName: string;
}
