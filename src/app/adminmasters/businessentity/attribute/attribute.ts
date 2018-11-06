export class Attribute {
    attributeId: number;
    attributeName: string;
    attributeCode: string;
    privilegeId: any;

    privileges: Privilege[];
    creationDate?: any;
    createdBy?: any;
    modifiedDate?: any;
    modifiedBy?: any;
}

export class Privilege {
    privilegeId: number;
    privilegeName: string;
}
