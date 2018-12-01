
export class BusinessProfileEntity {
    businessId: number;
    name: string;
    registrationCode?: any;
    businessCategoryCode?: any;
    shortname?: any;
    contactPerson?: any;
    designation?: any;
    address1?: any;
    address2?: any;
    country?: any;
    state?: any;
    city?: any;
    pincode?: any;
    mobile?: any;
    phone?: any;
    fax?: any;
    email?: any;
    accountHolderName?: any;
    accountNumber?: any;
    ifscCode?: any;
    accountType?: any;
    bankName?: any;
    bankBranch?: any;
    status?: any;
    offers?: any;
    modifiedBy?: any;
    modifiedDateTime?: any;
    createdBy?: any;
    createDateTime: Date;
    privilegeList: any[];
}

export class AttributesEntity {
    // attributeId: number;
    // name: string;

    attributeId: number;
    attributeName: string;
    attributeCode: string;
    privilegesList?: any;
    creationDate?: any;
    createdBy?: any;
    modifiedDate?: any;
    modifiedBy?: any;
}

export class PlanEntity {
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

export class DiscountEntity {
    id: number;
    discount: number;
    attributesEntity: AttributesEntity;
    planEntity: PlanEntity;
}

export class ContractObject{
    id: number;
    actInd: string;
    name: string;
    startDate: Date;
    endDate: Date;
    createDate: Date;
    createdBy: string;
    modifiedDate?: any;
    modifiedBy?: any;
    businessProfileEntity: BusinessProfileEntity;
    discountEntities: DiscountEntity[];
    businessId: number;
}


export class DiscountEntityExtended {
    attributesEntityExtended: AttributesEntityExtended;
   }

export class AttributesEntityExtended {
    id: number;
    name: string;
    isSelected : boolean; 
    planEntityExtended: PlanEntityExtended[];
}

export class PlanEntityExtended {
    id: number;
    name: string;
    discount: number;
}

export class ContractTemplate {
    contractTemplateId: number;
    contractTemplateName: string;
    actInd?: any;
    createDate: Date;
    createdBy?: any;
    modifiedDate?: any;
    modifiedBy?: any;
    startDate?: any;
    endDate?: any;
    discountEntities: DiscountEntity[];
    name: string;
}



