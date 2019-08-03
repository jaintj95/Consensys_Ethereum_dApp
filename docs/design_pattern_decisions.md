
# Smart Contract Design Patterns

Reference - Bootcamp Module 10   

1) **Fail early and fail loud** - `require` was used wherever necessary instead of `if`  

2) **Restricting Access** - function modifiers were used wherever necesarry to restrict access to admin specific functions.  
E.g. `verifyAdmin()` modifier in AdminPanel.sol  

3) **Circuit Breaker** - AdminPanel uses a circuit breaker that stops new Job Posters from requesting access until Admin re-enables the contract.  
  
### Other Patterns that were not used - 
I am new to the whole concept of blockchain as well as dApp development so I skipped the following patterns to focus on getting the project working. However, I will use these patterns in a future project.  
  
1) Auto Deprecation  
2) Mortal  
3) Pull over Push Payments (also known as the Withdrawal Pattern)  
4) State Machine  
5) Speed Bump
