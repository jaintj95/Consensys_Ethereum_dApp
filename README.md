
# Consensys Blockchain Developer Bootcamp Project

## **Bounty dApp**

  

Description: A bounty dApp where people can post or submit work.

As a job poster, I can create a new bounty. I will set a bounty description and include the amount to be paid for a successful submission. I am able to view a list of bounties that I have already posted. By clicking on a bounty, I can review submissions that have been proposed. I can accept or reject the submitted work. Accepting proposed work will pay the submitter the deposited amount.

  

As a bounty hunter, I can submit work to a bounty for review.

  

# Documents

  

Please check the **docs** folder in this repo for all documents related to project requirements such as design pattern decisions, test case decisions etc.

  

# Project Instructions

## Installation

1) Install [NodeJS](https://nodejs.org/en/) depending on your system

2) GanacheCLI

`npm install -g ganache-cli`

3) Truffle

`npm install -g truffle`

4) [Metamask Browser Extension](https://metamask.io/)

  

## Running the dApp

***Note - You may need to manually refresh pages to view UI updates or State changes.***
1) Clone this repo

2) Start a development blockchain using ganache-cli

3) Configure atleast 3 accounts in Metamask using the credentials from the test blockchain. You can either import the mnemonic or manually import accounts using the private keys

4) Open a new terminal and `cd` to the location where the repo was cloned

5) Execute `truffle compile` to compile the contracts

6) Run `truffle migrate` to deploy contracts to test blockchain

7) For evaluating the project, note that 1st acc belongs to admin, 2nd to Job Poster and 3rd to Bounty hunter.

8) Execute `npm run dev` to start the project. A new browser windows should open once everything is initialised. Otherwise, you can manually open [http://localhost:3000/](http://localhost:3000/) in your browser.

9) Interacting with the app  
9.1) **Admin** account - Initially if you interact with the app using admin account, you'll see an empty panel. Admin only approves, rejects or deletes job posters. Switch to another account to send an approval request.  
9.2) **Job Poster** account - Use any account except the first account to access BountyHub. You can request access as a job poster by clicking on *Request Job Poster access* button. After requesting access, switch back to admin account using metamask, refresh the browser and approve/reject the Job poster's access using the Admin Panel.  
Once Job poster is approved, he/she can post Bounties and approve Submissions to bounties. Once a Job poster approves a submission, the bounty amount is transferred to the submitter and bounty is disabled.  
Note - Remember to Switch to Job Poster account to post bounties.  
9.3) **Bounty Hunter** account - Again use any account except Admin and Job poster to submit solutions to bounties. You can view all bounties on the hub. Click on a bounty to load the Submission panel. Provide a link to your submission and wait for Job Poster to approve it.

  

## Executing Test Cases

1) Run a development blockchain using Ganache/Ganache-CLI

2) `cd` to the project directory and run `truffle test`

3) There are a total of 12 testcases written in javascript. All should pass