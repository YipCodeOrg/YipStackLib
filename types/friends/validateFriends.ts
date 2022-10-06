import { liftFieldValidationToItemValidation, validateNameNotBlank, validateStringNotBlank } from "../../packages/YipAddress/validate/commonValidations"
import { ItemValidationResult, ValidationResult, ValidationSeverity } from "../../packages/YipAddress/validate/validation"
import { Friend } from "./friend"

export type FriendFieldValidationResult = {
    name: ValidationResult,
    yipCode: ValidationResult
}

export type FriendValidationResult = ItemValidationResult<FriendFieldValidationResult>

export const validateCreateAddress: (friend: Friend) => FriendValidationResult
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