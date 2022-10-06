import { isTypedArray, areSimpleStringProperties } from "../../packages/YipAddress/util/typePredicates"
import { liftFieldValidationToItemValidation, validateItemResultArray, validateNameNotBlank, validateStringNotBlank, validateUniqueStr } from "../../packages/YipAddress/validate/commonValidations"
import { ArrayValidationResult, ItemValidationResult, ValidationResult, ValidationSeverity } from "../../packages/YipAddress/validate/validation"

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

export type FriendsValidationResult = ArrayValidationResult<FriendValidationResult>

export function validateFriends(fs: Friend[]) : FriendsValidationResult {
    return validateItemResultArray(fs, validateFriend, validateTopLevelFriends, "friend")
}

const validateFriend = liftFieldValidationToItemValidation(fieldValidateFriend)

function validateTopLevelFriends(topValidationResult: ValidationResult, fs: Friend[], itemValidations: FriendValidationResult[]){
    validateUniqueStr(topValidationResult, fs, f => f.yipCode, itemValidations, v => v.fieldValidations.yipCode, ValidationSeverity.ERROR, "YipCode")
    validateUniqueStr(topValidationResult, fs, f => f.name, itemValidations, v => v.fieldValidations.name, ValidationSeverity.ERROR, "Name")
}

function fieldValidateFriend(f: Friend): FriendFieldValidationResult{
    return {
        name: validateNameNotBlank(f, f => f.name, ValidationSeverity.ERROR),
        yipCode: validateStringNotBlank(f, f => f.yipCode, "YipCode", ValidationSeverity.ERROR)
    }
}