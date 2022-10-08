// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;
// Uncomment this line to use console.log
 import "hardhat/console.sol";
contract Lock {
   
uint256 wave=0;
address private owner;

struct WaveList
{
string waveMessage;
bool isWaved;
}
mapping(address=>WaveList) list;
event NewWave(address addr,string message);

function waveCount() public view returns(uint256){

    return wave;
}

function newWave(string memory _msg)public {
wave+=1;
list[msg.sender]=WaveList(_msg,true);
emit NewWave(msg.sender,_msg);

}

}
