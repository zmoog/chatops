/*
 * Required
 */

//variable "project" {
//  description = "Project name"
//}
//
//variable "environment" {
//  description = "Environment (such as dev, ci, prod)"
//}

variable "api_gateway_id" {
  description = "The ID of the REST API."
}

variable "api_gateway_resource_id" {
  description = "The API resource ID where attach the Lambda integration."
}

variable "api_gateway_role_arn" {
  description = "The ARN of the IAM Role used by the API Gateway"
}

variable "api_gateway_lambda_arn" {
  description = "The ARN of the Lambda for the integration"
}

/*
 * Optional
 */

variable "authorization" {
  description = "The type of authorization used for the method (NONE, CUSTOM, AWS_IAM)"
  default     = "NONE"
}

// Unused

variable "method_request_models" {
  type = "map"
  default = {
    "application/json" = "Empty"
  }
}

variable "integration_request_templates" {
  type = "map"
  default = {
    "application/json" = ""
  }
}

variable "integration_response_templates" {
  type = "map"
  default = {
    "application/json" = ""
  }
}

variable "method_response_models" {
  type = "map"
  default = {
    "application/json" = "Empty"
  }
}
