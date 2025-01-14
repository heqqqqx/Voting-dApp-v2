// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Proposal {
        string name;
        uint256 voteCount;
    }

    mapping(address => bool) public hasVoted;

    Proposal[] public proposals;

    event Voted(address indexed voter, uint256 indexed proposalIndex);

    constructor(string[] memory proposalNames) {
        for (uint256 i = 0; i < proposalNames.length; i++) {
            proposals.push(Proposal({
                name: proposalNames[i],
                voteCount: 0
            }));
        }
    }

    function getProposalCount() public view returns (uint256) {
        return proposals.length;
    }

    function vote(uint256 proposalIndex) public {
        require(!hasVoted[msg.sender], "You have already voted.");
        require(proposalIndex < proposals.length, "Invalid proposal index.");

        hasVoted[msg.sender] = true;

        proposals[proposalIndex].voteCount++;

        emit Voted(msg.sender, proposalIndex);
    }

    function getProposal(uint256 proposalIndex) public view returns (string memory name, uint256 voteCount) {
        require(proposalIndex < proposals.length, "Invalid proposal index.");

        Proposal storage proposal = proposals[proposalIndex];
        return (proposal.name, proposal.voteCount);
    }

    function getAllProposals() public view returns (string[] memory) {
        string[] memory proposalNames = new string[](proposals.length);
        for (uint256 i = 0; i < proposals.length; i++) {
            proposalNames[i] = proposals[i].name;
        }
        return proposalNames;
    }
}
