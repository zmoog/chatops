/*
 * Required
 */

variable "project" {
  description = "Project name"
}

variable "environment" {
  description = "Environment (such as dev, ci, prod)"
}

variable "aws_region" {
  description = "AWS Region"
}

variable "aws_account_id" {
  description = "AWS account ID"
}
