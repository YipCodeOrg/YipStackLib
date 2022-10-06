import { liftFieldValidationToItemValidation, validateItemResultArray, validateNameNotBlank, validateStringNotBlank, validateUniqueStr } from "../../packages/YipAddress/validate/commonValidations"
import { ArrayValidationResult, ItemValidationResult, ValidationResult, ValidationSeverity } from "../../packages/YipAddress/validate/validation"
import { Friend } from "./friend"

export type FriendFieldValidationResult = {
    name: ValidationResult,
    yipCode: ValidationResult
}

export type FriendValidationResult = ItemValidationResult<FriendFieldValidationResult>

export const validateFriend: (friend: Friend) => FriendValidationResult
    = liftFieldValidationToItemValidation(fieldValidateFriend)

function fieldValidateFriend(friend: Friend): FriendFieldValidationResult{
    return {
        name: validateName(friend),
        yipCode: validateYipCode(friend)
    }
}

function validateName(friend: Friend){    
    return validateNameNotBlank(friend, d => d.name, ValidationSeverity.ERROR)
}

function validateYipCode(friend: Friend){    
    return validateStringNotBlank(friend, d => d.name, "YipCode", ValidationSeverity.ERROR)
}

export type FriendsValidationResult = ArrayValidationResult<FriendValidationResult>

export function validateFriends(fs: Friend[]) : FriendsValidationResult {
    return validateItemResultArray(fs, validateFriend, validateTopLevelFriends, "friend")
}

function validateTopLevelFriends(topValidationResult: ValidationResult, fs: Friend[], itemValidations: FriendValidationResult[]){
    validateUniqueStr(topValidationResult, fs, f => f.yipCode, itemValidations, v => v.fieldValidations.yipCode, ValidationSeverity.ERROR, "YipCode")
    validateUniqueStr(topValidationResult, fs, f => f.name, itemValidations, v => v.fieldValidations.name, ValidationSeverity.ERROR, "Name")
}