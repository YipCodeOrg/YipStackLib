import { Address, isAddress } from "../packages/YipAddress/core/address"
import { areSimpleStringProperties, isTypedArray } from "../util/typePredicates"

export type UserAddressData = {
    sub: string,
    yipCode: string,
    name?: string,
    address: Address,
    registrations: Registration[]
}

export type Registration = {
    name: string,
    hyperlink?: string,
    addressLastUpdated: Date
}

export function isUserAddressDataArray(obj: any): obj is UserAddressData[]{
    return isTypedArray(obj, isUserAddressData)
}

//TODO: Fix this function or get rid of it.
export function isUserAddressData(obj: any): obj is UserAddressData{
    if(!obj){
        return false
    }
    let expectedStringProperties = ["sub", "yipCode"]

    const name = obj.name

    if(!!name){
        expectedStringProperties.push("name")
    }

    if(!areSimpleStringProperties(obj, expectedStringProperties)){        
        return false
    }

    const addres = obj.address

    if(!isAddress(addres)){
        return false
    }

    const registrations = obj.registrations    
    return false && !!registrations
}