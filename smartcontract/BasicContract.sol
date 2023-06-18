// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PaymentSplitter is Ownable {

    mapping(address => uint256) private _balances;
    address[] public users;

    event PaymentReceived(address from, uint256 amount);
    event PaymentSent(address to, uint256 amount);

    function addUser(address user) public onlyOwner {
        users.push(user);
    }

    function balanceOf(address user) public view returns (uint256) {
        return _balances[user];
    }

    function receivePayment(address user) public payable {
        require(msg.value > 0, "No zero-value transactions allowed");

        uint256 contractShare = msg.value * 5 / 100;
        uint256 userShare = msg.value - contractShare;

        // Update balances
        _balances[owner()] += contractShare;
        _balances[user] += userShare;

        emit PaymentReceived(msg.sender, msg.value);
    }

    function withdraw() public {
        uint256 payment = _balances[msg.sender];
        require(payment > 0, "Nothing to withdraw");

        // Reset balance
        _balances[msg.sender] = 0;

        // Transfer funds
        payable(msg.sender).transfer(payment);

        emit PaymentSent(msg.sender, payment);
    }
}