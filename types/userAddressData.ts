import { Address, isAddress } from "../packages/YipAddress/core/address"
import { areSimpleStringProperties, isStringArray, isTypedArray } from "../util/typePredicates"

export type UserAddressData = {
    sub: string,
    yipCode: string,
    name?: string,
    address: Address,
    registrations: string[]
}

export function isUserAddressDataArray(obj: any): obj is UserAddressData[]{
    return isTypedArray(obj, isUserAddressData)
}

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
    if(!isStringArray(registrations)){
        return false
    }
    return true
}