"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_2 = require("@testing-library/react");
var App_1 = require("./App");
test('renders learn react link', function () {
    (0, react_2.render)(<App_1.default />);
    var linkElement = react_2.screen.getByText(/Fitty/i);
    expect(linkElement).toBeInTheDocument();
});
