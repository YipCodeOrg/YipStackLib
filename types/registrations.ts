import { isSimpleDate, SimpleDate, simpleDateToDate } from "../packages/YipAddress/util/date"
import { isString, isTypedArray } from "../packages/YipAddress/util/typePredicates"
import { liftFieldValidationToItemValidation, validateItemResultArray, validateNameNotBlank, validateUniqueStr } from "../packages/YipAddress/validate/commonValidations"
import { ArrayValidationResult, ItemValidationResult, newEmptyValidationResult, ValidationResult, ValidationSeverity } from "../packages/YipAddress/validate/validation"

export type Registration = {
    name: string,
    hyperlink?: string,
    addressLastUpdated: SimpleDate
}

export function isRegistration(obj: any): obj is Registration{
    if(obj === undefined){
        return false
    }
    if(!isString(obj.name)){
        return false
    }
    const hyperlink = obj.hyperlink
    if(hyperlink !== undefined && !isString(hyperlink)){
        return false
    }
    if(!isSimpleDate(obj.addressLastUpdated)){
        return false
    }
    return true
}

export function isRegistrations(obj: any): obj is Registration[]{
    return isTypedArray(obj, isRegistration)
}

export type RegistrationFieldValidationResult = {
    name: ValidationResult
}

export type RegistrationValidationResult = ItemValidationResult<RegistrationFieldValidationResult>

export type RegistrationsValidationResult = ArrayValidationResult<RegistrationValidationResult>

export function validateRegistrations(rs: Registration[]): RegistrationsValidationResult{    
    return validateItemResultArray(rs, validateRegistration, validateTopLevelRegistrations, "registration")
}

const validateRegistration = liftFieldValidationToItemValidation(fieldValidateRegistration)

function validateTopLevelRegistrations(topValidationResult: ValidationResult, rs: Registration[], 
    itemValidations: RegistrationValidationResult[]){
    validateUniqueStr(topValidationResult, rs, r => r.name, itemValidations, v => v.fieldValidations.name, ValidationSeverity.ERROR, "Name")
}

function fieldValidateRegistration(r: Registration): RegistrationFieldValidationResult{
    return {
        name: validateNameNotBlank(r, r => r.name, ValidationSeverity.ERROR)
    }
}

export const EmptyRegistrationValidationResult: RegistrationValidationResult = {
    topValidationResult: newEmptyValidationResult(),
    fieldValidations: {
        name: newEmptyValidationResult()
    }    
}

export function isRegistrationUpToDate(registration: Registration, date: Date){
    const lastUpdatedAsDate = simpleDateToDate(registration.addressLastUpdated)
    return lastUpdatedAsDate > date
}
