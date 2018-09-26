export class PlansObject {
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

export class MembershipObject {
    membership_id: number;
    memberName: string;
    createdBy?: any;
    createDateTime: any;
    modifiedBy?: any;
    modifiedDateTime: any;
}

export class PlanNameObject {
    plannameId: number;
    planName: string;
    createdBy?: any;
    createDateTime: number;
    modifiedBy?: any;
    modifiedDateTime: number;
}