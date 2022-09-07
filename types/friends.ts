import { liftFieldValidationToItemValidation, validateItemResultArray, validateNameNotBlank, validateStringNotBlank, validateUniqueStr } from "../packages/YipAddress/validate/commonValidations"
import { ArrayValidationResult, ItemValidationResult, ValidationResult, ValidationSeverity } from "../packages/YipAddress/validate/validation"

export type Friend = {
    yipCode: string,
    name: string
}

export type FriendFieldValidationResult = {
    name: ValidationResult,
    yipCode: ValidationResult
}

export type FriendValidationResult = ItemValidationResult<FriendFieldValidationResult>

export type FriendsValidationResult = ArrayValidationResult<FriendValidationResult>

export function validateFriends(fs: Friend[]) : FriendsValidationResult {
    return validateItemResultArray(fs, validateFriend, validateTopLevelFriends)
}

const validateFriend = liftFieldValidationToItemValidation(fieldValidateFriend)

function validateTopLevelFriends(topValidationResult: ValidationResult, fs: Friend[], itemValidations: FriendValidationResult[]){
    validateUniqueStr(topValidationResult, fs, f => f.yipCode, itemValidations, v => v.fieldValidations.yipCode, ValidationSeverity.ERROR, "YipCode")
    validateUniqueStr(topValidationResult, fs, f => f.name, itemValidations, v => v.fieldValidations.name, ValidationSeverity.ERROR, "Name")
}

function fieldValidateFriend(f: Friend): FriendFieldValidationResult{
    return {
        name: validateNameNotBlank(f, f => f.name),
        yipCode: validateStringNotBlank(f, f => f.yipCode, "YipCode")
    }
}