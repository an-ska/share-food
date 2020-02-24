import React from "react";
import ReactDOM from "react-dom";
import Offer from "./Offer";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";

configure({ adapter: new Adapter() });

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Offer />, div);
    ReactDOM.unmountComponentAtNode(div);
});

describe("title rendering", () => {
    it.each(["spaghetti", "lasagne"])(
        'renders title from property value "%s"',
        titleText => {
            const wrapper = shallow(<Offer title={titleText} />);
            const titleElement = wrapper.find(".offer-title");

            expect(titleElement.text()).toEqual(titleText);
        }
    );
});

describe("description rendering", () => {
    it.each(["pasta with tomato", "pasta with meat"])(
        'renders description from property value "%s"',
        descriptionText => {
            const wrapper = shallow(<Offer description={descriptionText} />);
            const descriptionElement = wrapper.find(".offer-description");

            expect(descriptionElement.text()).toEqual(descriptionText);
        }
    );
});

describe("available portions rendering", () => {
    it.each([1, 36])(
        'renders available portions count from property value "%s"',
        availablePortions => {
            const wrapper = shallow(<Offer availablePortions={availablePortions} />);
            const portionCounter = wrapper.find(".offer-portion__counter");

            expect(portionCounter.text().split("/")[1]).toBe(
                availablePortions.toString()
            );
        }
    );
});

describe("sold portions rendering", () => {
    it.each([2, 3])(
        'renders sold portions count from property value "%s"',
        soldPortions => {
            const wrapper = shallow(<Offer soldPortions={soldPortions} />);
            const portionCounter = wrapper.find(".offer-portion__counter");

            expect(portionCounter.text().split("/")[0]).toBe(soldPortions.toString());
        }
    );
});

it("renders portions available text", () => {
    const wrapper = shallow(<Offer />);
    const portionLabel = wrapper.find(".offer-portion__label");

    expect(portionLabel.text()).toBe(" portions available");
});

describe("portion price rendering", () => {
    it.each([8, 15])(
        'renders portion price from property value "%s"',
        portionPrice => {
            const wrapper = shallow(<Offer portionPrice={portionPrice} />);
            const portionPriceElement = wrapper.find(".offer-portion__price");

            expect(
                portionPriceElement.text().startsWith(portionPrice.toString())
            ).toBe(true);
        }
    );
});

it("renders price in PLN per portion", () => {
    const wrapper = shallow(<Offer />);
    const portionPriceElement = wrapper.find(".offer-portion__price");

    expect(portionPriceElement.text().endsWith("PLN/portion")).toBe(true);
});

describe("offer author rendering", () => {
    it.each(["Ania", "Kuba"])(
        'render offer author name from property value "%s"',
        authorName => {
            const wrapper = shallow(<Offer authorName={authorName} />);
            const offerAuthorElement = wrapper.find(".offer-authorName");

            expect(offerAuthorElement.text()).toBe(`offered by ${authorName}`);
        }
    );
});
