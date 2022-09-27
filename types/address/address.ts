import { Address, isAddress } from "../../packages/YipAddress/types/address/address"
import { SimpleDate } from "../../packages/YipAddress/util/date"
import { areSimpleStringProperties, isString, isTypedArray } from "../../util/typePredicates"
import { Registration } from "../registrations"

export type CreateAddressData = {
    name?: string,
    address: Address    
}

export function isCreateAddressData(obj: any): obj is CreateAddressData{
    const name = obj.name
    if(name !== undefined && !isString(name)){
        return false
    }
    const address = obj.address
    return isAddress(address)
}

// TODO: All of the below is subject to re-design

export type UserAddressData = {
    sub: string,
    name?: string,
    address: AddressItem,    
    registrations: Registration[],
}

export type AddressMetadata = {
    lastUpdated: SimpleDate
}

export function isAddressMetadata(obj: any): obj is AddressMetadata{
    const lastUpdated = obj.lastUpdated
    if(!(lastUpdated instanceof Date)){
        return false
    }
    return true
}

export type AddressItem = {
    address: Address,
    yipCode: string,
    name?: string,
    addressMetadata: AddressMetadata
}

export function isAddressItem(obj: any): obj is AddressItem{
    const name = obj.name
    if(name !== undefined && !isString(name)){
        return false
    }
    if(!isString(obj.yipCode)){
        return false
    }
    const address = obj.address
    if(!isAddress(address)){
        return false
    }
    const metaData = obj.addressMetadata
    if(!isAddressMetadata(metaData)){
        return false
    }
    return true
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