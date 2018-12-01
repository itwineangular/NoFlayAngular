export class BusinessEntity {
    businessId: number;
    name: string;
    registrationCode: string;
    businessCategoryCode: string;
    shortname: string;
    contactPerson: string;
    designation: string;
    address1: string;
    address2: string;
    country: string;
    state: string;
    city: string;
    pincode?: any;
    mobile?: any;
    phone?: any;
    fax?: any;
    accountHolderName?: any;
    accountNumber?: any;
    ifscCode?: any;
    accountType?: any;
    bankName?: any;
    bankBranch?: any;
    offers?: any;
    privilegesList:PrivilegeCategory[];
}

export class SelectedServices {
    attributeId: string;
}

export class Attribute{
    attributeId: number;
    attributeName: string;
    attributeCode: string;
    creationDate?: any;
    createdBy?: any;
    modifiedDate?: any;
    modifiedBy?: any;
    privilegesList: PrivilegeCategory[];
    isSelected : boolean;
}

export class PrivilegeCategory {
    privilegeId: number;
    privilegeName: string;
    attributes: Attribute[];
    isSelected : boolean;
}