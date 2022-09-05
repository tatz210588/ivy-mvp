//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import '@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol';
import '@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import '@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol';

contract CarbonNFT is OwnableUpgradeable,ReentrancyGuardUpgradeable,PausableUpgradeable,ERC721URIStorageUpgradeable
    
    {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    uint256 ratePerNFT;
    uint256 totalSupply;
    Counters.Counter private _backers;
    
    mapping (address => uint256) public holderData;  

    function initialize() public initializer {
        __ERC721_init('Ghana Rainforest', 'GHR');
        __ReentrancyGuard_init();
        __Ownable_init();
        __Pausable_init();
        ratePerNFT = 0;
        totalSupply = 0;
        _pause();
    }

    function setRatePerNFTAndTotalSupply(uint256 _rate, uint256 dec,uint256 _totalSupply) external onlyOwner nonReentrant{
        ratePerNFT = _rate * 10 ** dec ;
        totalSupply =  _totalSupply;
    }

    function getTotalSupply() external view returns(uint256){
        return totalSupply;
    }

    function getTotalProjectValue() external view returns(uint256){
        return totalSupply * ratePerNFT;
    }

    function getAccmulatedProjectValue() external view returns(uint256){
        return _tokenIds.current() * ratePerNFT;
    }

    function getRatePerNFT() external view returns(uint256){
        return ratePerNFT;
    }
    function getBackers() external view returns(uint256){
        return _backers.current() * 1e18;
    }

    
    function mintNFTs(address tokenAddress, uint256 noOfNFT) external nonReentrant{
        require(_tokenIds.current()+noOfNFT <= totalSupply, 'Cannot mint more than supply');
        _unpause();
        IERC20Upgradeable(tokenAddress).transferFrom(payable(msg.sender),payable(owner()), noOfNFT * ratePerNFT);
        if(holderData[msg.sender] == 0){
            _backers.increment();
        }
        holderData[msg.sender] += noOfNFT;
        for(uint256 i = 0; i < noOfNFT; i++){
            _tokenIds.increment();
            _mint(msg.sender, _tokenIds.current());
            
        }
        if(_tokenIds.current() != totalSupply){
        _pause();
        }
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal whenNotPaused override{
        super._beforeTokenTransfer(from,to,tokenId);
    }
}
