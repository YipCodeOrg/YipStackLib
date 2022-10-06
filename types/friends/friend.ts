import { isTypedArray, areSimpleStringProperties } from "../../packages/YipAddress/util/typePredicates"
import { ItemValidationResult, ValidationResult } from "../../packages/YipAddress/validate/validation"

export type Friend = {
    yipCode: string,
    name: string
}

export function isFriendArray(obj: any): obj is Friend[]{
    return isTypedArray(obj, isFriend)
}

export function isFriend(obj: any): obj is Friend{
    if(!areSimpleStringProperties(obj, ["yipCode", "name"])){
        return false
    }
    return true
}

export type FriendFieldValidationResult = {
    name: ValidationResult,
    yipCode: ValidationResult
}

export type FriendValidationResult = ItemValidationResult<FriendFieldValidationResult>