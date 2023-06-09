# CLD_Workshop_Lambda

**Scénario:**

```
//Phase normale
//given
Un Bucker S3 qui tourne, un Lambda qui tourne sous le langage node.js v.18.0.x

//when
On upload une image 

//then
Un trigger lance le Lambda quand un nouvelle élément est ajouté dans le Bucket S3, en l'occurence une image, un traitement sur l'image est effectué par le Lambda et nous retourne l'image modifiée.
```

**Scénario bonus:**

```
//Phase de stress
//given
Un S3 qui tourne, un lambda serveur qui tourne sous le langage node.js v.18.0.x

//when
On upload 1000 images d'un coup 

//then
On monitore la fonction lambda pour voir si d'autres instances se créent
```

## Random things

Each execution context provides 512 MB of additional disk space in the /tmp directory. The directory content remains when the execution context is frozen, providing transient cache that can be used for multiple invocations. You can add extra code to check if the cache has the data that you stored. For information on deployment limits, see AWS Lambda Limits.

## Create bucket


[IN]
aws s3 mb s3://aws.lambda.cld.education.test

[OUT]
make_bucket: aws.lambda.cld.education.test

## Add image to bucket

[IN]
s3 cp .\cat.jpg s3://aws.lambda.cld.education.test

[OUT]
upload: .\cat.jpg to s3://aws.lambda.cld.education.test/cat.jpg

## Create policy

 aws iam create-policy --policy-name cld-s3-trigger --policy-document file://./policy.json

 arn:aws:iam::709024702237:policy/cld-s3-trigger2

## Create execution role

CLD-WS-AWS-LAMBDA

## Create Function

aws lambda create-function --function-name test --runtime nodejs18.x --zip-file fileb://function.zip --handler function.handler --role arn:aws:iam::709024702237:role/CLD-WS-AWS-LAMBDA

aws lambda invoke --function-name test out --log-type Tail --query 'LogResult' --output text |  base64 -d

## ???

aws lambda add-permission --function-name test --action "lambda:InvokeFunction" --principal s3.amazonaws.com --source-arn  arn:aws:s3:::aws.lambda.cld.education.test --statement-id s3-trigger

[OUT]
{
    "Statement": "{\"Sid\":\"s3-trigger\",\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"lambda:InvokeFunction\",\"Resource\":\"arn:aws:lambda:eu-south-1:709024702237:function:test\",\"Condition\":{\"ArnLike\":{\"AWS:SourceArn\":\"arn:aws:s3:::aws.lambda.cld.education.test\"}}}"
}


  ARN BUCKET : arn:aws:s3:::aws.lambda.cld.education.test
[IN]
aws s3api put-bucket-notification-configuration --bucket aws.lambda.cld.education.test --notification-configuration file://configuration.json


## GET statistics

aws cloudwatch get-metric-statistics --namespace AWS/Lambda --metric-name Invocations --dimensions Name=FunctionName,Value=test --start-time 2023-06-06T08:00:00 --end-time 2023-06-07T15:28:00 --period 60 --statistics SampleCount


aws lambda update-function-code --function-name  AWS-CLD-WORKSHOP --zip-file fileb://function.zip

Remove-Item -Path "node_modules/sharp" -Recurse -Force npm install --arch=x64 --platform=linux --libc=glibc sharp


## Marche à suivre

- Modifier le code
- Ziper tout le contenu de src et le renommer function.zip
-  Executer la commande siuvante : 
-  aws lambda update-function-code --function-name  AWS-CLD-WORKSHOP --zip-file fileb://function.zip
-  Ajouter un fichier au bucket une image qui commence par "cat"
    Exemple :  aws s3 cp ../Images/cat2.jpg s3://aws.lambda.cld.education.test