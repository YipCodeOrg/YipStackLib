import { areSimpleStringProperties } from "../util/typePredicates"

export type UserAddressData = {
    sub: string,
    yipCode: string,
    //TODO: Change address to structured type
    address: string
}

export function isUserAddressData(obj: any): obj is UserAddressData{
    if(!obj){
        return false
    }
    const expectedStringProperties = ["sub", "yipCode", "address"]

    if(!areSimpleStringProperties(obj, expectedStringProperties)){        
        return false
    }
    return true
}