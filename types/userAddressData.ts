import { Address, isAddress } from "../packages/YipAddress/core/address"
import { areSimpleStringProperties, isTypedArray } from "../util/typePredicates"

export type UserAddressData = {
    sub: string,
    yipCode: string,
    address: Address
}

export function isUserAddressDataArray(obj: any): obj is UserAddressData[]{
    return isTypedArray(obj, isUserAddressData)
}

export function isUserAddressData(obj: any): obj is UserAddressData{
    if(!obj){
        return false
    }
    const expectedStringProperties = ["sub", "yipCode"]

    if(!areSimpleStringProperties(obj, expectedStringProperties)){        
        return false
    }

    const addres = obj.address

    return isAddress(addres)
}