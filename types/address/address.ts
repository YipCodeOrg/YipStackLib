import { Address, isAddress } from "../../packages/YipAddress/types/address/address"
import { areSimpleStringProperties, isTypedArray } from "../../util/typePredicates"
import { Registration } from "../registrations"

export type CreateAddressData = {
    name?: string,
    address: Address    
}

// TODO: All of the below is subject to re-design

export type UserAddressData = {
    sub: string,
    name?: string,
    address: AddressItem,    
    registrations: Registration[],
}

export type AddressMetadata = {
    lastUpdated: Date
}

export type AddressItem = {
    address: Address,
    yipCode: string,
    addressMetadata: AddressMetadata
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