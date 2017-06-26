terraform {
  required_version = ">= 0.9, < 0.10"
}

/*
 * Resources
 */

module "api-gateway" {
  source      = "../../modules/api-gateway"
  project     = "${var.project}"
  environment = "${var.environment}"
}

resource "aws_api_gateway_resource" "slack" {
  rest_api_id = "${module.api-gateway.id}"
  parent_id   = "${module.api-gateway.root_resource_id}"
  path_part   = "slack"
}

//resource "aws_api_gateway_resource" "commands" {
//  rest_api_id = "${module.api-gateway.id}"
//  parent_id   = "${aws_api_gateway_resource.slack.id}"
//  path_part   = "commands"
//}

resource "aws_api_gateway_resource" "events" {
  rest_api_id = "${module.api-gateway.id}"
  parent_id   = "${aws_api_gateway_resource.slack.id}"
  path_part   = "events"
}


////// Integration
//
//module "lambda-slack-commands" {
//  source                  = "../../modules/api-gateway/integration-lambda"
//  api_gateway_id          = "${module.api-gateway.id}"
//  api_gateway_resource_id = "${aws_api_gateway_resource.commands.id}"
//  api_gateway_role_arn    = "${module.api-gateway.role_arn}"
//
//  api_gateway_lambda_arn = "${format("arn:aws:apigateway:%s:lambda:path/2015-03-31/functions/arn:aws:lambda:%s:%s:function:%s_%s_%s:%s/invocations", var.aws_region, var.aws_region, var.aws_account_id, var.project, var.environment, "hello", "$LATEST")}"
//
//  integration_request_templates = {
//    "application/x-www-form-urlencoded" = <<EOF
//## convert HTML POST data or HTTP GET query string to JSON
//
//## get the raw post data from the AWS built-in variable and give it a nicer name
//#if ($context.httpMethod == "POST")
// #set($rawAPIData = $input.path('$'))
//#elseif ($context.httpMethod == "GET")
// #set($rawAPIData = $input.params().querystring)
// #set($rawAPIData = $rawAPIData.toString())
// #set($rawAPIDataLength = $rawAPIData.length() - 1)
// #set($rawAPIData = $rawAPIData.substring(1, $rawAPIDataLength))
// #set($rawAPIData = $rawAPIData.replace(", ", "&"))
//#else
// #set($rawAPIData = "")
//#end
//
//## first we get the number of "&" in the string, this tells us if there is more than one key value pair
//#set($countAmpersands = $rawAPIData.length() - $rawAPIData.replace("&", "").length())
//
//## if there are no "&" at all then we have only one key value pair.
//## we append an ampersand to the string so that we can tokenise it the same way as multiple kv pairs.
//## the "empty" kv pair to the right of the ampersand will be ignored anyway.
//#if ($countAmpersands == 0)
// #set($rawPostData = $rawAPIData + "&")
//#end
//
//## now we tokenise using the ampersand(s)
//#set($tokenisedAmpersand = $rawAPIData.split("&"))
//
//## we set up a variable to hold the valid key value pairs
//#set($tokenisedEquals = [])
//
//## now we set up a loop to find the valid key value pairs, which must contain only one "="
//#foreach( $kvPair in $tokenisedAmpersand )
// #set($countEquals = $kvPair.length() - $kvPair.replace("=", "").length())
// #if ($countEquals == 1)
//  #set($kvTokenised = $kvPair.split("="))
//  #if ($kvTokenised[0].length() > 0)
//   ## we found a valid key value pair. add it to the list.
//   #set($devNull = $tokenisedEquals.add($kvPair))
//  #end
// #end
//#end
//
//## next we set up our loop inside the output structure "{" and "}"
//{
//#foreach( $kvPair in $tokenisedEquals )
//  ## finally we output the JSON for this pair and append a comma if this isn't the last pair
//  #set($kvTokenised = $kvPair.split("="))
// "$util.urlDecode($kvTokenised[0])" : #if($kvTokenised[1].length() > 0)"$util.urlDecode($kvTokenised[1])"#{else}""#end#if( $foreach.hasNext ),#end
//#end
//}
//EOF
//  }
//}

module "lambda-slack-events" {
  source                  = "../../modules/api-gateway/integration-lambda"

  api_gateway_id          = "${module.api-gateway.id}"
  api_gateway_resource_id = "${aws_api_gateway_resource.events.id}"
  api_gateway_role_arn    = "${module.api-gateway.role_arn}"

  api_gateway_lambda_arn = "${format("arn:aws:apigateway:%s:lambda:path/2015-03-31/functions/arn:aws:lambda:%s:%s:function:%s_%s_%s:%s/invocations", var.aws_region, var.aws_region, var.aws_account_id, var.project, var.environment, "process_events", "$LATEST")}"
}

////// Integration

resource "aws_api_gateway_deployment" "api-gateway-deployment" {
  stage_name  = "v0"
  rest_api_id = "${module.api-gateway.id}"

  depends_on = [
//    "aws_api_gateway_resource.commands",
//    "module.lambda-slack-commands",
    "module.lambda-slack-events"
  ]
}
