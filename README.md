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
aws s3api create-bucket --bucket aws.lambda.cld.education.test --region eu-south-1  --create-bucket-configuration LocationConstraint=eu-south-1

[OUT]
{
    "Location": "http://aws.lambda.cld.education.test.s3.amazonaws.com/"
}
