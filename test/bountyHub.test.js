var AdminPanel = artifacts.require('AdminPanel')
var BountyHub = artifacts.require('BountyHub')
let catchRevert = require("./exceptionsHelpers.js").catchRevert
const BN = web3.utils.BN

contract('BountyHub', function(accounts) {

    const admin = accounts[0]
    const jobPoster1 = accounts[1]
    const jobPoster2 = accounts[2]
    const bountyHunter1 = accounts[3]
    const bountyHunter2 = accounts[4]

    let adminInstance
    let hubInstance

    before(async() => {
        adminInstance = await AdminPanel.new();
        hubInstance = await BountyHub.new(adminInstance.address);
    });

    // it("Job poster can req access from Admin", async() => {
    //     await adminInstance.reqAccessFromAdmin(jobPoster1, {from:jobPoster1});
    //     const posterAccess = await adminInstance.checkPosterAccess.call(jobPoster1);
    //     assert.equal(posterAccess, 1, "Job poster status should  change to 1 to indicate pending approval");
    //     const poster1Addr = await adminInstance.fetchPendingPoster(0, {from:admin});
    //     assert.equal(poster1Addr, jobPoster1, "Poster 1 is pending approval & should be the first in pending queue");
    // });

    // it("New Job posters can req access when others are already in queue", async() => {
    //     await adminInstance.reqAccessFromAdmin(jobPoster2, {from:jobPoster2});
    //     const posterAccess = await adminInstance.checkPosterAccess.call(jobPoster2);
    //     assert.equal(posterAccess, 1, "Job poster status should  change to 1 to indicate pending approval");
    //     const poster2Addr = await adminInstance.fetchPendingPoster(1, {from:admin});
    //     assert.equal(poster2Addr, jobPoster2, "Poster 2 is pending approval & should be the second in pending queue");

    // });

    it("Approved Job poster can create a new bounty", async() => {
        await adminInstance.reqAccessFromAdmin(jobPoster1, {from:jobPoster1});
        await adminInstance.approvePoster(jobPoster1, {from:admin});
        await hubInstance.createBounty("Test Bounty", 5, {from:jobPoster1});
        const bountyCount = await hubInstance.getBountyCount({from:jobPoster1});
        const addr = await hubInstance.getBountyOwner(0, {from:jobPoster1});
        const desc = await hubInstance.getBountyDesc(0, {from:jobPoster1});
        const amt = await hubInstance.getBountyAmt(0, {from:jobPoster1});
        assert.equal(bountyCount, 1, "BountyCount should be 1 if a new bounty was created");
        assert.equal(jobPoster1, addr, "Job poster 1 should be the owner of the bounty");
        assert.equal("Test Bounty", desc, "Bounty 1 description should match");
        assert.equal(5, amt, "Bounty 1 amt should match");
    });

    it("Bounty hunter can fetch bounty details", async() => {
        const desc = await hubInstance.getBountyDesc(0, {from:bountyHunter1});
        const amt = await hubInstance.getBountyAmt(0, {from:bountyHunter1});
        const btyOwner = await hubInstance.getBountyOwner(0, {from:bountyHunter1});
        const status = await hubInstance.getBountyStatus(0, {from:bountyHunter1});
        assert.equal(jobPoster1, btyOwner, "Job poster 1 should be the owner of the bounty");
        assert.equal("Test Bounty", desc, "Bounty 1 description should match");
        assert.equal(5, amt, "Bounty 1 amt should match");
        assert.equal(true, status, "Bounty 1 status should be true i.e. active");
    });

    it("Bounty hunter can submit a solution for a bounty", async() => {
        await hubInstance.createSubmission(0, "www.submission1bounty1.com",{from:bountyHunter1});
        const bountyID = await hubInstance.getSubsBountyID(0, {from:bountyHunter1});
        const URL = await hubInstance.getSubmissionURL(0, {from:bountyHunter1});
        const status = await hubInstance.getSubmissionStatus(0, {from:bountyHunter1});
        const owner = await hubInstance.getSubmissionOwner(0, {from:bountyHunter1});
        assert.equal(bountyID, 0, "BountyID corresponding to this submission should be 0");
        assert.equal(URL, "www.submission1bounty1.com", "Submission URL should match");
        assert.equal(status, false, "Submission not accepted. Status should be false.");
        assert.equal(owner, bountyHunter1, "Submission is owner by bountyhunter1");
    });

    it("Job Poster can approve a submission", async() => {
        await hubInstance.approveSubmission(0, 0, {from:jobPoster1, value:10});
        const subStatus = await hubInstance.getSubmissionStatus(0, {from:jobPoster1});
        const bountyStatus  = await hubInstance.getBountyStatus(0, {from:jobPoster1});
        assert.equal(subStatus, true, "Submission has been accepted. Status should be true.");
        assert.equal(bountyStatus, false, "Submission has been accepted. Bounty should be deactivated");
    });

    it("Job poster can delete the bounty he posted", async() => {
        await hubInstance.createBounty("Test Bounty", 5, {from:jobPoster1});
        await hubInstance.deleteBounty(1, {from:jobPoster1});
        const bountyStatus  = await hubInstance.getBountyStatus(1, {from:jobPoster1});
        assert.equal(bountyStatus, false, "Bounty should be deleted. Status should be false");
    });
})