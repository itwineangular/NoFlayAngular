// export class ContarctTemplate {
// }
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
export class Plan {
    planId: number;
    planName: string;
    planPrice: number;
    planMembership: string;
    createDateTime: any;
    createdBy: string;
    modifiedDateTime?: number;
    modifiedBy: string;
    startDateTime?: number;
    endDateTime: any;
    planMembershipsArray: PlansObjectForMembership[];
}
export class PlansObjectForMembership {
    planId: number;
    planName: string;
    planPrice: number;
    planMembership: string;
    createDateTime: any;
    createdBy: string;
    modifiedDateTime?: number;
    modifiedBy: string;
    startDateTime?: number;
    endDateTime: any;
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



// latest for get
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

    // export interface PlanEntity {
    //     planId: number;
    //     planName: string;
    //     planPrice: string;
    //     planMembership: string;
    //     createDateTime?: any;
    //     endDate?: any;
    //     modifiedDateTime?: any;
    //     startDateTime?: Date;
    //     createdBy: string;
    //     modifiedBy: string;
    // }

export class DiscountEntity {
    id: number;
    discount: number;
    attributesEntity: AttributesEntity;
    planEntity: PlanEntity;
}

export class ContractTemplate {
    id : any
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
}