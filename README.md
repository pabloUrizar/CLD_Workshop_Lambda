# CLD_Workshop_Lambda

Scénario:
//**Initial launching**
//given


//when
Waiting few secondes

//then
A first Drupal instance is in "pending" status.

//**Stress phase*
//given
One instance "Drupal" is running.
Using the stress utility, load the CPU.

//then
The CPU load exceeds 30%.

//when
A second, third and fourth "Drupal" instance are launched.

//**Return to normal phase**
//given
Stop the stress command. Via Htop you can see that the stress is below 30% again.

//when
After several minutes, the AWS Monitoring (Cloud Watch) detects the drop in load.

//then
Gradually the instances are terminated, until only one remains active.
