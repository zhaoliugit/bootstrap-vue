import { loadFixture, testVM } from "../helpers";

describe("link", async () => {
    beforeEach(loadFixture("link"));
    testVM();

    it("should render <a>", async () => {
        const { app: { $refs } } = window;
        expect($refs.plain).toBeElement("a");
    });

    it("should default href to `#`", async () => {
        const { app: { $refs } } = window;
        expect($refs.plain.getAttribute("href")).toBe("#");
    });

    it("should apply given href", async () => {
        const { app: { $refs } } = window;
        expect($refs.href.getAttribute("href")).toBe(app.href);
    });

    it("should default rel to `noopener` when target==='_blank'", async () => {
        const { app: { $refs } } = window;
        expect($refs.target.getAttribute("rel")).toBe("noopener");
    });

    it("should render the given rel to when target==='_blank'", async () => {
        const { app: { $refs } } = window;
        expect($refs.rel.getAttribute("rel")).toBe("alternate");
    });

    it("should not add aria-disabled when not disabled", async () => {
        const { app: { $refs } } = window;
        expect($refs.plain.hasAttribute("aria-disabled")).toBe(false);
    });

    it("should add aria-disabled==='true' when disabled", async () => {
        const { app: { $refs } } = window;
        expect($refs.disabled.getAttribute("aria-disabled")).toBe("true");
    });

    it("should add '.disabled' class when disabled", async () => {
        const { app: { $refs } } = window;
        expect($refs.disabled).toHaveClass("disabled");
    });

    it("should NOT invoke click handler bound by Vue when disabled and clicked on", async () => {
        const { app: { $refs } } = window;
        $refs.click_disabled.click();
        expect(app.disabledClickSpy).not.toHaveBeenCalled();
    });

    it("should NOT invoke click handler bound using 'addEventListener' when disabled and clicked on", async () => {
        const { app: { $refs } } = window;
        const spy = jest.fn();
        $refs.click_disabled.addEventListener("click", spy);
        $refs.click_disabled.click();
        expect(spy).not.toHaveBeenCalled();
    });

    it("should NOT emit 'clicked::link' on $root when clicked on", async () => {
        const { app: { $refs } } = window;
        const spy = jest.fn();
        app.$root.$on("clicked::link", spy);
        $refs.click_disabled.click();
        expect(spy).not.toHaveBeenCalled();
    });

    it("should invoke click handler when clicked on", async () => {
        const { app: { $refs } } = window;
        $refs.click.click();
        expect(app.clickSpy).toHaveBeenCalled();
        const firstCallArguments = app.clickSpy.mock.calls[0]
        expect(firstCallArguments[0]).toBeInstanceOf(Event);
    });

    it("should emit 'clicked::link' on $root when clicked on", async () => {
        const { app: { $refs } } = window;
        const spy = jest.fn();
        app.$root.$on("clicked::link", spy);
        $refs.click.click();
        expect(spy).toHaveBeenCalled();
    });
});
