# CLD_Workshop_Lambda

**Scénario:**

//given
Un S3 qui tourne, un lambda serveur qui tourne sous le langage node.js v.18.0.x

//when
On upload une image 

//then
S3 appelle la fonction lambda qui s'exécute (un traitement d'image quelconque ex: compression, conversion etc)

Scénario bonus
//**Phase de stress**
//given
Un S3 qui tourne, un lambda serveur qui tourne sous le langage node.js v.18.0.x

//when
On upload 1000 images d'un coup 

//then
On monitore la fonction lambda pour voir si d'autres instances se créent

