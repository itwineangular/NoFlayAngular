export class Attribute {
    attributeId: number;
    attributeName: string;
    attributeCode: string;
    privilegeId: any;

    privilegeVos: privilegeVos[];
    creationDate?: any;
    createdBy?: any;
    modifiedDate?: any;
    modifiedBy?: any;
}

export class privilegeVos {
    privilegeId: number;
    privilegeName: string;
}
