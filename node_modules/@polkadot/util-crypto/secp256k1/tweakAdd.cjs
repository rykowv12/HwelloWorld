"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.secp256k1PrivateKeyTweakAdd = secp256k1PrivateKeyTweakAdd;

var _util = require("@polkadot/util");

var _bn = require("../bn.cjs");

// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0
// pre-defined curve param as lifted form elliptic
// https://github.com/indutny/elliptic/blob/e71b2d9359c5fe9437fbf46f1f05096de447de57/lib/elliptic/curves.js#L182
const N = new _util.BN('ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141'.replace(/ /g, ''), 'hex');

function secp256k1PrivateKeyTweakAdd(seckey, tweak) {
  (0, _util.assert)((0, _util.isU8a)(seckey) && seckey.length === 32, 'Expected seckey to be an Uint8Array with length 32');
  (0, _util.assert)((0, _util.isU8a)(tweak) && tweak.length === 32, 'Expected tweak to be an Uint8Array with length 32');
  const bn = new _util.BN(tweak);
  (0, _util.assert)(bn.cmp(N) < 0, 'Tweak parameter is out of range');
  bn.iadd(new _util.BN(seckey));

  if (bn.cmp(N) >= 0) {
    bn.isub(N);
  }

  (0, _util.assert)(!bn.isZero(), 'Invalid resulting private key');
  return (0, _util.bnToU8a)(bn, _bn.BN_BE_256_OPTS);
}