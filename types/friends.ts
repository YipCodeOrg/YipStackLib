import { validateNameNotBlank, validateStringNotBlank, validateUniqueStr } from "../packages/YipAddress/validate/commonValidations"
import { newEmptyValidationResult, ValidationResult, ValidationSeverity } from "../packages/YipAddress/validate/validation"

export type Friend = {
    yipCode: string,
    name: string
}

export type FriendValidationResult = {
    name: ValidationResult,
    yipCode: ValidationResult
}

export type FriendsValidationResult = {
    topValidationResult: ValidationResult,
    itemValidations: FriendValidationResult[]
}

export function validateFriends(fs: Friend[]) : FriendsValidationResult {
    const itemValidations = validateItems(fs)
    const topValidationResult = validateTopLevel(fs, itemValidations)
    return {
        topValidationResult,
        itemValidations
    }
}

function validateTopLevel(fs: Friend[], itemValidations: FriendValidationResult[]): ValidationResult{
    const validation = newEmptyValidationResult()
    validateUniqueStr(validation, fs, f => f.yipCode, itemValidations, v => v.yipCode, ValidationSeverity.ERROR, "YipCode")
    validateUniqueStr(validation, fs, f => f.name, itemValidations, v => v.name, ValidationSeverity.ERROR, "Name")
    return validation
}

function validateItems(fs: Friend[]): FriendValidationResult[]{
    return fs.map(f => validateFriend(f))
}

export function validateFriend(f: Friend): FriendValidationResult{
    return {
        name: validateNameNotBlank(f, f => f.name),
        yipCode: validateStringNotBlank(f, f => f.yipCode, "YipCode")
    }
}