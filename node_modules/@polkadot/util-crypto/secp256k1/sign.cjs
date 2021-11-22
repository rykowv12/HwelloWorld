"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.secp256k1Sign = secp256k1Sign;

var _util = require("@polkadot/util");

var _bn = require("../bn.cjs");

var _hasher = require("./hasher.cjs");

var _secp256k = require("./secp256k1.cjs");

// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @name secp256k1Sign
 * @description Returns message signature of `message`, using the supplied pair
 */
function secp256k1Sign(message, _ref) {
  let {
    secretKey
  } = _ref;
  let hashType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'blake2';
  (0, _util.assert)((secretKey === null || secretKey === void 0 ? void 0 : secretKey.length) === 32, 'Expected valid secp256k1 secretKey, 32-bytes');

  const key = _secp256k.secp256k1.keyFromPrivate(secretKey);

  const ecsig = key.sign((0, _hasher.secp256k1Hasher)(hashType, message));
  return (0, _util.u8aConcat)((0, _util.bnToU8a)(ecsig.r, _bn.BN_BE_256_OPTS), (0, _util.bnToU8a)(ecsig.s, _bn.BN_BE_256_OPTS), new Uint8Array([ecsig.recoveryParam || 0]));
}