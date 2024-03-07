// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity =0.7.6;
pragma abicoder v2;

import '@openzeppelin/contracts-upgradeable/proxy/Initializable.sol';
import '@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol';

import './interfaces/INonfungibleTokenPositionDescriptor.sol';

/// @title Describes NFT token positions
contract NonfungibleTokenPositionDescriptorOffChainVLS is INonfungibleTokenPositionDescriptor, Initializable {
    using StringsUpgradeable for uint256;

    string private _baseTokenURI;
    string public _vlsNFTBaseURI = "https://gateway.irys.xyz/9Tz1HZIHrkww9qOzefeT1HtgsePxbj1NKs0JzxCwYbA/";

    string private constant _BASE_EXTENSION = '.json';

    function initialize(string calldata baseTokenURI) external initializer {
        _baseTokenURI = baseTokenURI;
    }

    /// @inheritdoc INonfungibleTokenPositionDescriptor
    function tokenURI(INonfungiblePositionManager positionManager, uint256 tokenId)
        external
        view
        override
        returns (string memory)
    {
        return string(abi.encodePacked("https://gateway.irys.xyz/9Tz1HZIHrkww9qOzefeT1HtgsePxbj1NKs0JzxCwYbA/", tokenId.toString(), _BASE_EXTENSION));
    }
}
