// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PaymentSplitter is Ownable {
    
    struct User {
        bool exists;
        uint256 balance;
    }

    mapping(address => User) private users;
    address[] public userList;

    event PaymentReceived(address from, uint256 amount);
    event PaymentSent(address to, uint256 amount);

    function addUser(address _user) public onlyOwner {
        require(!users[_user].exists, "User already exists");
        users[_user] = User(true, 0);
        userList.push(_user);
    }

    function removeUser(address _user) public onlyOwner {
        require(users[_user].exists, "User does not exist");
        users[_user].exists = false;
    }

    function balanceOf(address _user) public view returns (uint256) {
        require(users[_user].exists, "User does not exist");
        return users[_user].balance;
    }

    function receivePayment(address _user) public payable {
        require(msg.value > 0, "No zero-value transactions allowed");
        require(users[_user].exists, "User does not exist");

        uint256 contractShare = msg.value * 5 / 100;
        uint256 userShare = msg.value - contractShare;

        // Update balances
        users[owner()].balance += contractShare;
        users[_user].balance += userShare;

        emit PaymentReceived(msg.sender, msg.value);
    }

    function withdraw() public {
        require(users[msg.sender].exists, "User does not exist");
        uint256 payment = users[msg.sender].balance;
        require(payment > 0, "Nothing to withdraw");

        // Reset balance
        users[msg.sender].balance = 0;

        // Transfer funds
        payable(msg.sender).transfer(payment);

        emit PaymentSent(msg.sender, payment);
    }
}
