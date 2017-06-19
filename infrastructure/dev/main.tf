terraform {
  required_version = ">= 0.9, < 0.10"

  backend "s3" {
    bucket = "tierra-chatops-infr"
    key    = "dev/main/terraform.tfstate"
    region = "eu-west-1"
  }
}

module "api" {
  source      = "../components/api"
  environment = "${var.environment}"
  project     = "${var.project}"
  aws_region         = "${var.aws_region}"
  aws_account_id         = "${var.aws_account_id}"
}

module "common" {
  source      = "../components/common"
  environment = "${var.environment}"
  project     = "${var.project}"
}
