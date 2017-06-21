import {ISettingsManager} from "../../scripts/ISettingsManager";
import {SettingsManager} from "../../scripts/SettingsManager";
import expect = require("expect.js");

describe("Given a SettingsManager", () => {
    let settingsManager: ISettingsManager;

    beforeEach(() => {
        settingsManager = new SettingsManager();
    });

    context("When I want to save a particular settings", () => {
        it("Should save it", async () => {
            expect(await settingsManager.set("testSettings", "test")).to.be.ok();
        });
    });

    context("When a settings is requested", () => {
        beforeEach(async () => {
            await settingsManager.set("testSettings", "test");
        });

        it("Should retrieve it", async () => {
            expect(await settingsManager.get<String>("testSettings")).to.be.eql("test");
        });
    });
});