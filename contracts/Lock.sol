// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
// Uncomment this line to use console.log
 import "hardhat/console.sol";
contract Lock  {
uint256 wave=0;
struct WaveList
{
address newWaveAddress;
string waveMessage;
bool isWaved;
}
WaveList[] allWaveList;

event NewWave(address addr,string message);

function waveCount() public view returns(uint256){

    return wave;
}

function newWave(string memory _msg)public {
    
wave+=1;

allWaveList.push(WaveList(msg.sender,_msg,true));

emit NewWave(msg.sender,_msg);

}
function waveList()public view returns(WaveList[] memory ){

return allWaveList;

}



}
