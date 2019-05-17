"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enzyme_1 = require("enzyme");
var ReactSixteenAdapter = require("enzyme-adapter-react-16");
var adapter = ReactSixteenAdapter;
enzyme_1.configure({ adapter: new adapter.default() });
