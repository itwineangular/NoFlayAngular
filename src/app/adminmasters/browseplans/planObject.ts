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

