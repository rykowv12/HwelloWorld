"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.secp256k1 = void 0;

var _elliptic = _interopRequireDefault(require("elliptic"));

// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0
// eslint-disable-next-line new-cap
const secp256k1 = new _elliptic.default.ec('secp256k1');
exports.secp256k1 = secp256k1;