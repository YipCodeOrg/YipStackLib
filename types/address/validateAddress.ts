import { AddressValidationResult, validateAddress } from "../../packages/YipAddress/types/address/validateAddress";
import { liftFieldValidationToItemValidation, validateNameNotBlank } from "../../packages/YipAddress/validate/commonValidations";
import { ItemValidationResult, newEmptyValidationResult, ValidationResult } from "../../packages/YipAddress/validate/validation";
import { CreateAddressData } from "./address";

export type CreateAddressDataFieldValidationResult = {
    name: ValidationResult,
    address: AddressValidationResult
}

export type CreateAddressValidationResult = ItemValidationResult<CreateAddressDataFieldValidationResult>

export const validateCreateAddress: (data: CreateAddressData) => CreateAddressValidationResult
    = liftFieldValidationToItemValidation(fieldValidateCreateAddress)

function fieldValidateCreateAddress(data: CreateAddressData): CreateAddressDataFieldValidationResult{
    return {
        name: validateName(data),
        address: validateAddress(data.address)
    }
}

function validateName(data: CreateAddressData){
    if(data.name !== undefined){
        return validateNameNotBlank(data, d => d.name)
    } else {
        return newEmptyValidationResult()
    }
}