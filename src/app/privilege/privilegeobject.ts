export class AttributesEntity {
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
    planPrice: string;
    planMembership: string;
    createDateTime?: any;
    endDate?: any;
    modifiedDateTime?: any;
    startDateTime?: any;
    createdBy: string;
    modifiedBy: string;
}

export class DiscountEntity {
    id: number;
    discount: number;
    attributesEntity: AttributesEntity;
    planEntity: PlanEntity;
}

export class ContractTemplate {
    id: number;
    actInd: string;
    name: string;
    startDate: Date;
    endDate: Date;
    createDate?: any;
    createdBy?: any;
    modifiedDate?: any;
    modifiedBy?: any;
    businessProfileEntity?: any;
    discountEntities: DiscountEntity[];
}



