<!-- Answers to the Short Answer Essay Questions go here -->

1. What is the purpose of using _sessions_?

Sessions let data persist across requests. This can be used with authentication information so that the client doesn't need to re-enter the information every time they make a new request.

2. What does bcrypt do to help us store passwords in a secure manner.

Bcrypt uses an algorythm and a 'secret' to hash passwords irreversably.

3. What does bcrypt do to slow down attackers?

Bcrypt allows for multiple iterations of hashing the password, slowing down brute force attacks significantly.

4. What are the three parts of the JSON Web Token?

The header, the payload, and the signature.
