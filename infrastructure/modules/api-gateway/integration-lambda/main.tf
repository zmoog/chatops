terraform {
  required_version = ">= 0.9, < 0.10"
}

/*
 * Resources
 */

resource "aws_api_gateway_method" "request_method" {
  rest_api_id   = "${var.api_gateway_id}"
  resource_id   = "${var.api_gateway_resource_id}"
  http_method   = "POST"
  authorization = "${var.authorization}"
}

resource "aws_api_gateway_integration" "request_integration" {
  rest_api_id             = "${var.api_gateway_id}"
  resource_id             = "${var.api_gateway_resource_id}"
  http_method             = "${aws_api_gateway_method.request_method.http_method}"
  integration_http_method = "POST"
  type                    = "AWS"
  uri                     = "${var.api_gateway_lambda_arn}"
  credentials             = "${var.api_gateway_role_arn}"

  //

  request_templates {
    "application/x-www-form-urlencoded" = <<EOF
## convert HTML POST data or HTTP GET query string to JSON

## get the raw post data from the AWS built-in variable and give it a nicer name
#if ($context.httpMethod == "POST")
 #set($rawAPIData = $input.path('$'))
#elseif ($context.httpMethod == "GET")
 #set($rawAPIData = $input.params().querystring)
 #set($rawAPIData = $rawAPIData.toString())
 #set($rawAPIDataLength = $rawAPIData.length() - 1)
 #set($rawAPIData = $rawAPIData.substring(1, $rawAPIDataLength))
 #set($rawAPIData = $rawAPIData.replace(", ", "&"))
#else
 #set($rawAPIData = "")
#end

## first we get the number of "&" in the string, this tells us if there is more than one key value pair
#set($countAmpersands = $rawAPIData.length() - $rawAPIData.replace("&", "").length())

## if there are no "&" at all then we have only one key value pair.
## we append an ampersand to the string so that we can tokenise it the same way as multiple kv pairs.
## the "empty" kv pair to the right of the ampersand will be ignored anyway.
#if ($countAmpersands == 0)
 #set($rawPostData = $rawAPIData + "&")
#end

## now we tokenise using the ampersand(s)
#set($tokenisedAmpersand = $rawAPIData.split("&"))

## we set up a variable to hold the valid key value pairs
#set($tokenisedEquals = [])

## now we set up a loop to find the valid key value pairs, which must contain only one "="
#foreach( $kvPair in $tokenisedAmpersand )
 #set($countEquals = $kvPair.length() - $kvPair.replace("=", "").length())
 #if ($countEquals == 1)
  #set($kvTokenised = $kvPair.split("="))
  #if ($kvTokenised[0].length() > 0)
   ## we found a valid key value pair. add it to the list.
   #set($devNull = $tokenisedEquals.add($kvPair))
  #end
 #end
#end

## next we set up our loop inside the output structure "{" and "}"
{
#foreach( $kvPair in $tokenisedEquals )
  ## finally we output the JSON for this pair and append a comma if this isn't the last pair
  #set($kvTokenised = $kvPair.split("="))
 "$util.urlDecode($kvTokenised[0])" : #if($kvTokenised[1].length() > 0)"$util.urlDecode($kvTokenised[1])"#{else}""#end#if( $foreach.hasNext ),#end
#end
}
EOF
  }
}

resource "aws_api_gateway_integration_response" "integration-response-200" {
  rest_api_id = "${var.api_gateway_id}"
  resource_id = "${var.api_gateway_resource_id}"
  http_method = "${aws_api_gateway_method.request_method.http_method}"
  status_code = "${aws_api_gateway_method_response.method-response-200.status_code}"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = "'*'"
  }

  response_templates = {
    //    "application/json" = "${var.integration_response_template}"
    //    "application/json" = "#set($inputRoot = $input.path('$')){}"
    "application/json" = ""
  }

  //  depends_on = ["aws_api_gateway_integration.ResourceMethodIntegration"]
}

resource "aws_api_gateway_method_response" "method-response-200" {
  rest_api_id = "${var.api_gateway_id}"
  resource_id = "${var.api_gateway_resource_id}"
  http_method = "${aws_api_gateway_method.request_method.http_method}"
  status_code = "200"

  response_models = {
    //    "application/json" = "${var.response_model}"
    "application/json" = "Empty"
  }

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = true
  }

  //  depends_on = ["aws_api_gateway_integration.ResourceMethodIntegration"]
}
